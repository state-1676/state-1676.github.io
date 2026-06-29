# State 1676 — Community site

Marketing and information site for **State 1676** in *Whiteout Survival*: NAP3 alliance network, event schedules, rules, embedded YouTube videos, and Discord links.

Built with **Next.js 15** (App Router), **React 19**, **TypeScript**, **Tailwind CSS v4**, **Framer Motion**, and **GSAP**.

## Requirements

- Node.js 20+ (recommended)
- npm (or pnpm / yarn / bun)

## Scripts

| Command        | Description                    |
| -------------- | ------------------------------ |
| `npm run dev`  | Dev server (Turbopack)         |
| `npm run build`| Production build               |
| `npm run start`| Run production build locally   |
| `npm run lint` | ESLint                         |

Dev server: [http://localhost:3000](http://localhost:3000)

## Project structure

```
src/
  app/                 # App Router: layout, page, globals
  components/          # UI sections (Hero, Alliances, Events, StateVideos, etc.)
  data/                # JSON + loaders — main content source
    config.json        # Server Discord, per-alliance Discord, recruitment form URL
    alliances.json     # Alliance cards (name, rank, colors, copy)
    events.json        # Per-alliance event times (UTC)
    videos.json        # YouTube list for State Videos section
    index.ts           # Exports + helpers (getAlliances, getVideos, …)
```

The home page composes: **Navigation**, **Hero**, **Alliances**, **Events**, **StateVideos**, **Join**, **Rules**. (`ServerBanner` exists but is commented out in `page.tsx`.)

## Updating content

Most edits are **data-only**; no code changes needed for typical updates.

### `src/data/config.json`

- **`discordLink`** — Main server Discord (Hero, nav, banner-style CTAs).
- **`allianceDiscordLinks`** — Keys match alliance `id` in `alliances.json` (`th3`, `arc`, `apx`). Used by alliance “Join … Discord” buttons.
- **`recruitmentFormUrl`** — Google Form opened from the Join / recruitment section.

### `src/data/alliances.json`

Alliance identity: `id`, `name`, `fullName`, `rank`, `members`, colors, gradients, description, achievements, etc. **Event rows** use `name` to match **`events.json`**.

### `src/data/events.json`

One object per alliance; **`name`** must match **`alliances.json`** `name` (e.g. `TH3`, `ARC`, `APX`). Use `"Vote Based"` and `isVoteDependent` where applicable.

### `src/data/videos.json`

Each entry: `id`, `title`, `youtubeId`, `channel`, optional **`date`** (`YYYY-MM-DD`) for **newest-first** sort. The State Videos section paginates (6 at a time, “Load more”).

### Site metadata

- **`src/app/layout.tsx`** — `metadata` (title, description, keywords, Open Graph).

### Images

- **`next.config.ts`** — `images.remotePatterns` includes `img.youtube.com` for thumbnails.

## Tech notes

- **Client components** use `'use client'` where GSAP, Framer Motion, or hooks are needed.
- Alliance Discord resolution: `Alliances.tsx` reads `serverConfig.allianceDiscordLinks[alliance.id]` with fallback to `serverConfig.discordLink`.
- Type helpers live in `src/data/types.ts` and `src/data/index.ts`.

## Deployment

Standard Next.js deploy (e.g. [Vercel](https://vercel.com)): connect the repo, run `npm run build`, set output per host docs. No env vars are required for the static JSON-driven content unless you add them later.

