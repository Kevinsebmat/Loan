# Multi-Step Loan Application Builder

A modern, responsive loan application form built with Next.js, TypeScript, Tailwind CSS, Zustand, and Zod validation.

## 🚀 Features

- **4-Step Application Process**: Personal Information → Employment & Income → Loan Details → Review & Submit
- **Real-time Form Validation**: Using Zod schemas with react-hook-form
- **State Persistence**: Form data persists across browser sessions using Zustand
- **Progress Indicator**: Visual progress tracking with step completion status
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Type Safety**: Full TypeScript implementation
- **Performance Optimized**: Dynamic imports and memoization

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Form Handling**: React Hook Form
- **Validation**: Zod
- **Performance**: Dynamic imports, React.memo

## 📋 Form Steps

### 1. Personal Information
- First & Last Name
- Email & Phone
- Address (Street, City, State, ZIP)
- Date of Birth
- Social Security Number

### 2. Employment & Income
- Employer Name
- Position/Title
- Employment Type (Full-time, Part-time, Self-employed, Unemployed)
- Monthly Income
- Employment Duration
- Work Phone

### 3. Loan Details
- Loan Amount ($1,000 - $1,000,000)
- Loan Purpose (Home Purchase, Business, Personal, etc.)
- Loan Term (12-360 months)
- Collateral Information (optional)

### 4. Review & Submit
- Summary of all entered information
- Terms and conditions acceptance
- Final submission

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd loan-application
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
src/
├── app/
│   ├── globals.css          # Global styles and Tailwind directives
│   ├── layout.tsx           # Root layout component
│   └── page.tsx             # Main page with dynamic import
├── components/
│   ├── LoanApplication.tsx  # Main application orchestrator
│   ├── ProgressIndicator.tsx # Step progress visualization
│   ├── PersonalInfoStep.tsx # Step 1: Personal information form
│   ├── EmploymentStep.tsx   # Step 2: Employment information form
│   ├── LoanDetailsStep.tsx  # Step 3: Loan details form
│   └── ReviewStep.tsx       # Step 4: Review and submit
├── lib/
│   ├── schemas.ts           # Zod validation schemas
│   └── store.ts             # Zustand state management
└── types/
    └── loan.ts              # TypeScript interfaces
```

## 🎯 Key Features Explained

### Form Validation
- Each step uses Zod schemas for validation
- Real-time validation with react-hook-form
- Clear error messages for each field
- Users cannot proceed until validation passes

### State Management
- Zustand store with persistence
- Form data survives page refreshes
- Centralized state for all application data

### Performance Optimizations
- Dynamic imports for code splitting
- React.memo for component memoization
- Optimized re-renders with useCallback

### UX Features
- Progress indicator showing current step
- Backward navigation without data loss
- Responsive design for all screen sizes
- Loading states and success feedback

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 📱 Responsive Design

The application is fully responsive and works on:
- Desktop (1024px+)
- Tablet (768px - 1023px)
- Mobile (320px - 767px)

## 🎨 Customization

### Styling
- Custom Tailwind classes in `globals.css`
- Primary color scheme can be modified in `tailwind.config.js`
- Component-specific styles in each component file

### Validation Rules
- Modify Zod schemas in `src/lib/schemas.ts`
- Add new validation rules or modify existing ones

### Form Fields
- Add new fields by updating the TypeScript interfaces
- Update corresponding Zod schemas
- Modify form components as needed

## 🚀 Deployment

The application can be deployed to any platform that supports Next.js:

- **Vercel**: `vercel --prod`
- **Netlify**: `npm run build && netlify deploy`
- **AWS Amplify**: Connect repository and build
- **Docker**: Use the provided Dockerfile

## 📄 License

This project is licensed under the ISC License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📞 Support

For questions or issues, please open an issue in the repository. 