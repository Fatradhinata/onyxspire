# 🛡️ Onyxspire | Enterprise-Grade CSaaS Platform

> A modern, web-based Cybersecurity as a Service (CSaaS) platform orchestrating powerful penetration testing tools through a unified, intuitive, and highly interactive interface.

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-black?style=for-the-badge&logo=framer)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)

## 📖 Platform Overview
Onyxspire redefines how security assessments are executed by bridging the gap between hardcore command-line security tools and modern web applications. It provides a seamless, glassmorphism-inspired UI with real-time terminal simulations, dynamic data visualizations, and robust access control workflows.

*Note: This repository primarily showcases the frontend architecture and UI/UX engineering of the platform.*

---

## ✨ The Arsenal (Core Modules)
The dashboard simulates the integration of industry-standard security engines:

* **Deep Port Scanner (Nmap):** Interactive UI to configure SYN stealth scans, OS detection, and timing templates with real-time CLI command previews.
* **WPSCAN:** Automated CMS vulnerability auditing, highlighting outdated plugins and exposed endpoints.
* **SQLMAP:** SQL Injection detection matrix simulating boolean-based, error-based, and time-based blind injection workflows.
* **HYDRA & FFUF:** Brute-force authentication testing and hidden directory fuzzing simulations.

---

## 🏗️ Architecture & Pages

The application is built using the **Next.js App Router** with a strict separation of concerns between marketing, authentication, and internal dashboard routes.

### 1. Public & Marketing Zone `/(marketing)`
* **Landing Page:** High-conversion hero section, feature highlights, and animated cross-hatch decorative SVGs.
* **ROI Calculator:** A highly reactive, state-driven calculator using `useMemo` to instantly compute potential savings against manual pentesting costs, featuring a dynamic SVG gauge.
* **Dynamic Pricing:** Interactive tier comparison (Free, Starter, Pro, Enterprise) with a Framer Motion-powered Monthly/Annually toggle that smoothly recalculates pricing.
* **Documentation:** Comprehensive guide featuring `IntersectionObserver` for active-section sidebar highlighting and modular clipboard copy components.
* **Secure Contact (Link):** A highly styled form simulating AES-256 encrypted payload transmission with sequential status animations.

### 2. Authentication & Provisioning
* **Login Gateway:** Cyber-themed authentication page with interactive password visibility toggles and simulated network handshake states.
* **Multi-Stage Onboarding:** * *Stage 1:* Terminal boot sequence simulating tenant environment provisioning.
    * *Stage 2:* Configuration Wizard for perimeter setup.
    * *Stage 3:* License verification and finalization leading into a seamless redirect to the dashboard.

### 3. Command Center `/(dashboard)`
* **Persistent Sidebar Layout:** Dedicated workspace layout preventing re-renders of navigation components during route changes.
* **Automated Hub:** Centralized view of recent security runs and asset health.
* **Interactive Scan Interfaces:** Forms engineered with React Hooks to dynamically build CLI commands based on user input, paired with auto-scrolling terminal logs to simulate live engine feedback.

---

## 💻 Tech Stack
* **Framework:** Next.js (App Router)
* **Library:** React
* **Styling:** Tailwind CSS (with extensive custom configurations for gradients, blurs, and organic shapes)
* **Animations:** Framer Motion & native CSS Keyframes (`@keyframes`)
* **Typography:** JetBrains Mono (Code/Terminal) & Inter (UI) & AmarilloUSAF (Display Headers)

---

## 🚀 Getting Started

First, install the dependencies (ensure you resolve peer dependencies if using React 19):

```bash
npm install --legacy-peer-deps
# or
yarn install
