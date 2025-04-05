# BTC/USD Order Book — React + TypeScript + Vite

A real-time BTC/USD Order Book built using:

- React
- TypeScript
- Vite
- Centrifuge WebSocket for live market data

This project mimics a trading platform order book, inspired by professional UIs like RabbitX, with features like depth visualization, cumulative totals, and responsive design.

---

## Features

- Real-time live updates (WebSocket)
- Optimized state management using `useRef` & `useContext`
- Efficient data handling with in-place mutation and sorting
- Depth visualization using cumulative totals
- Responsive, minimal UI built with Tailwind CSS
- Clean and modular architecture

---

## Project Structure

```
src/
├── components/          # Reusable UI components (OrderBook, Rows)
├── context/             # Global state management (AppProvider, AppContext)
├── utils/               # Utility functions & constants (updateData, sort, calculateCumulative)
├── types/               # Global TypeScript types
├── App.tsx              # Main UI entrypoint
├── main.tsx             # React/Vite bootstrap
└── index.css            # Tailwind CSS config
```

---

## Setup & Run

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Vite will start the development server at:

```
http://localhost:5173
```

---

## WebSocket Configuration

The app connects to a WebSocket server (Centrifuge) for live order book data.

Set your `.env` file with:

```bash
VITE_TOKEN=your_auth_token
```

The WebSocket URL is configured in:

```tsx
src / utils / constants.ts;
```

---

## Core Logic

Live order book updates are handled inside:

```tsx
src / utils / commonFunctions.ts;
```

Key functions:

- `updateData` → Efficient order book update handling with sequence validation
- `updateOrderMap` → In-place mutation of bids & asks map
- `sortOrderBookData` → Sorting bids & asks
- `calculateCumulative` → Generating cumulative totals for depth visualization

---

## Tech Stack

| Tech         | Purpose                       |
| ------------ | ----------------------------- |
| React        | Frontend Framework            |
| TypeScript   | Type Safety                   |
| Vite         | Build Tool                    |
| Tailwind CSS | Styling                       |
| Centrifuge   | Real-time WebSocket Data Feed |

---

## Deployment

To build the project for production:

```bash
npm run build
```

Preview production build locally:

```bash
npm run preview
```
