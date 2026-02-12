# Pedro Lunet — Portfolio 2026

A minimal, motion-driven portfolio designed with a focus on typography,
technical precision, and meaningful digital experiences.

## 🛠 Tech Stack

- **Framework:** [SvelteKit 2](https://kit.svelte.dev/)
- **Animation:** [GSAP (GreenSock)](https://gsap.com/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Smooth Scroll:** [Lenis](https://github.com/darkroomengineering/lenis)
- **Icons:** [Lucide Svelte](https://lucide.dev/)
- **Deployment:** [Cloudflare Workers](https://workers.cloudflare.com/)

## ✨ Key Features

- **Fluid Motion:** Heavy use of GSAP timelines for entrance animations and state transitions.
- **Dynamic Layout:** A responsive "Swiss" grid that adapts between mobile, tablet, and ultra-wide screens.
- **Custom Navigation:** A unique header transition system using "ghost" element samplers to bridge page states.
- **Dynamic Projects:** Work pages generated via SvelteKit dynamic routes using structured JSON data.
- **SEO Optimized:** Fully configured with Open Graph meta tags, JSON-LD structured data, and an automated sitemap.

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/) (recommended) or pnpm

### Installation

1. Clone the repository:

```bash
git clone [https://github.com/PedroLunet/pedrolunet.dev.git](https://github.com/PedroLunet/pedrolunet.dev.git)
cd pedrolunet.dev
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm dev
```

## 🏗 Project Structure

- /src/lib/components: Reusable UI components (Hero, Menu, Tooltip, etc.)

- /src/lib/data: JSON files for experience and project content.

- /src/routes: SvelteKit page routing and API endpoints (sitemap).

- /static: Static assets like icons, fonts, and the CV.

## 📜 License

Designed and Developed by Pedro Lunet. Feel free to use the code as a reference for your own learning!
