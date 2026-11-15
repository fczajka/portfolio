# franciszekczajka.me

> Personal portfolio website showcasing my work across cross-platform Flutter applications, edge AI products, and full-stack Next.js web platforms.

## Table of Contents

- [Demo](#demo)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup](#setup)
- [Scripts](#scripts)
- [Acknowledgements](#acknowledgements)
- [Contact](#contact)

## Demo

> Working live site: [_franciszekczajka.me_](https://www.franciszekczajka.me/)

## Features

- Animated SVG hero portrait (`HeroPortrait`) with subtle pointer parallax and `prefers-reduced-motion` support
- Theme-aware WebGL2 background particle field (`Particles`) with adaptive viewport budgeting
- Filterable project showcase (`All`, `Web`, `Mobile`) with interactive modals, swipeable lightbox slider, and dedicated SEO-friendly `/projects/[slug]` case study routes
- Dynamic OpenGraph & Twitter preview cards, `sitemap.xml`, `robots.txt`, and `Person` / `SoftwareApplication` JSON-LD metadata
- Scroll-progress professional snapshot & capabilities timeline alongside personal background
- Server-side EmailJS contact API (`POST /api/contact`) with rate limiting, length validation, honeypot filtering, and upstream timeouts

## Technologies Used

- Next.js - 13.5 (App Router)
- React - 18.2
- TypeScript - 4.9.5
- Tailwind CSS - 4.3
- React Toastify - 9.1.2
- Vitest - 2.1

## Setup

Install dependencies locally:

```bash
git clone https://github.com/fczajka/portfolio.git
cd portfolio
npm install
```

Copy `.env.example` to `.env.local` and configure your EmailJS server credentials for `POST /api/contact`:

```bash
cp .env.example .env.local
```

Start the development server:

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000).

## Scripts

- `npm run dev` — Start local development server
- `npm run build` — Create production build
- `npm run start` — Serve production build
- `npm run lint` — Run Next.js ESLint checks
- `npm run typecheck` — Run TypeScript typechecking (`tsc --noEmit`)
- `npm test` — Run Vitest unit & component tests
- `npm run format` / `npm run format:check` — Format or check code style with Prettier
- `npm run doctor` — Run React Doctor diagnostics

## Acknowledgements

This project was inspired by https://robbowen.digital/

## Contact

Created by [@fczajka](mailto:franekczajkaa@gmail.com) - feel free to contact me!
