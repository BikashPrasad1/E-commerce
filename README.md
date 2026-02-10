# E‑commerce Store (React + Tailwind)

A modern, responsive e‑commerce storefront built with React and Tailwind CSS. This project focuses on a clean UI, fast navigation, and a full client‑only shopping flow.

## Features
- Product browsing with filters and search
- Product details with size selection
- Cart with quantity controls and live totals
- Client‑only checkout flow with order history
- Local storage persistence for cart, orders, and login
- Responsive layout and modern UI styling

## Tech Stack
- React + Vite
- Tailwind CSS
- React Router
- React Toastify

## Getting Started

Install dependencies:
```bash
npm install
```

Run the app:
```bash
npm run dev
```

Build for production:
```bash
npm run build
```

## Project Structure
```
src/
  assets/         # Images and data
  components/     # Reusable UI components
  context/        # Shop context (cart, orders, auth)
  pages/          # App pages
  App.jsx         # Routes and layout
  main.jsx        # App entry
```

## Notes
- This is a client‑only demo (no backend).
- Orders and authentication are stored in `localStorage`.

## License
MIT
