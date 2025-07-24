# 📋 Loan Application Builder

A modern, multi-step loan application form built with Next.js, TypeScript, and Tailwind CSS. Features comprehensive form validation, dark mode support, and smooth animations.

## ✨ Features

### 🎯 Core Functionality
- **4-Step Application Process**: Personal Info → Employment → Loan Details → Review & Submit
- **Real-time Validation**: Zod schema validation with helpful error messages
- **State Persistence**: Form data saved to localStorage automatically
- **Progress Tracking**: Visual progress indicator with step completion
- **Responsive Design**: Works seamlessly on desktop and mobile devices

### 🎨 User Experience
- **Dark Mode Toggle**: Modern dark/light theme switching
- **Smooth Animations**: Confetti celebrations between steps and on completion
- **Form Validation**: Comprehensive validation with clear error messages
- **Phone Number Validation**: Smart validation accepting multiple formats
- **Modern UI**: Glass morphism effects, gradients, and modern styling

### 🛠 Technical Features
- **Next.js 14** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Zustand** for state management
- **React Hook Form** for form handling
- **Zod** for schema validation
- **Jest & React Testing Library** for testing

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Loan
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
Loan/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── globals.css        # Global styles
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Main page
│   ├── components/            # React components
│   │   ├── PersonalInfoStep.tsx
│   │   ├── EmploymentStep.tsx
│   │   ├── LoanDetailsStep.tsx
│   │   ├── ReviewStep.tsx
│   │   ├── LoanApplication.tsx
│   │   ├── ProgressIndicator.tsx
│   │   ├── ThemeToggle.tsx
│   │   ├── ProgressCelebration.tsx
│   │   ├── FormField.tsx
│   │   └── LoadingSpinner.tsx
│   ├── lib/                   # Utilities and configurations
│   │   ├── store.ts           # Zustand store
│   │   ├── schemas.ts         # Zod validation schemas
│   │   ├── hooks.ts           # Custom hooks
│   │   ├── theme.tsx          # Theme context
│   │   └── utils.ts           # Utility functions
│   └── types/                 # TypeScript type definitions
│       └── loan.ts
├── public/                    # Static assets
├── jest.config.js            # Jest configuration
├── jest.setup.js             # Jest setup
├── next.config.js            # Next.js configuration
├── tailwind.config.js        # Tailwind CSS configuration
├── tsconfig.json             # TypeScript configuration
└── package.json              # Dependencies and scripts
```

## 🎮 Usage

### Application Flow

1. **Personal Information** (Step 1)
   - Name, email, phone number
   - Address information
   - Date of birth
   - Phone validation accepts multiple formats: `(555) 123-4567`, `555-123-4567`, etc.

2. **Employment & Income** (Step 2)
   - Employer details
   - Position and employment type
   - Monthly income
   - Work phone number

3. **Loan Details** (Step 3)
   - Loan amount ($1,000 - $1,000,000)
   - Purpose and term
   - Collateral information

4. **Review & Submit** (Step 4)
   - Summary of all entered information
   - Final submission with celebration

### Features

- **Navigation**: Use "Next" and "Previous" buttons to navigate between steps
- **Validation**: Each step validates before allowing progression
- **Persistence**: Data is automatically saved to localStorage
- **Dark Mode**: Toggle theme using the button in the top-right corner
- **Progress**: Visual progress indicator shows current step and completion percentage

## 🧪 Testing

### Run Tests
```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Test Coverage
- Component unit tests
- Hook testing
- Store testing
- Theme functionality testing

## 🏗 Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server

# Testing
npm test             # Run tests
npm run test:watch   # Run tests in watch mode
npm run test:coverage # Run tests with coverage

# Linting
npm run lint         # Run ESLint
```

## 🎨 Styling

### Tailwind CSS Configuration
- Custom color palette with primary colors (50-900)
- Dark mode support with `darkMode: 'class'`
- Custom animations and keyframes
- Glass morphism effects
- Gradient backgrounds

### Custom CSS Classes
- `.btn-primary` - Primary button styling
- `.btn-secondary` - Secondary button styling
- `.input-field` - Form input styling
- `.error-message` - Error message styling
- `.card` - Card container styling

## 🔧 Configuration

### Environment Variables
No environment variables required for basic functionality.

### Browser Support
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 📱 Phone Number Validation

The application includes comprehensive phone number validation:

### Accepted Formats
- `(555) 123-4567`
- `555-123-4567`
- `5551234567`
- `1-555-123-4567`
- `+1-555-123-4567`

### Validation Rules
- Minimum 10 digits
- Maximum 11 digits
- Country code must be '1' if 11 digits
- Flexible input formatting

## 🎉 Animations

### Confetti Animation
- Physics-based confetti particles
- Multiple shapes (circle, square, triangle)
- 8 vibrant colors
- Realistic falling and rotation effects
- Triggers on step completion and final submission

### Transitions
- Smooth step transitions
- Fade-in/out effects
- Scale animations on buttons
- Progress bar animations

## 🐛 Troubleshooting

### Common Issues

1. **Styles not loading**
   ```bash
   # Clear cache and reinstall
   rm -rf node_modules package-lock.json
   npm install
   ```

2. **Phone validation errors**
   - Ensure phone number has at least 10 digits
   - Check for valid country code if using 11 digits

3. **Form not progressing**
   - Check browser console for validation errors
   - Ensure all required fields are filled
   - Verify date of birth makes you at least 18 years old

### Development Tips

- Use browser dev tools to inspect form validation
- Check localStorage for saved form data
- Test dark mode toggle functionality
- Verify responsive design on different screen sizes

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Tailwind CSS for the utility-first styling
- Zustand for lightweight state management
- Zod for excellent schema validation
- React Hook Form for efficient form handling

---

**Happy coding! 🚀** 