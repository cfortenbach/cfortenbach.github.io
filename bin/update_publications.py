#!/usr/bin/env python3
"""
Fetch publications from PubMed and write _bibliography/papers.bib in al-folio format.

Reads _data/publications_config.yml for:
  - search_terms: list of PubMed esearch terms (default: ["Fortenbach C[au]"])
  - selected_pmids: PMIDs to mark with selected={true} on the landing page
  - excluded_pmids: PMIDs to skip (e.g. another author with the same surname)

Uses NCBI E-utilities (free, no API key required).
Standard-library only — runs on any Python 3.10+.
"""

import json
import os
import re
import sys
import time
import urllib.parse
import urllib.request
import xml.etree.ElementTree as ET
from pathlib import Path

try:
    import yaml
except ImportError:
    print("PyYAML required. Install with: pip install pyyaml", file=sys.stderr)
    sys.exit(2)

# Paths are relative to repo root; this script expects to run from repo root.
CONFIG_PATH = Path("_data/publications_config.yml")
OUTPUT_PATH = Path("_bibliography/papers.bib")
EUTILS = "https://eutils.ncbi.nlm.nih.gov/entrez/eutils"

# Tool/email per NCBI E-utilities etiquette.
TOOL_NAME = "fortenbachlab-website"
TOOL_EMAIL = os.environ.get("NCBI_EMAIL", "crfort@uw.edu")


def load_config():
    if not CONFIG_PATH.exists():
        return {}
    with open(CONFIG_PATH, encoding="utf-8") as f:
        return yaml.safe_load(f) or {}


def http_get_xml(url, retries=3):
    last_err = None
    for attempt in range(retries):
        try:
            req = urllib.request.Request(url, headers={"User-Agent": TOOL_NAME})
            with urllib.request.urlopen(req, timeout=30) as r:
                return ET.fromstring(r.read())
        except Exception as e:
            last_err = e
            time.sleep(2 ** attempt)
    raise last_err


def esearch(term, retmax=500):
    params = urllib.parse.urlencode({
        "db": "pubmed", "term": term, "retmax": retmax,
        "tool": TOOL_NAME, "email": TOOL_EMAIL,
    })
    url = f"{EUTILS}/esearch.fcgi?{params}"
    root = http_get_xml(url)
    return [el.text for el in root.findall(".//Id") if el.text]


def efetch_batch(pmids, batch_size=100):
    results = []
    for i in range(0, len(pmids), batch_size):
        chunk = pmids[i:i + batch_size]
        params = urllib.parse.urlencode({
            "db": "pubmed", "id": ",".join(chunk),
            "retmode": "xml", "tool": TOOL_NAME, "email": TOOL_EMAIL,
        })
        url = f"{EUTILS}/efetch.fcgi?{params}"
        root = http_get_xml(url)
        for art in root.findall(".//PubmedArticle"):
            results.append(parse_article(art))
        # NCBI etiquette: <=3 requests/sec without API key
        time.sleep(0.4)
    return results


def parse_article(art):
    pmid = art.findtext(".//PMID") or ""
    title = (art.findtext(".//ArticleTitle") or "").strip().rstrip(".")
    journal_full = art.findtext(".//Journal/Title") or ""
    journal_abbr = art.findtext(".//Journal/ISOAbbreviation") or ""
    year = art.findtext(".//PubDate/Year")
    if not year:
        medline_date = art.findtext(".//PubDate/MedlineDate") or ""
        m = re.search(r"\d{4}", medline_date)
        year = m.group(0) if m else ""
    volume = art.findtext(".//JournalIssue/Volume") or ""
    issue = art.findtext(".//JournalIssue/Issue") or ""
    pages = art.findtext(".//Pagination/MedlinePgn") or ""
    doi = ""
    for el in art.findall(".//ArticleIdList/ArticleId"):
        if el.get("IdType") == "doi" and el.text:
            doi = el.text
            break

    authors = []
    for au in art.findall(".//AuthorList/Author"):
        last = au.findtext("LastName")
        initials = au.findtext("Initials") or ""
        collective = au.findtext("CollectiveName")
        if last:
            ini_str = " ".join(c + "." for c in initials)
            authors.append(f"{last}, {ini_str}".strip().rstrip(","))
        elif collective:
            authors.append(collective)

    return {
        "pmid": pmid,
        "title": title,
        "authors": authors,
        "journal": journal_full,
        "abbr": journal_abbr,
        "year": year,
        "volume": volume,
        "issue": issue,
        "pages": pages,
        "doi": doi,
    }


def safe_word(s):
    return re.sub(r"[^a-z]", "", s.lower())


def make_key(p):
    last_first = "unknown"
    if p["authors"]:
        last_first = safe_word(p["authors"][0].split(",")[0]) or "unknown"
    title_words = [w for w in re.split(r"\s+", p["title"]) if w]
    title_word = safe_word(title_words[0]) if title_words else ""
    return f"{last_first}{p['year']}{title_word[:10]}"


def to_bibtex(p, selected=False):
    key = make_key(p)
    lines = [f"@article{{{key},"]
    if p["authors"]:
        lines.append(f"  author    = {{{' and '.join(p['authors'])}}},")
    lines.append(f"  title     = {{{p['title']}}},")
    if p["journal"]:
        lines.append(f"  journal   = {{{p['journal']}}},")
    if p["abbr"]:
        lines.append(f"  abbr      = {{{p['abbr']}}},")
    if p["volume"]:
        lines.append(f"  volume    = {{{p['volume']}}},")
    if p["issue"]:
        lines.append(f"  number    = {{{p['issue']}}},")
    if p["pages"]:
        lines.append(f"  pages     = {{{p['pages']}}},")
    if p["doi"]:
        lines.append(f"  doi       = {{{p['doi']}}},")
    if p["pmid"]:
        lines.append(f"  pmid      = {{{p['pmid']}}},")
    if p["year"]:
        lines.append(f"  year      = {{{p['year']}}},")
    if selected:
        lines.append("  selected  = {true},")
    lines.append("  bibtex_show = {true}")
    lines.append("}")
    return "\n".join(lines)


def main():
    cfg = load_config()
    terms = cfg.get("search_terms") or ["Fortenbach C[au]"]
    selected_pmids = {str(x) for x in (cfg.get("selected_pmids") or [])}
    excluded_pmids = {str(x) for x in (cfg.get("excluded_pmids") or [])}

    print(f"Search terms: {terms}")
    all_pmids = []
    for term in terms:
        ids = esearch(term)
        print(f"  {term!r}: {len(ids)} hits")
        all_pmids.extend(ids)

    unique = sorted(set(all_pmids) - excluded_pmids, key=lambda x: int(x), reverse=True)
    print(f"Total unique after exclusions: {len(unique)}")

    if not unique:
        print("No PMIDs found. Leaving papers.bib unchanged.")
        return

    pubs = efetch_batch(unique)
    pubs.sort(key=lambda p: (int(p["year"] or 0), int(p["pmid"] or 0)), reverse=True)

    output = ["---", "---", ""]
    for p in pubs:
        is_sel = p["pmid"] in selected_pmids
        output.append(to_bibtex(p, selected=is_sel))
        output.append("")

    OUTPUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    new_content = "\n".join(output) + "\n"
    OUTPUT_PATH.write_text(new_content, encoding="utf-8")
    print(f"Wrote {len(pubs)} entries to {OUTPUT_PATH} ({len(new_content)} bytes)")


if __name__ == "__main__":
    main()
