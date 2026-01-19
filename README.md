# Tramphuot - Travel & Tourism Website

A modern, multi-language travel and tourism website built with Next.js 16, featuring hotel bookings, tour packages, blog articles, and more.

## 🚀 Features

- **Multi-language Support**: Vietnamese and English using `next-intl`
- **Hotel Management**: Browse and book hotels with detailed information
- **Tour Packages**: Explore and book various tour packages
- **Blog System**: Read travel stories and stay-points articles
- **Responsive Design**: Fully responsive UI optimized for all devices
- **SEO Optimized**: Built-in SEO support with RankMath integration
- **Modern UI**: Beautiful interface built with Radix UI and Tailwind CSS
- **Animations**: Smooth animations powered by GSAP and Motion
- **Performance**: Optimized images with WebP format and caching

## 🛠️ Tech Stack

### Core
- **Next.js 16** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS 4** - Styling

### UI Components
- **Radix UI** - Accessible component primitives
- **Lucide React** - Icon library
- **Swiper** - Touch slider
- **Embla Carousel** - Carousel component

### State Management & Data Fetching
- **SWR** - Data fetching and caching
- **React Hook Form** - Form management
- **Zod** - Schema validation

### Internationalization
- **next-intl** - Internationalization framework

### Animations & Interactions
- **GSAP** - Animation library
- **Motion** - Animation library
- **Lenis** - Smooth scrolling

### Other Libraries
- **date-fns** - Date manipulation
- **query-string** - URL query string parsing
- **Sonner** - Toast notifications
- **next-themes** - Theme management

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 18.x or higher
- **npm**, **yarn**, **pnpm**, or **bun** package manager

## 🔧 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd tramphuot
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

3. Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_DOMAIN=your-domain.com
NEXT_PUBLIC_CMS=your-cms-url
NEXT_PUBLIC_API=your-api-url
```

4. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📜 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production (with Turbopack)
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting

## 📁 Project Structure

```
tramphuot/
├── src/
│   ├── app/              # Next.js App Router pages
│   │   └── [locale]/     # Internationalized routes
│   ├── components/        # Reusable UI components
│   ├── modules/          # Feature modules
│   │   ├── blogs/        # Blog functionality
│   │   ├── hotels/       # Hotel functionality
│   │   ├── tours/        # Tour functionality
│   │   └── ...
│   ├── services/         # API service layer
│   ├── hooks/            # Custom React hooks
│   ├── utils/            # Utility functions
│   ├── interface/        # TypeScript interfaces
│   ├── configs/          # Configuration files
│   └── i18n/             # Internationalization config
├── public/               # Static assets
├── messages/             # Translation files
│   ├── en.json           # English translations
│   └── vi.json           # Vietnamese translations
└── ...
```

## 🌐 Internationalization

The project supports two languages:
- **Vietnamese** (`vi`) - Default locale
- **English** (`en`)

Translation files are located in the `messages/` directory. Routes are automatically prefixed with the locale:
- `/vi/...` - Vietnamese pages
- `/en/...` - English pages

## 🎨 Styling

The project uses **Tailwind CSS 4** for styling. Component styles are co-located with components, and global styles can be found in the `src/app` directory.

## 🔌 API Integration

The project integrates with a WordPress CMS backend using Advanced Custom Fields (ACF). API endpoints are configured in `src/configs/endpoints.ts`.

## 🚢 Deployment

### Build for Production

```bash
npm run build
```

### Deploy to Vercel

The easiest way to deploy is using [Vercel Platform](https://vercel.com/new):

1. Push your code to a Git repository
2. Import your project on Vercel
3. Add environment variables
4. Deploy

For more details, see the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying).

## 📝 Code Style

- **ESLint** - Code linting
- **Prettier** - Code formatting
- **TypeScript** - Type checking

Run `npm run lint:fix` and `npm run format` before committing.

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Run linting and formatting
4. Submit a pull request

## 📄 License

This project is private and proprietary.

## 📞 Support

For support, please contact the development team.

---

Built with ❤️ using Next.js
