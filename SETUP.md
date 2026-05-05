# Fortenbach Lab Website — Setup Notes

This folder contains the al-folio Jekyll template, pre-customized for the Fortenbach Lab. The default theme has been forked, the navigation trimmed, and placeholder content drafted for the landing page, research themes, people page, and join page.

This document is your operating manual: what was done, how to preview the site locally, and how to publish it.

---

## What's in here

| File / folder | Purpose | State |
|---|---|---|
| `_config.yml` | Site-wide settings: title, name, URL, plugins, etc. | Customized for Fortenbach Lab |
| `_pages/about.md` | Landing page (`/`) | Drafted — replace prose with your preferred phrasing |
| `_pages/about_pi.md` | PI bio block shown on People page | Placeholder bio |
| `_pages/profiles.md` | People page (`/people/`) | One profile (you), placeholder for trainees |
| `_pages/projects.md` | Research themes page (`/research/`) | Categories: vision-restoration / retinal-physiology / translational |
| `_pages/publications.md` | Publications page (`/publications/`) | Renders from `_bibliography/papers.bib` |
| `_pages/joining.md` | Recruiting page (`/joining/`) | Drafted with text for postdocs, students, undergrads, residents |
| `_pages/news.md` | News page (`/news/`) | Renders from `_news/*.md` |
| `_pages/cv.md`, `blog.md`, `repositories.md`, `teaching.md`, `dropdown.md`, `books.md` | Other al-folio pages | Hidden from navigation; available if you want to enable later |
| `_news/announcement_*.md` | Inline news items | Placeholders dated 2026; replace with real news |
| `_projects/1-3_project.md` | Research theme cards | Drafted for the three research themes |
| `_projects/4-9_project.md` | Original al-folio examples | Hidden (categories don't match displayed list); safe to delete |
| `_bibliography/papers.bib` | Publications | Empty — paste BibTeX entries here |
| `_data/socials.yml` | Social media / scholar links | Email set; uncomment + fill the rest as you create them |
| `CNAME` | GitHub Pages custom domain | Set to `fortenbachlab.com` |

---

## About the git repo

This folder is a working git clone of [al-folio](https://github.com/alshedivat/al-folio), with all customizations as uncommitted changes. Run `git status` to see them.

`core.fileMode` is set to `false` because the cowork mount marks every file executable; without this, `git status` would report 380+ phantom mode changes on top of the real edits.

You have two reasonable paths for publishing:

**Path A — Keep the al-folio history** (treat it like a fork). Simpler, lets you pull future al-folio updates. Just commit and push:
```bash
git add -A
git commit -m "Initial Fortenbach Lab customizations"
```
Then create the GitHub repo (next section) and push.

**Path B — Start with clean history** (no al-folio commits). Wipe and re-init:
```bash
rm -rf .git
git init -b main
git add -A
git commit -m "Initial Fortenbach Lab site"
```

Either works. Path A is what most academic labs do.

---

## Preview the site locally (recommended before publishing)

al-folio is a Jekyll site, so previewing requires Ruby. The two simplest paths:

### Option A: Docker (easiest, no Ruby install)

If you have Docker Desktop:

```bash
cd C:\Users\cfort\Projects\fortenbachlab-website
docker compose up
```

Open http://localhost:8080 in your browser. Live-reloads on file changes.

### Option B: Native Ruby/Jekyll

Install Ruby (3.2+ recommended) and Bundler. From a terminal in this folder:

```bash
bundle install
bundle exec jekyll serve --livereload
```

Open http://localhost:4000.

Detailed install notes are in `INSTALL.md`. Troubleshooting tips are in `TROUBLESHOOTING.md`.

---

## Publish to GitHub Pages

Once you've previewed locally and are happy:

1. **Commit the customizations** (Path A or Path B above).
2. **Create the GitHub repo.** On github.com, create a new public repo named `fortenbachlab.github.io` under your `cfortenbach` account. (User-level pages sites must be named `<username>.github.io`. If you'd rather use a project-level repo, you can name it anything — just adjust the Pages settings accordingly.)
3. **Push:**
   ```bash
   git remote add origin https://github.com/cfortenbach/fortenbachlab.github.io.git
   git branch -M main
   git push -u origin main
   ```
   (If you went with Path A, you'll need `git remote set-url origin ...` instead of `add`, since `origin` already points at alshedivat/al-folio.)
4. **Enable Pages.** In the repo on github.com: Settings → Pages → Source: "Deploy from a branch" → Branch: `main` → `/` (root) → Save. Wait a couple minutes; the first build of al-folio takes longer than typical Jekyll sites.
5. **Set custom domain.** Still in Settings → Pages, enter `fortenbachlab.com` in the "Custom domain" field. The `CNAME` file is already in this folder, so this should match.

The al-folio repo includes a GitHub Actions workflow (`.github/workflows/deploy.yml`) that builds the site on push. If the default GitHub Pages build is too slow or unreliable, switch the Pages source to "GitHub Actions" instead of "branch".

---

## Domain + DNS for fortenbachlab.com

You haven't bought the domain yet. Recommended path:

1. **Register at Cloudflare Registrar** (cloudflare.com → Domain Registration). At-cost pricing, usually ~$10/yr for `.com`. Avoid GoDaddy.
2. **Use Cloudflare DNS** for the domain (this is the default if you register there).
3. **Add the DNS records** that GitHub Pages requires, in the Cloudflare DNS dashboard for `fortenbachlab.com`:

   | Type  | Name | Content                  | Proxy   |
   |-------|------|--------------------------|---------|
   | A     | @    | 185.199.108.153          | DNS only |
   | A     | @    | 185.199.109.153          | DNS only |
   | A     | @    | 185.199.110.153          | DNS only |
   | A     | @    | 185.199.111.153          | DNS only |
   | AAAA  | @    | 2606:50c0:8000::153      | DNS only |
   | AAAA  | @    | 2606:50c0:8001::153      | DNS only |
   | AAAA  | @    | 2606:50c0:8002::153      | DNS only |
   | AAAA  | @    | 2606:50c0:8003::153      | DNS only |
   | CNAME | www  | cfortenbach.github.io    | DNS only |

   Set "Proxy" to **DNS only**, not Proxied. The Cloudflare proxy interferes with GitHub Pages' SSL provisioning.

4. Wait ~10 minutes, then in GitHub Settings → Pages, click "Enforce HTTPS" once it becomes available.

Verify with:

```bash
dig fortenbachlab.com +noall +answer
```

You should see the four GitHub Pages IPs.

---

## What to customize next

In rough order of impact:

1. **Profile photo.** Replace `assets/img/prof_pic.jpg` with a real headshot. Same filename keeps everything wired up.
2. **Landing-page bio.** Edit `_pages/about.md` — the prose is a starting draft, not finished copy.
3. **PI bio block.** Edit `_pages/about_pi.md` — replace the placeholder paragraph with your training history and clinical specialty.
4. **Research themes.** Edit `_projects/1_project.md`, `2_project.md`, `3_project.md`. Add real figures to `assets/img/` and reference them.
5. **Publications.** Paste BibTeX entries into `_bibliography/papers.bib`. Mark a few `selected={true}` so they appear on the landing page.
6. **Hero figure** for the landing page — a photoswitch schematic, calcium imaging frame, or MEA recording snippet does more for first impressions than stock photos. Save as `assets/img/prof_pic.jpg` (or change the filename in `_pages/about.md`).
7. **Socials.** Edit `_data/socials.yml` to add Google Scholar, ORCID, GitHub, etc. as you create accounts.
8. **Favicon.** The site uses an emoji favicon (👁) by default. To use a real favicon image, drop a PNG in `assets/img/` and change the `icon:` line in `_config.yml` to point at the filename.
9. **Delete unused project examples.** `_projects/4_project.md` through `9_project.md` are al-folio leftovers. Hidden from the site, but you can `rm` them in your terminal once you have your own research cards in place.

---

## Future enhancements worth considering

- **Privacy-friendly analytics.** Plausible (~$9/mo) or GoatCounter (free) instead of Google Analytics. Both have al-folio-compatible setups documented in `ANALYTICS.md`.
- **Auto-sync publications from ORCID.** A GitHub Action can keep `papers.bib` updated from ORCID — saves manual paste-in for new papers.
- **`/cv` route serving a PDF.** Drop a `cv.pdf` in `assets/pdf/` and update the `cv_pdf` field in `_pages/cv.md`. Then re-enable nav for that page.
- **Giscus comments on news/blog posts** if you want trainees and visitors to be able to comment. Configured in `_config.yml` under `giscus:`.
- **Newsletter signup** via Loops (free tier covers most academic lab needs). Configured under `newsletter:` in `_config.yml`.

---

## Useful files in this template (for reference)

- `CUSTOMIZE.md` — full al-folio customization reference (very thorough)
- `INSTALL.md` — Ruby/Jekyll install instructions per platform
- `FAQ.md` — common questions
- `TROUBLESHOOTING.md` — when things break
- `SEO.md` — Open Graph and search engine config
- `ANALYTICS.md` — analytics provider setup

These files are excluded from the built site (see the `exclude:` list in `_config.yml`) so they won't appear publicly, but they're worth a skim.
