# 🇰🇪 PesaTracker - Kenyan Expense Manager


A modern expense tracker optimized for Kenyan users, featuring KES currency formatting and mobile-first design. Hosted on Vercel for fast performance.

##  Features

- **KES-First Design**
  - Auto-formatting for Kenyan Shillings
  - Localized date displays
  - Kenyan-themed UI colors

- **Smart Expense Management**
  -  Real-time spending analytics
  -  Instant search across all fields
  -  Category-based organization
  -  Mobile-optimized workflow

- **Advanced Controls**
  - One-click expense deletion
  - Multi-column sorting
  - Form validation
  - Responsive data table


[![Vercel Deployment](https://expense-tracker-react-2gudj58w6-eve-code93s-projects.vercel.app/)


## 🛠️ Tech Stack

| Frontend       | Backend       | Utilities       |
|----------------|---------------|-----------------|
| React 19       | Vercel Hosting| Tailwind CSS    |
| Vite           | GitHub Actions| date-fns        |
| React Icons    |               | ESLint          |

## 🖥️ Local Development

1. **Clone the repo**
```bash
git clone 
cd expense-tracker
Install dependencies

bash
Copy
npm install
Start dev server

bash
Copy
npm run dev
📦 Deployment
This project automatically deploys to Vercel on every git push to main branch.

Manual deployment:

Install Vercel CLI:

bash
Copy
npm install -g vercel
Deploy:

bash
Copy
vercel
🎨 Customization
To modify for other currencies:

Update the formatter in src/utils/currency.js

Change the currency symbol in ExpenseForm.jsx

🤝 Contributing
Fork the project

Create your feature branch (git checkout -b feature/AmazingFeature)

Commit your changes (git commit -m 'Add amazing feature')

Push to the branch (git push origin feature/AmazingFeature)

Open a Pull Request

📜 License
Distributed under the MIT License.