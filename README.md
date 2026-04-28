# The Recognition Engine

CX Team Performance & Recognition Dashboard — Next.js 14 web application.

## Deployment Checklist

1. **Clone the repo and install dependencies**
   ```bash
   git clone <your-repo-url>
   cd recognition-engine
   npm install
   ```

2. **Configure environment variables**
   ```bash
   cp .env.local.example .env.local
   ```
   Edit `.env.local` and set:
   - `ADMIN_PASSWORD` — your chosen admin password
   - `ADMIN_COOKIE_SECRET` — a random string, 32+ characters

3. **Verify locally**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000)

4. **Push to GitHub (private repo)**
   ```bash
   git init && git add . && git commit -m "initial commit"
   gh repo create recognition-engine --private --source=. --push
   ```

5. **Connect to Vercel**
   - Import the GitHub repo at vercel.com/new
   - Select the `recognition-engine` repository

6. **Add environment variables in Vercel dashboard**
   - `ADMIN_PASSWORD`
   - `ADMIN_COOKIE_SECRET`

7. **Deploy** — Vercel deploys automatically on every push to `main`.

---

## Admin Panel

Visit `/admin` to manage the three resource links (Google Sheets, Canva Kit, PDF Guide).

- Login at `/admin/login` using `ADMIN_PASSWORD`
- Links are persisted to `data/links.json` (server-side, gitignored)

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS with custom design tokens |
| Animations | Framer Motion |
| Forms | React Hook Form + Zod |
| Auth | iron-session v8 (cookie-based) |
| Deployment | Vercel |

## Project Structure

```
app/
  layout.tsx          Root layout (Navbar + Footer + fonts)
  page.tsx            Home page
  about/page.tsx      About page
  features/page.tsx   Features + 5-step process
  resources/page.tsx  Resource links + monthly checklist
  contact/page.tsx    Contact form + FAQ
  admin/
    layout.tsx        Auth guard (redirects to /admin/login)
    page.tsx          Resource link manager
    login/page.tsx    Admin login form
  api/admin/
    auth/route.ts     POST: validate password, set session cookie
    auth/signout/route.ts  POST: destroy session, redirect
    links/route.ts    GET/POST: read and write resource links

components/
  Navbar.tsx          Sticky top navigation
  Footer.tsx          Site footer
  ResourceCard.tsx    Deliverable card with features list
  StepAccordion.tsx   Animated accordion for 5-step process
  ChecklistGrid.tsx   Interactive monthly checklist
  ContactForm.tsx     React Hook Form + Zod contact form
  AdminDashboard.tsx  Editable resource link table
  AdminLoginForm.tsx  Admin password form
  ui/
    Button.tsx        Multi-variant button component
    Card.tsx          Base card with hover effect
    SectionHeader.tsx Labelled horizontal divider

lib/
  config.ts           Default resource link config + types
  auth.ts             iron-session helpers
  links.ts            Read/write data/links.json

data/
  links.json          Runtime resource links (gitignored)
```
