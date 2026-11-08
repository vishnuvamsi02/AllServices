# SevaSetu (సేవాసేతు) — Rural AP & Town Services Marketplace

A modern, mobile-first local services, business directory, and property marketplace web application designed specifically for villages and small towns across Andhra Pradesh, India.

---

## 🌟 Key Features

### 1. 🇮🇳 Bilingual First (English & Conversational Telugu)
- Full bilingual support in **English** and **Conversational Telugu** (`తెలుగు`).
- 1-tap instant language switch via the top navigation pill (`[EN | తె]`).
- Language preferences persist seamlessly across sessions.

### 2. 📱 Modern Mobile-App UX
- Designed as a **Progressive Web App (PWA) style** mobile interface.
- **Top Bar**: Instant village/location selector, compact brand emblem (`[సే SevaSetu]`), compact language toggle, and guest login / user profile avatar.
- **Search Bar**: Modern standalone search input with external filter trigger (`[ 🔍 Search services, businesses... ] [ 🎛 Filters ]`).
- **Floating Bottom Nav**: Sleek 3-pill navigation (`Home`, `Orders / Bookings`, `Settings`) optimized for one-hand thumb reach on mobile devices.

### 3. 👥 Role-Based Dashboards & Experiences
Switch between roles using the top interactive switcher or login credentials:
- **Customer Dashboard (`/dashboard/customer`)**:
  - Live booking tracker with real-time status badges (*Pending*, *Accepted*, *In Progress*, *Completed*).
  - Completed job summary with work descriptions and final billed amount.
  - **Verified Reviews**: ⭐ 1-to-5 star review system unlocked only on completed bookings.
  - Saved favorites and personalized service recommendations.
- **Service Provider Dashboard (`/dashboard/provider`)**:
  - Business analytics: Total earnings (₹), active jobs, completed jobs.
  - Incoming booking requests with one-tap *Accept* / *Decline*.
  - Work lifecycle actions: *Start Work* $\to$ *Mark Completed* with a modal to record work details and total amount charged.
  - Service catalog management and customer review showcase.
- **Local Business Dashboard (`/dashboard/business`)**:
  - Store order management with *Mark Fulfilled* and *Delivered*.
  - Inventory catalog management (seeds, fertilizers, cattle feeds) with instant stock toggles.
  - Business operating hours, address, and performance analytics.
- **Village Admin & Super Admin Dashboards**:
  - Provider verification, dispute resolution, village catalog control, and platform health metrics.
- **Guest Access**:
  - Clean, unauthenticated browsing with `[ 👤 Login ]` header trigger.
  - Interactive actions safely prompt login/register without broken state.

### 4. 📞 Zero-Friction Rural Communication
- No complicated third-party payment gateways.
- Direct **One-Tap Phone Call** and **WhatsApp Chat** integration connecting villagers directly with trusted local service providers.

---

## 🛠️ Technology Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **State Management**: React Context (`LanguageContext`, `AuthContext`, `MarketplaceContext`)

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18.17 or higher
- npm 9+

### Installation

```bash
# Clone the repository
git clone https://github.com/vishnuvamsi02/AllServices.git
cd AllServices

# Install dependencies
npm install

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📱 Testing on Mobile Phone

### Option A: Local Wi-Fi (Same Network)
1. Ensure your computer and mobile phone are connected to the same Wi-Fi network.
2. Find your computer's local IP address:
   - **Windows**: Run `ipconfig` in Command Prompt/PowerShell (look for *IPv4 Address*, e.g., `192.168.1.15`).
3. Start the Next.js server bound to all network interfaces:
   ```bash
   npm run dev -- -H 0.0.0.0
   # or for production build:
   npm run build
   npm run start -- -H 0.0.0.0
   ```
4. On your mobile phone browser, open:
   ```
   http://<YOUR-PC-IP>:3000
   # Example: http://192.168.1.15:3000
   ```

### Option B: Deploy to Vercel (1-Click Public Mobile Testing)
1. Go to [vercel.com](https://vercel.com/) and import your GitHub repository `https://github.com/vishnuvamsi02/AllServices`.
2. Click **Deploy**.
3. Open the generated `https://allservices-*.vercel.app` link directly on any mobile device.

---

## 📁 Project Structure

```
├── reference_screenshots/    # UI/UX reference benchmarks
├── src/
│   ├── app/                 # Next.js App Router pages
│   │   ├── dashboard/       # Role-specific dashboards (customer, provider, business, admin)
│   │   ├── services/        # Service listings and details
│   │   ├── businesses/      # Local business directory
│   │   ├── properties/      # Village property listings
│   │   ├── settings/        # App settings, language, terms, privacy
│   │   └── ...
│   ├── components/          # Reusable UI components
│   │   ├── common/          # Modals, LanguageSelector, RoleSwitcherBar
│   │   ├── home/            # HeroSection, TopCategoriesGrid, QuickActions
│   │   └── layout/          # Navbar, BottomNav, Footer
│   ├── context/             # Global Contexts (Auth, Language, Marketplace)
│   ├── data/                # Mock data, types, village listings
│   └── locales/             # en.json, te.json bilingual translation dictionaries
├── package.json
└── tailwind.config.js
```

---

## 📄 License

This project is licensed under the MIT License.
