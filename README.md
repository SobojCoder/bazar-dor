<div align="center">

# 🛒 বাজার দর | BazarDor

**প্রয়োজনীয় পণ্যের দাম এক নজরে।**
A Bengali market-price tracker for everyday essentials (rice, lentils, oil, vegetables, fish, meat, dairy and spices) across markets in Bangladesh.

## 🚀 Live Demo

🔗 **Live Website:** https://bazar-dor-eight-pi.vercel.app/

🔗 **GitHub Repository:** https://github.com/SobojCoder/bazar-dor
</div>

---

## 📖 Description

**BazarDor (বাজার দর)** helps people see today's prices of daily-use products at a glance. It shows how each price changed compared to yesterday, which products rose or fell the most, and the minimum, maximum and average price across different bazaars and divisions. The whole interface is in Bengali, including Bengali numerals and the Bangla date.

Product data comes from the public BazarDor API (`https://openapi.programming-hero.com/api/bazardor`).

## ✨ Key Features

1. **Live price ticker:** an infinite scrolling marquee below the header showing emoji, product name, price per unit and a green ▲ / red ▼ change percentage.
2. **Top risers and fallers:** the home page highlights the 6 products whose price rose the most ("আজ দাম বেড়েছে ▲") and fell the most ("আজ দাম কমেছে ▼").
3. **Category browsing with sorting:** category navigation with an active-link highlight, plus a sort dropdown (Default, Price: Low to High, Price: High to Low) that sorts by numeric value.
4. **Detailed price breakdown:** each product page shows the minimum, maximum and average price and a market-by-market table with division, min, max and average. This page is a protected route.
5. **Authentication with Better Auth:** email and password sign up and sign in, Google and GitHub social login, and sign out, with toast notifications for success and errors.
6. **Profile management:** a profile page where users can view their account and update their name on a separate route.
7. **Polished UX:** skeleton loaders while data loads, a friendly custom 404 page and an empty state for categories without products.
8. **Fully responsive:** designed for mobile (single-column grids), tablet and desktop.

## 🛠️ Technologies Used

| Technology | Purpose |
| --- | --- |
| [Next.js](https://nextjs.org/) (App Router) | Framework, routing and server rendering |
| [TypeScript](https://www.typescriptlang.org/) | Type safety |
| [Tailwind CSS](https://tailwindcss.com/) | Styling and responsive design |
| [DaisyUI](https://daisyui.com/) | UI components (dropdowns) |
| [Better Auth](https://www.better-auth.com/) | Email/password, Google and GitHub authentication |
| [react-hot-toast](https://react-hot-toast.com/) | Toast notifications |
| [react-icons](https://react-icons.github.io/react-icons/) | Icons |
| [react-marquee-text](https://www.npmjs.com/package/react-marquee-text) | Scrolling price ticker |

## 🗺️ Routes

| Route | Description | Access |
| --- | --- | --- |
| `/` | Home: ticker, top risers, top fallers, all products | Public |
| `/productsDetails/[productId]` | Category page with sorting | Public |
| `/itemDetails/[itemId]` | Product details with market-wise prices | Protected |
| `/signin` | Sign in | Public |
| `/signup` | Sign up | Public |
| `/profile` | My profile | Signed-in users |
| `/profile/update` | Update profile name | Signed-in users |
| `*` | Custom 404 page | Public |

## 🚀 Getting Started

### Prerequisites

- Node.js 18 or later
- npm (or yarn / pnpm)
- A database supported by Better Auth
- Google and GitHub OAuth credentials (for social login)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-username/bazar-dor.git
cd bazar-dor

# 2. Install dependencies
npm install

# 3. Create the environment file (see below)
cp .env.example .env.local

# 4. Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Environment Variables

Create a `.env.local` file in the project root. Use the variable names your auth setup reads:

```env
BETTER_AUTH_SECRET=your_random_secret
BETTER_AUTH_URL=http://localhost:3000

# Database connection used by Better Auth
DATABASE_URL=your_database_connection_string

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# GitHub OAuth
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
```

For OAuth, add these callback URLs in the Google and GitHub developer consoles:

- `http://localhost:3000/api/auth/callback/google`
- `http://localhost:3000/api/auth/callback/github`

After deployment, add the same two paths with your live domain.

### Available Scripts

```bash
npm run dev     # Start the development server
npm run build   # Create a production build
npm run start   # Run the production build
npm run lint    # Lint the code
```

## ☁️ Deployment

The project is deployed on **Vercel**.

1. Push the repository to GitHub.
2. Import it in Vercel.
3. Add all environment variables from above (set `BETTER_AUTH_URL` to your live domain).
4. Update the Google and GitHub OAuth callback URLs with the live domain.
5. Deploy.

## 📁 Project Structure

```text
├── app/
│   ├── page.tsx                      # Home page
│   ├── loading.tsx                   # Home skeleton
│   ├── not-found.tsx                 # Custom 404 page
│   ├── signin/                       # Sign in page
│   ├── signup/                       # Sign up page
│   ├── profile/                      # Profile and update pages
│   ├── productsDetails/[productId]/  # Category page
│   └── itemDetails/[itemId]/         # Product details (protected)
├── components/                       # Header, Navbar, Marquee, cards, sections
├── lib/                              # Better Auth client and config
├── Type/                             # TypeScript interfaces
└── utills/                           # Bengali number and unit helpers
```

## 📸 Screenshots

Add screenshots of the home page, category page, product details and mobile view here.

```md
![Home](./screenshots/home.png)
```

## 🔌 Data Source

Prices and categories are fetched from the BazarDor open API:

- Products: `https://openapi.programming-hero.com/api/bazardor/products`
- Categories: `https://openapi.programming-hero.com/api/bazardor/categories`

## ⚠️ Disclaimer

সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
(All prices are approximate and may change depending on market conditions.)

## 📄 License

This project was built for learning purposes.
