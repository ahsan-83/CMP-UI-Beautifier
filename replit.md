# RAJUK Dashboard

## Overview

RAJUK (Rajdhani Unnayan Kartipakkha) government portal — a React JS single-page application for Bangladesh urban development authority. Built with React + Vite + Tailwind CSS + shadcn/ui.

## Stack

- **Language**: Plain JavaScript (React JS) — `.jsx` / `.js` files, no TypeScript
- **Framework**: React 19 + Vite 7
- **Styling**: Tailwind CSS v4 + shadcn/ui (New York style)
- **Routing**: Wouter
- **State**: TanStack Query (data fetching), React hooks
- **Package manager**: pnpm
- **Design**: Professional blue/white government portal; sidebar navy `#1a2840`

## Project Structure

```
rajuk-dashboard/
├── src/
│   ├── App.jsx                    # Root component, all routes
│   ├── main.jsx                   # Entry point
│   ├── index.css                  # Global styles + Tailwind theme
│   ├── components/
│   │   ├── layout/
│   │   │   ├── AppLayout.jsx      # Page wrapper
│   │   │   ├── Sidebar.jsx        # Navigation sidebar
│   │   │   └── TopNav.jsx         # Top navigation bar
│   │   ├── dashboard/             # Dashboard-specific components
│   │   └── ui/                    # shadcn/ui components
│   ├── pages/
│   │   ├── Dashboard.jsx
│   │   ├── ContractsPage.jsx      # Contract & Services (5 contracts, scrollable list)
│   │   ├── CustomerListPage.jsx
│   │   ├── InventoryListPage.jsx  # Cloud Service inventory
│   │   ├── ResourceDetailPage.jsx # VPS resource detail (SID-00075)
│   │   ├── OrderListPage.jsx
│   │   ├── OrderDetailPage.jsx    # Change Package activation bar
│   │   ├── RequestServicesPage.jsx
│   │   ├── ServiceDetailPage.jsx
│   │   ├── WishlistPage.jsx
│   │   └── NotificationsPage.jsx
│   ├── hooks/                     # Custom React hooks
│   ├── data/                      # Hardcoded mock data
│   └── lib/                       # Utilities (cn, etc.)
├── public/
│   ├── favicon.svg
│   ├── opengraph.jpg
│   └── images/                    # Logo assets (BCC, ICTD, NDC)
├── index.html
├── package.json
├── vite.config.js
└── components.json                # shadcn/ui config
```

## Dev Server

```bash
pnpm run dev       # Start dev server on port 5000
pnpm run build     # Production build → dist/
pnpm run serve     # Preview production build
```

## Pages & Routes

| Route | Page | Notes |
|-------|------|-------|
| `/` | Dashboard | Org profile, stats, recent services |
| `/customers` | CustomerListPage | |
| `/contracts` | ContractsPage | 5 contracts, scrollable list, tabs |
| `/services/:id` | ResourceDetailPage | VPS resource detail + action panel |
| `/cloud-service` | InventoryListPage | Inventory with icon header |
| `/request-services` | RequestServicesPage | Service catalog with plans |
| `/wishlist` | WishlistPage | |
| `/orders` | OrderListPage | |
| `/orders/:id` | OrderDetailPage | Change Package activation bar |
| `/notifications` | NotificationsPage | |

## Data

All data is hardcoded mock data — no real API calls. The `src/data/` and `src/hooks/` directories contain the static datasets.

## Key Design Decisions

- All dialogs prevent close on outside click (modified `dialog.jsx`)
- Primary color: `hsl(221 83% 53%)` (blue)
- Sidebar: navy `#1a2840`, header `#152035`
- Sidebar menu order: Dashboard → Customers → Contract & Services → Cloud Service → Request Based Service → My WishList → Order History → Inventory
