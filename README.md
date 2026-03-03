# link.eu - URL Shortener & Analytics

A modern, responsive Single Page Application (SPA) built with the latest **Angular** and **Tailwind CSS**. This project demonstrates a complete generation flow for shortening URLs and providing detailed link analytics.

## 🚀 Features

- **Homepage (Generation Flow):**
  - Clean, modern landing page with URL shortening capability.
  - URL validation and simulated safety checks.
  - Post-generation engagement for usage statistics.
- **My Lists:**
  - View all previously shortened links.
  - Displays original URL, short URL, and creation date.
- **Detailed Analytics:**
  - Total Clicks with dynamic trend percentage (+/-).
  - Visual Trend Chart for the last 7 days.
  - Visitor Split (Unique vs. Returning).
  - Device Distribution (Mobile vs. Desktop).
  - Traffic Sources (Direct, Social, Referral).

## 🛠️ Tech Stack

- **Framework:** [Angular v21+](https://angular.dev/) (Signal-based approach)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **State Management:** Angular Signals & Computed for reactive data flow.
- **Testing:** [Vitest](https://vitest.dev/) for fast unit testing.
- **Mocking:** Local service-based mocking for all link and analytics data.

## 🏁 Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) (LTS recommended) installed.

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd url-shortener
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Development Server

Run the development server for a local experience:

```bash
npm start
# or
ng serve
```

Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Build

To build the project for production:

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

## 🧪 Testing

Execute unit tests using Vitest:

```bash
npm test
```

## 📂 Project Structure

- `src/app/services/link.service.ts`: Core data management using Signals.
- `src/app/services/email.service.ts`: Dummy email service.
- `src/app/pages/home/`: Landing page and URL shortening logic.
- `src/app/pages/link/`: "My Lists" page displaying all links.
- `src/app/pages/link/id/`: Detailed analytics view for individual links.
- `src/app/components/`: Reusable UI components like Header and Layout.
