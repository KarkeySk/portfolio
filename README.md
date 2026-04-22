# 🚀 Premium Developer Portfolio

A high-end, modern portfolio website built with **React**, **Tailwind CSS**, **Framer Motion**, and **Supabase**.

![React](https://img.shields.io/badge/React-18-61dafb?style=flat-square&logo=react)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-3-38bdf8?style=flat-square&logo=tailwindcss)
![Vite](https://img.shields.io/badge/Vite-5-646cff?style=flat-square&logo=vite)
![Supabase](https://img.shields.io/badge/Supabase-✓-3fcf8e?style=flat-square&logo=supabase)

---

## ✨ Features

- 🎨 **Premium Dark Theme** — Glassmorphism, gradient accents, ambient lighting
- 🎬 **Smooth Animations** — Framer Motion stagger, spring, and scroll-triggered effects
- 📱 **Fully Responsive** — Mobile-first design that works beautifully on all devices
- 📧 **Contact Form → Supabase** — Messages stored in PostgreSQL via Supabase
- 💬 **Lead Capture Flow** — Pricing tiers route visitors into a tailored contact inquiry
- 🔒 **Row Level Security** — Supabase RLS policies for secure data access
- ⚡ **Blazing Fast** — Vite dev server with HMR, optimized production builds
- 🧱 **Clean Architecture** — Reusable components, proper separation of concerns

## 📂 Project Structure

```
portfolio/
├── public/
│   └── vite.svg
├── src/
│   ├── components/
│   │   ├── ui/                  # Reusable UI primitives
│   │   │   ├── AnimatedSection.jsx
│   │   │   ├── GlassCard.jsx
│   │   │   ├── GradientButton.jsx
│   │   │   └── SectionHeading.jsx
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx
│   │   ├── About.jsx
│   │   ├── Skills.jsx
│   │   ├── Projects.jsx
│   │   ├── Services.jsx
│   │   ├── Pricing.jsx
│   │   ├── Contact.jsx
│   │   └── Footer.jsx
│   ├── lib/
│   │   ├── supabase.js          # Supabase client & helpers
│   │   └── supabase.js          # Supabase client & contact form helper
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css                # Tailwind + custom styles
├── .env.example
├── supabase-schema.sql
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
├── package.json
└── README.md
```

---

## 🛠️ Setup Guide

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Variables

Copy the example env file and fill in your credentials:

```bash
cp .env.example .env
```

Edit `.env` with your actual keys:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### 3. Supabase Setup

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to **SQL Editor** in your Supabase dashboard
3. Paste and run the contents of `supabase-schema.sql`
4. Copy your project URL and anon key from **Settings → API**

### 5. Run Development Server

```bash
npm run dev
```

Your portfolio will be available at `http://localhost:5173`.

### 6. Build for Production

```bash
npm run build
npm run preview  # Preview the production build locally
```

---

## 🎨 Customization

### Personalize Content

- **Hero section** → `src/components/Hero.jsx`
- **About / Bio** → `src/components/About.jsx`
- **Skills** → `src/components/Skills.jsx`
- **Projects** → `src/components/Projects.jsx`
- **Services** → `src/components/Services.jsx`
- **Pricing** → `src/components/Pricing.jsx`
- **Contact info** → `src/components/Contact.jsx`
- **Social links** → `Hero.jsx`, `Footer.jsx`

### Modify Theme

Edit `tailwind.config.js` to change colors, fonts, and animations.

---

## 📦 Tech Stack

| Technology | Purpose |
|---|---|
| React 18 | UI framework |
| Vite 5 | Build tool & dev server |
| Tailwind CSS 3 | Utility-first styling |
| Framer Motion | Animations & transitions |
| Supabase | Backend (PostgreSQL + Auth) |
| Supabase | Contact form backend |
| Lucide React | Icon library |

---

## 📝 License

MIT — free to use for personal and commercial projects.
