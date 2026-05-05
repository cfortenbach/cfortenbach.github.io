# Funder logos

Drop logo files here with names matching the `logo:` field in `_data/funders.yml`.

**Recommended specs:**
- Format: PNG with transparent background, or SVG
- Width: ~400px max
- The site auto-greyscales them and reveals color on hover, so colored logos are fine

**Where to find official logos:**

- **Research to Prevent Blindness (RPB)** — request via https://www.rpbusa.org/ press kit, or reach out to RPB communications.
- **UW Medicine** — UW Medicine Brand & Communications: https://depts.washington.edu/uwmedmar/ (or ask UW Ophthalmology communications staff who manage department branding).
- **UW Department of Ophthalmology** — typically combines UW Medicine logo + department wordmark; ask the department's communications coordinator.

**Save as:**
- `rpb.png`
- `uw-medicine.png`
- `uw-ophthalmology.png`

(If you change the filenames, also update `_data/funders.yml` to match.)

The `funders` section on the landing page silently skips entries whose logo file is missing, so you can add them progressively as you obtain official assets.

This README is excluded from the published site by Jekyll defaults.
