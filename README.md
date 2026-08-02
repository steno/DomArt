# Domart — Dominican Accent Walls

Premium static showroom & e-commerce experience for the **Fachada Series / Casa Alegre Walls**.

Built with **Next.js (App Router) + TypeScript**, configured for **`output: 'export'`** so the entire site is a pure static build deployable to **GitHub Pages at no cost**.

## Features

- Homepage with lifestyle hero, brand story, and colorway grid
- Filterable catalog (Living / Bedroom / Dining / Bathroom)
- **Live product configurator** — accent color, width, TV recess, lattice, zócalo; preview updates client-side in &lt;300ms
- Cart with configuration persistence (`localStorage`)
- **WhatsApp ordering** — checkout opens a pre-filled message to +1 754-213-3764
- About, How It’s Made, Inspiration, Contact / Trade / Custom width
- Six accent colors: Costa, Sol, Jungla, Coral, Soft Pink, Navy

## Tech stack

| Layer | Choice |
|--------|--------|
| Framework | Next.js 15, App Router, TypeScript |
| Export | `output: 'export'` → `out/` |
| Styling | Tailwind CSS 4 + custom design tokens |
| UI | shadcn-style primitives (Radix + CVA) |
| State | Zustand (cart + configurator) |
| Motion | Framer Motion (client-only) |
| Orders | WhatsApp (`wa.me`) pre-filled order message |
| Deploy | GitHub Actions → `gh-pages` branch |

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Optional: copy `.env.example` to `.env.local` (WhatsApp number is already set).

## Static export

```bash
npm run build
```

This produces a fully static site in the **`out/`** folder. Preview locally:

```bash
npx serve out
```

> Do **not** use `npm start` for production on GitHub Pages — there is no Node server. Serve the `out/` directory as static files.

## Deploy to GitHub Pages

### 1. Push to GitHub

Create a repository and push the `main` branch.

### 2. Enable GitHub Pages

1. Open the repo on GitHub → **Settings** → **Pages**
2. Under **Build and deployment** → **Source**, select **Deploy from a branch**
3. Branch: **`gh-pages`** / folder: **/ (root)**
4. Save

The included workflow (`.github/workflows/deploy.yml`) builds on every push to `main` and publishes the `out/` folder to the `gh-pages` branch.

### 3. Base path

For a **project site** (`https://<user>.github.io/<repo>/`), the workflow sets:

```
NEXT_PUBLIC_BASE_PATH=/<repo-name>
```

If you use a **custom domain** or a **user/org site** (`username.github.io`), edit the workflow and set:

```yaml
NEXT_PUBLIC_BASE_PATH: ""
NEXT_PUBLIC_SITE_URL: https://yourdomain.com
```

### 4. Custom domain (optional)

1. Add a `CNAME` file in `public/CNAME` containing your domain (e.g. `www.domart.studio`), **or** set the custom domain in **Settings → Pages**
2. Point DNS:
   - **Apex**: A records to GitHub Pages IPs, or
   - **www**: CNAME to `<user>.github.io`
3. Clear `NEXT_PUBLIC_BASE_PATH` in the deploy workflow (see above)
4. Enable **Enforce HTTPS** in Pages settings once DNS propagates

### 5. Secrets (optional)

In **Settings → Secrets and variables → Actions**, add:

| Secret | Purpose |
|--------|---------|
| `NEXT_PUBLIC_FORMSPREE_ID` | Formspree form id for contact forms |

Orders are placed via **WhatsApp** to `+1 754-213-3764` (`NEXT_PUBLIC_WHATSAPP_NUMBER`). Checkout opens a pre-filled message with the full configuration; payment is confirmed in chat.

## Project structure

```
src/
  app/                  # Routes (static pages)
  components/
    catalog/            # Shop grid & cards
    configurator/       # Product configurator (color, width, options)
    layout/             # Header / Footer
    ui/                 # Button, Label, Separator
  lib/                  # Products, colorways, WhatsApp order helpers
  store/                # Zustand cart & configurator
.github/workflows/      # gh-pages deploy
```

## Design notes

- West Elm–inspired editorial layout: warm neutrals, generous whitespace, refined sans typography (Outfit + DM Sans)
- Shop and PDP previews use lifestyle photography per product × colorway
- Maximum three colors per wall: natural pine + one accent + white
- Copy emphasizes modular craftsmanship and a **3–4 week** production window

## License

Private / all rights reserved — Domart.
