# 🏰 GM Marriage Hall Royal Palace | Official Web Application

[![React](https://img.shields.io/badge/React-18.x-blue.svg?logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.x-646CFF.svg?logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-38B2AC.svg?logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

A high-performance, mobile-responsive, and SEO/AEO/GEO-optimized web platform built for **GM Marriage Hall Royal Palace** in Sheikhpura, Bihar. Designed to showcase banquet amenities, manage venue bookings, display pricing packages, and convert local search leads into direct customer inquiries.

---

## 📌 Project Overview

GM Marriage Hall is the premier AC banquet venue in Sheikhpura, Bihar. This web application serves as a digital front desk providing:

- **Interactive Venue Showcase:** Photo galleries, facility overviews, and event package tiers.
- **Direct Booking Engine:** Live availability checks and instant date reservations.
- **Local Search Dominance:** Specialized meta architecture designed to rank #1 on Google Search, Google Maps ("Marriage hall near me"), and AI Search Engines (ChatGPT, Perplexity, SearchGPT).

---

## 🚀 Key Features

- **⚡ Fast Client-Side Navigation:** Built with React 18, React Router v6, and Vite for ultra-fast page loads.
- **🔍 SEO + AEO + GEO Optimized:** Dynamic Meta Tag management using `react-helmet-async` with structured `JSON-LD` schemas for Event Venues and FAQ pages.
- **📍 Hyperlocal Geotargeting:** Embedded ICBM and Geo-position metadata (`25.1385, 85.8560`) targeting Sheikhpura, Bihar (`811107`).
- **📱 Responsive & Accessible UI:** Styled using Tailwind CSS with mobile-first UI patterns and smooth scroll behavior.
- **💬 Direct WhatsApp/Call Integration:** One-click booking queries connected directly to management (`+91 8920823219`).

---

## 📁 Repository & Project Structure

```text
gm-marriage-hall/
├── public/
│   ├── favicon.svg          # High-res vector favicon
│   ├── robots.txt           # Crawler instructions for Googlebot & AI Search Bots
│   └── sitemap.xml          # Search engine XML index map
│
├── src/
│   ├── assets/              # Images, venue photos, icons, logo SVGs
│   ├── components/          # Reusable UI components
│   │   ├── Footer.jsx       # Main footer with dynamic React Router Links
│   │   ├── Navbar.jsx       # Responsive navigation header
│   │   ├── SEOHead.jsx      # Dynamic Meta, OpenGraph & JSON-LD injection engine
│   │   └── ScrollToTop.jsx  # Automatic scroll reset on route change
│   │
│   ├── pages/               # Application route views
│   │   ├── Home.jsx         # Hero section, feature highlights, venue overview
│   │   ├── Booking.jsx      # Date availability checker & booking request form
│   │   ├── Packages.jsx     # Pricing tiers (Silver, Gold, Royal Platinum)
│   │   ├── Gallery.jsx      # Event photos and hall interior showcase
│   │   ├── Contact.jsx      # Map integration, phone numbers, contact form
│   │   └── FAQPage.jsx      # AEO/GEO optimized FAQ with Schema markup
│   │
│   ├── App.jsx              # Main App wrapper with Route definitions
│   ├── index.css            # Tailwind CSS directives & global styling rules
│   └── main.jsx             # Entry point wrapped with StrictMode & HelmetProvider
│
├── .gitignore               # Git ignored files (node_modules, dist, .env)
├── index.html               # Base HTML with local search & GEO tags
├── package.json             # NPM dependencies & operational scripts
├── tailwind.config.js       # Tailwind CSS configuration & custom theme rules
├── vite.config.js           # Vite build and dev setup
└── README.md                # Technical documentation
```

## 🛠️ Tech Stack & Tools Used

| Domain                 | Technology / Library    | Purpose                                     |
| :--------------------- | :---------------------- | :------------------------------------------ |
| **Frontend Framework** | **React 18**            | UI component architecture                   |
| **Build Tooling**      | **Vite**                | Fast module bundling & HMR                  |
| **Styling**            | **Tailwind CSS**        | Utility-first responsive design             |
| **Routing**            | **React Router DOM v6** | Single Page Application (SPA) navigation    |
| **Meta & Schema SEO**  | **React Helmet Async**  | Dynamic SEO, AEO, and GEO JSON-LD injection |
| **Iconography**        | **Lucide React**        | Modern lightweight icon set                 |

---

## 📈 Optimization Strategy (SEO / AEO / GEO)

This repository follows a 3-tier search engine optimization architecture:

### 1. Traditional SEO (Search Engine Optimization)

- **Dynamic Titles & Descriptions:** Applied across all routes via `<SEOHead />`.
- **Sitemap & Robots Protocol:** Clean crawling structure defined in `/public/sitemap.xml` and `/public/robots.txt`.
- **Canonical URLs:** Prevents duplicate content issues on single-page applications.

### 2. AEO (Answer Engine Optimization)

- Integrated `FAQPage` JSON-LD schemas.
- Structured microdata formatted to answer direct voice and conversational queries like:
  > _"Which is the best AC marriage hall near Sheikhpura Railway Station?"_

### 3. GEO (Generative Engine Optimization)

- Explicit entity relationships for LLM crawlers (Perplexity, SearchGPT, Gemini).
- Hardcoded geo-coordinates (`25.1385, 85.8560`), street-level addresses, founder details, and explicit key metrics (e.g., _"700 meters from Sheikhpura Junction"_).

---

## ⚙️ Getting Started Locally

### Prerequisites

- **Node.js:** `v18.0.0` or higher
- **npm:** `v9.0.0` or higher

### Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/your-username/gm-marriage-hall.git](https://github.com/your-username/gm-marriage-hall.git)
   cd gm-marriage-hall
   ```

# 📜 License

This project is proprietary software owned by GM Marriage Hall Royal Palace. All rights reserved.
