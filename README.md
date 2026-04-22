# Premium Developer Portfolio

A modern portfolio website built with React, Tailwind CSS, Framer Motion, and Supabase.

## Features

- Responsive portfolio layout with animated sections
- Pricing flow with eSewa payment helpers
- Contact form integration backed by Supabase
- Reusable UI components and Tailwind styling
- Vite-powered development and production builds

## Project Structure

```text
portfolio/
|-- public/
|   `-- vite.svg
|-- src/
|   |-- components/
|   |   |-- ui/
|   |   |-- About.jsx
|   |   |-- Contact.jsx
|   |   |-- Footer.jsx
|   |   |-- Hero.jsx
|   |   |-- Navbar.jsx
|   |   |-- PaymentStatusBanner.jsx
|   |   |-- Pricing.jsx
|   |   |-- Projects.jsx
|   |   |-- Services.jsx
|   |   `-- Skills.jsx
|   |-- lib/
|   |   |-- esewa.js
|   |   `-- supabase.js
|   |-- App.jsx
|   |-- index.css
|   `-- main.jsx
|-- .env.example
|-- supabase-schema.sql
|-- package.json
`-- README.md
```

## Setup

1. Install dependencies:

```bash
npm install
```

2. Copy the environment template:

```bash
cp .env.example .env
```

3. Fill in your Supabase values in `.env`:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

4. Run the SQL in `supabase-schema.sql` inside your Supabase project.

5. Start the development server:

```bash
npm run dev
```

6. Build for production:

```bash
npm run build
```

## Tech Stack

- React 18
- Vite 5
- Tailwind CSS 3
- Framer Motion
- Supabase
- Lucide React
