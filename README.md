# Built By Design Google Ads Landing Page 1

Single-page marketing site for Built By Design, built with Next.js App Router and optimized for Google Ads traffic and lead capture.

## Tech Stack

- Framework: `Next.js 15` (App Router)
- UI: `React 19`
- Language: `TypeScript`
- Styling: `Tailwind CSS v4`
- Motion/animation: `motion` (Framer Motion package)
- Icons: `lucide-react`
- Form state: `react-hook-form`
- Validation: `zod` + `@hookform/resolvers`
- Toast notifications: `sonner`
- Linting: `ESLint 9` + `eslint-config-next`
- Package manager: `pnpm`

## Requirements

- `Node.js 20+` recommended
- `pnpm` installed globally

## Getting Started

1. Install dependencies:

```bash
pnpm install
```

2. Start local development:

```bash
pnpm dev
```

3. Open:

`http://localhost:3100`

## Scripts

- `pnpm dev` - run local dev server on port `3100`
- `pnpm build` - create production build
- `pnpm start` - serve production build on port `3100`
- `pnpm lint` - run ESLint

## Project Structure

```text
app/
  actions/
    lead-form.ts            # server action for lead form submission
  globals.css               # global styles + CSS variables (brand colors, fonts)
  layout.tsx                # root layout
  page.tsx                  # landing page entrypoint
components/
  features/
    landing-page.tsx        # main page sections, testimonials carousel, lightbox
lib/
  types/
    lead-form-schema.ts     # zod validation schema + shared form types
public/
  photos/                   # hero, CTA, gallery, logos, testimonial/project images
```

## Key Features

- Sticky header with click-to-call and primary CTA
- Hero section with lead form
- Client-side form validation + server-side schema validation
- Portfolio/gallery with lightbox
- Auto-rotating testimonial carousel
- Process steps and final CTA section
- Brand logo swap (black in header, white in footer)
- Two-gold color system for contrast control on light/dark sections

## Form Flow

1. Inputs are registered with `react-hook-form`.
2. Validation runs via `zodResolver(leadFormSchema)` on submit.
3. Data is posted to `submitLeadForm` server action.
4. Server action validates again with the same Zod schema.
5. Success/error message is shown via `sonner` toast.

Current behavior: form submission returns a success message only (no external CRM/email integration yet).

## Content and Asset Updates

- Main copy, section order, testimonial data, and carousel behavior:
  - `components/features/landing-page.tsx`
- Brand colors and design tokens:
  - `app/globals.css`
- Photos/logos:
  - `public/photos/`

## Accessibility Notes

- Gold colors are split into:
  - `--color-brand-gold` (default brand gold)
  - `--color-brand-gold-dark` (accessible on light backgrounds)
  - `--color-brand-gold-light` (for high visibility on dark backgrounds)
- Review color contrast any time new brand colors are introduced.

## Deployment

Standard Next.js deployment:

1. Build:

```bash
pnpm build
```

2. Run production server:

```bash
pnpm start
```

Can be deployed to Vercel or any Node hosting environment that supports Next.js.

## Known Notes

- `scaffold-tmp2/` and `__scaffold_tmp2__/` exist in this workspace and appear scaffold-related. Remove them if they are not needed for future work.
