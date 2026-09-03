# 📊 Photopya Admin Dashboard

<p align="left">
  <img src="https://img.shields.io/badge/Next.js-16.3+-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-19.2+-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Redux_Toolkit-2.12+-764ABC?style=for-the-badge&logo=redux&logoColor=white" alt="Redux Toolkit" />
  <img src="https://img.shields.io/badge/Socket.IO-Client-010101?style=for-the-badge&logo=socketdotio&logoColor=white" alt="Socket.IO" />
  <img src="https://img.shields.io/badge/Recharts-3.6+-22B5BF?style=for-the-badge" alt="Recharts" />
</p>

> **Modern, responsive, and high-performance Web Admin Dashboard for the Photopya Platform. Built with Next.js (App Router), React 19, TypeScript, Tailwind CSS v4, Redux Toolkit, and Real-time Socket.IO communications.**

---

## 🚀 Quick Navigation

- [Features](#-key-admin-features)
- [Tech Stack](#-tech-stack-overview)
- [System Architecture](#-system-architecture)
- [Quick Start](#-quick-start)
- [Environment Configuration](#-environment-configuration)
- [Project Structure](#-project-structure)
- [NPM Scripts](#-available-npm-scripts)

---

## 🌟 Key Admin Features

| Module | Capability | Details |
| :--- | :--- | :--- |
| **Dashboard Overview** | Analytics & Metrics | Real-time user stats, total revenue metrics, platform growth charts |
| **User Management** | User Control & Roles | View users, block/unblock accounts, role assignment (Admin, Professional, User) |
| **Analytics & Reports** | Financial & Activity Charts | Recharts interactive data visualization for revenue, bookings & subscription stats |
| **Subscriptions** | Membership Plans | Manage subscription tiers, active subscriber lists, plan pricing |
| **Payments & Payouts** | Financial Ledger | Transaction histories, Stripe payment logs, professional withdrawal requests |
| **Categories** | Content Taxonomy | Category & subcategory creation, icons, and service organization |
| **Content Moderation** | Quality Control | Moderate posts, flag user reports, review portfolio images & project ideas |
| **Project Ideas** | Showcase Control | Review and approve community project ideas and creative showcases |
| **Real-time Messages** | Support & Live Chat | Socket.IO client integration for real-time support desk & admin messaging |
| **Push Notifications** | System Broadcasts | Dispatch global or targeted push notifications via backend FCM triggers |

---

## 🏗️ System Architecture

```
                       ┌──────────────────────────────┐
                       │  Photopya Admin Web App      │
                       │  (Next.js App Router / React)│
                       └──────────────┬───────────────┘
                                      │
               ┌──────────────────────┴──────────────────────┐
               ▼                                             ▼
  ┌──────────────────────────┐                  ┌──────────────────────────┐
  │   Redux Toolkit & Axios  │                  │  Socket.IO WebSockets    │
  │   (HTTP / REST Client)   │                  │  (Real-time Chat/Alerts) │
  └────────────┬─────────────┘                  └────────────┬─────────────┘
               │                                             │
               └──────────────────────┬──────────────────────┘
                                      ▼
                        ┌──────────────────────────┐
                        │   Photopya REST Backend  │
                        │   (Node.js / Express API)│
                        └──────────────────────────┘
```

---

## 💻 Tech Stack Overview

- **Framework:** Next.js 16 (App Router)
- **UI & Components:** React 19, Radix UI Primitives (`@radix-ui`), Lucide React Icons (`lucide-react`)
- **Styling:** Tailwind CSS v4, `@tailwindcss/postcss`, `tw-animate-css`, `clsx`, `tailwind-merge`
- **State Management:** Redux Toolkit (`@reduxjs/toolkit`), React-Redux
- **Data Visualization:** Recharts 3.6+
- **HTTP Client:** Axios
- **Real-time WebSockets:** Socket.IO Client
- **Alerts & Modals:** Sonner (Toast notifications), SweetAlert2
- **Theming:** Next-Themes (Light/Dark mode support)

---

## ⚡ Quick Start

### 1. Prerequisites
- **Node.js**: v18.0.0 or higher
- **Photopya Backend API**: Running instance of the Photopya Express API

### 2. Installation
```bash
# Clone repository
git clone <repository-url>
cd photopia_admin

# Install dependencies
npm install
```

### 3. Environment Configuration
Create a `.env.local` file in the project root:
```env
NEXT_PUBLIC_BASE_URL=https://mohosin5001.binarybards.online/api/v1
```

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to launch the dashboard.

---

## 📦 Project Structure

```
photopia_admin/
├── app/
│   ├── (auth)/                 # Authentication pages (Login, Forgot Password, OTP)
│   ├── (dashboard)/            # Dashboard layout & feature modules
│   │   ├── analytics/          # Financial & activity report pages
│   │   ├── categories/         # Category & subcategory management
│   │   ├── dashboard/          # Metrics overview & quick stats
│   │   ├── messages/           # Real-time chat & support desk
│   │   ├── moderation/         # Content moderation & reports
│   │   ├── notifications/      # System push notifications dispatch
│   │   ├── payments/           # Stripe transactions & withdrawal logs
│   │   ├── project-ideas/      # Project idea showcases moderation
│   │   └── users/              # User management & role controls
│   ├── globals.css             # Tailwind CSS v4 global styles
│   ├── layout.tsx              # Root HTML & Provider layout
│   └── page.tsx                # Entry redirect page
├── components/                 # Reusable UI components & Radix primitives
├── context/                    # React Context providers
├── lib/                        # Redux store setup, Axios API instance, Socket utilities
├── types/                      # TypeScript interface definitions
├── .env.local                  # Environment configuration
└── package.json
```

---

## ⚙️ Available NPM Scripts

| Script | Command | Action |
| :--- | :--- | :--- |
| `dev` | `npm run dev` | Starts Next.js development server with hot-reload |
| `build` | `npm run build` | Compiles production build for Vercel/Node deployment |
| `start` | `npm run start` | Launches compiled production server |
| `lint` | `npm run lint` | Runs ESLint for Next.js code quality checks |

---

## 🛡️ License & Maintenance

Developed & Maintained for the **Photopya Platform**.
