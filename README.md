# 🚀 Aryan Sharma | Data Analyst Portfolio

A premium, fully responsive portfolio website built with **React + Vite + Tailwind CSS**.

## ✨ Features

- **Dark + White + Purple** hi-tech premium theme
- **Glassmorphism** UI with soft shadows & gradient effects
- **Framer Motion** scroll & page animations
- **Type Animation** in hero section
- **Recharts** analytics dashboard (Bar, Line, Pie charts)
- **Floating ChatBox** with auto-reply bot
- **Sticky Navbar** with active section detection
- **Loader animation** on page load
- **Contact form** with validation
- **Fully responsive** (mobile, tablet, desktop)
- **Clean folder structure** with reusable components

## 📁 Folder Structure

```
portfolio/
├── public/
│   ├── favicon.svg
│   └── aryan-sharma-cv.pdf
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Loader.jsx
│   │   ├── ChatBox.jsx
│   │   └── SectionWrapper.jsx
│   ├── sections/
│   │   ├── Hero.jsx
│   │   ├── About.jsx
│   │   ├── Skills.jsx
│   │   ├── Projects.jsx
│   │   ├── Certifications.jsx
│   │   ├── Education.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Contact.jsx
│   │   └── Footer.jsx
│   ├── data/
│   │   └── portfolioData.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js >= 16.x
- npm >= 8.x

### Steps

```bash
# 1. Navigate to project folder
cd portfolio

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Open in browser
# http://localhost:5173
```

### Build for Production

```bash
npm run build
npm run preview
```

## 🎨 Customization

All content is centralized in `src/data/portfolioData.js`:
- Edit your **name, title, bio** in `Hero.jsx`
- Update **projects** in `portfolioData.js → projects[]`
- Add/remove **certifications** in `portfolioData.js → certifications[]`
- Update **skills** in `portfolioData.js → skills`
- Replace the **profile emoji** in `Hero.jsx` with a real `<img>` tag

## 📦 Dependencies

| Package | Purpose |
|---|---|
| react + react-dom | UI framework |
| framer-motion | Animations |
| recharts | Charts (Bar, Line, Pie) |
| lucide-react | Icons |
| react-type-animation | Hero typing effect |
| react-intersection-observer | Scroll triggers |
| react-countup | Animated counters |
| tailwindcss | Styling |
| vite | Build tool |

## 📄 License
MIT — feel free to use and customize for your own portfolio!
