# 🛒 বাজার দর (BazarDor)

**নিত্যপ্রয়োজনীয় পণ্যের বর্তমান বাজারদর জানুন এক নজরে।**

বাজার দর একটি responsive web application, যেখানে ব্যবহারকারীরা বাংলাদেশের নিত্যপ্রয়োজনীয় পণ্যের দৈনিক দাম, দাম বৃদ্ধি ও হ্রাসের তথ্য এবং বিভিন্ন বাজারের মূল্য তুলনা করতে পারবেন। ব্যবহারকারীরা category অনুযায়ী পণ্য দেখতে পারবেন এবং বিস্তারিত price information দেখার জন্য authentication ব্যবহার করতে পারবেন।

## 🌐 Live Demo

- **Live Link:** [Add Your Deployed Website URL]
- **GitHub Repository:** [Add Your GitHub Repository URL]

## ✨ Key Features

1. **📊 Daily Price Updates** — চাল, ডাল, সবজি, মাছ, মাংসসহ বিভিন্ন নিত্যপ্রয়োজনীয় পণ্যের দাম দেখা যায়।
2. **📈 Price Increase & Decrease** — আজ কোন পণ্যের দাম বেড়েছে বা কমেছে, তার তালিকা দেখা যায়।
3. **🔎 Product Details** — পণ্যের সর্বনিম্ন, সর্বোচ্চ ও গড় দাম এবং বিভিন্ন বাজারের মূল্য দেখা যায়।
4. **🗂️ Category-Based Browsing** — category অনুযায়ী পণ্য খোঁজা এবং দাম কম থেকে বেশি বা বেশি থেকে কম সাজানো যায়।
5. **🔐 Secure Authentication** — Better Auth-এর মাধ্যমে email/password, Google এবং GitHub login ও registration।
6. **👤 Profile Management** — ব্যবহারকারীরা নিজের profile information update করতে পারেন।
7. **📱 Fully Responsive Design** — mobile, tablet ও desktop-এ ব্যবহার উপযোগী interface।
8. **🔔 Toast Notifications** — login, registration, logout এবং validation-এর success/error feedback।
9. **⏳ Loading & Error States** — data loading indicator এবং invalid route-এর জন্য friendly 404 page।
10. **🇧🇩 Bengali User Interface** — বাংলা ভাষা, বাংলা সংখ্যা এবং স্থানীয় বাজারের জন্য উপযোগী presentation।

## 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| Next.js | React-based web application and routing |
| React | Reusable UI components |
| TypeScript | Type safety and maintainable code |
| Tailwind CSS | Responsive styling and layout |
| Better Auth | Authentication and user management |
| React Hot Toast | Success and error notifications |
| REST API | Product and category data |
| Git & GitHub | Version control and source code management |
| Vercel | Deployment and hosting |

## 📂 Main Application Sections

- **Navbar:** Logo, Bengali date, category navigation and authentication controls।
- **Price Ticker:** Scrolling strip showing product names, prices and percentage changes।
- **Hero Banner:** Introductory section with a call-to-action button leading to all products।
- **Price Trends:** Separate sections for products whose prices increased or decreased।
- **All Products:** Responsive product-card grid with Bengali prices and change indicators।
- **Category Page:** Category-specific products with price sorting and empty states।
- **Product Details:** Product summary, minimum/maximum/average prices and market-wise prices।
- **Authentication:** Sign-in, sign-up and social login options।
- **My Profile:** User information and profile update functionality।
- **404 Page:** Friendly error page with a button to return to the home page।
- **Footer:** Project information and a market-price disclaimer।

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js (LTS version recommended)
- npm, yarn, pnpm or bun
- Git

### 1. Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

### 2. Navigate to the Project

```bash
cd bazar-dor
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Environment Variables

Create a `.env.local` file in the root directory and add the environment variables required by your Better Auth configuration.

Example:

```env
BETTER_AUTH_SECRET=your_secure_secret
BETTER_AUTH_URL=http://localhost:3000

# Add your database configuration
# Add Google OAuth credentials
# Add GitHub OAuth credentials
```

Use the exact environment variable names expected by your project configuration. Set the production values and OAuth callback URLs in your hosting provider's environment settings. **Never commit real secrets or OAuth credentials to GitHub.**

### 5. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 6. Build for Production

```bash
npm run build
```

To run the production build locally:

```bash
npm run start
```

## 🔐 Authentication

BazarDor uses Better Auth for user authentication.

Supported authentication features:

- Email and password registration.
- Email and password login.
- Google social login.
- GitHub social login.
- User profile information update.
- Logout and authentication feedback.

Social login requires valid provider credentials and correctly configured callback URLs.

## 📱 Responsive Design

The application is designed to work across:

- 📱 Mobile phones
- 📲 Tablets
- 💻 Desktop and laptop screens

The layout adapts to screen size, including the navigation, hero section, product cards and footer.

## 📌 Important Notes

- Product prices are indicative and may change according to market conditions.
- Product information depends on the configured API and its available data.
- Authentication and protected pages require a correctly configured Better Auth setup.
- Deployment environment variables must be configured before production use.

## 👨‍💻 Author

**Project:** বাজার দর (BazarDor)

**Purpose:** Academic project demonstrating responsive web development, API integration, authentication, routing and product-price presentation.

---

⭐ If you find this project useful, feel free to explore the repository and share your feedback.

**বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।**
