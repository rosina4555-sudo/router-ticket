# RouterTicket

A platform for MikroTik hotspot business owners to manage voucher inventory and sell internet plans through personalized storefronts.

## Tech Stack

- **Vue 3** + Vite
- **Tailwind CSS v4**
- **Pinia** — state management
- **Vue Router** — route-level code splitting
- **Vitest** — unit testing

## Getting Started

```bash
npm install
npm run dev
```

The app runs at `http://localhost:5173`.

## Project Structure

```
src/
├── api/              # API abstraction layer (mock → live swap point)
├── mocks/            # Mock data and handlers
├── stores/           # Pinia stores
├── router/           # Route definitions
├── layouts/          # Dashboard (dark) and Storefront (light)
├── components/       # Shared + domain components
├── views/            # Page-level views
│   ├── dashboard/    # Owner-facing pages
│   └── storefront/   # Customer-facing pages
└── __tests__/        # Unit tests
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |
| `npx vitest run` | Run tests |

## Architecture

The app has two distinct interfaces sharing one design system:

- **Dashboard** (`/dashboard`) — dark, dense, numeric. For owners managing stock and sales daily.
- **Storefront** (`/store`) — light, minimal, mobile-first. For customers buying plans in five seconds.

All data fetching goes through an API abstraction layer (`src/api/`). Currently backed by mock handlers with simulated latency. To integrate a live API, swap the import in each module from `mocks/handlers` to an HTTP client — no component or store changes needed.

## License

Private
