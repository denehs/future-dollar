# Tomorrow's Dollar

> **🧪 Vibe Coding Experimentation**  
> This project was built as a coding experimentation using Vibe Coding techniques - a rapid development approach focused on iterative building and real-time feedback.

A web-based financial planning tool that helps users understand the future value of their current spending decisions.

## 🎯 Purpose

Tomorrow's Dollar provides a tangible perspective on the opportunity cost of spending by showing how money spent today could grow over time through investment. The tool encourages more informed financial decisions and promotes long-term savings by visualizing the time value of money.

## ✨ Features

### Core Functionality
- **Spending Amount Calculator**: Input any dollar amount to see its potential future value
- **Custom Asset Allocation**: Set your preferred mix of stocks, bonds, and cash
- **Future Value Projections**: See both nominal and inflation-adjusted future values
- **Real-time Updates**: Calculations update instantly as you change inputs
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices

### Advanced Features
- **Collapsible Advanced Settings**: Customize return rates and inflation assumptions
- **Asset Allocation Validation**: Ensures percentages sum to 100%
- **Visual Feedback**: Color-coded results and error indicators
- **Educational Content**: Clear explanations of financial concepts

## 🚀 Getting Started

### Live Demo
Visit the live application at: https://future-dollar.workers.dev

### Local Development
1. Clone this repository
2. Install dependencies: `npm install`
3. Start development server: `npm run dev`
4. Open http://localhost:8787 in your browser

### Deployment
This application is deployed on Cloudflare Workers for global edge performance. See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment instructions.

## 💡 How to Use

### Basic Usage
1. **Enter Spending Amount**: Input the dollar amount you're considering spending (default: $100)
2. **Set Asset Allocation**: 
   - Stocks % (default: 75%)
   - Bonds % (default: 15%)
   - Cash % (default: 10%)
   - *Note: Total must equal 100%*
3. **Choose Target Year**: Set when you want to see the future value (default: current year + 10)
4. **View Results**: See both nominal and real (inflation-adjusted) future values

### Advanced Settings
Click "Advanced Assumptions" to customize:
- Annual Inflation Rate (default: 3%)
- Annual Stock Return (default: 7%)
- Annual Bond Return (default: 4%)
- Annual Cash Return (default: 1%)

## 📊 Understanding Your Results

### Nominal Future Value
The raw dollar amount your investment could grow to, not accounting for inflation. This shows the absolute growth potential.

### Real Future Value
What that future amount would be worth in today's purchasing power, after accounting for inflation. This shows the true value increase.

### Investment Summary
- **Weighted Average Annual Return**: Based on your asset allocation and assumed returns
- **Time Horizon**: Number of years from now to your target year
- **Inflation Assumption**: The annual inflation rate used in calculations

## 🧮 Calculation Method

The application uses standard financial formulas:

### Weighted Average Return
```
Weighted_Return = (Stocks_% × Stock_Return) + (Bonds_% × Bond_Return) + (Cash_% × Cash_Return)
```

### Nominal Future Value
```
Future_Value_Nominal = Spending_Amount × (1 + Weighted_Return/100)^Years
```

### Real Future Value (Inflation-Adjusted)
```
Future_Value_Real = Spending_Amount × ((1 + Weighted_Return/100) / (1 + Inflation_Rate/100))^Years
```

## 🛠 Technical Details

### Technologies Used
- **HTML5**: Semantic structure and accessibility
- **Tailwind CSS**: Modern, responsive styling
- **Vanilla JavaScript**: Client-side calculations and interactivity
- **No Dependencies**: Works offline and doesn't require a server

### Browser Compatibility
Supports all modern browsers:
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

### File Structure
```
├── assets/             # Static assets directory
│   ├── index.html      # Main application interface
│   └── script.js       # Application logic and calculations
├── worker.js           # Cloudflare Worker script
├── wrangler.toml       # Cloudflare Worker configuration
├── package.json        # Node.js dependencies and scripts
├── README.md           # Documentation
├── DEPLOYMENT.md       # Deployment guide
└── LICENSE             # License information
```

## 🎨 Design Features

- **Clean, Modern Interface**: Intuitive layout with clear visual hierarchy
- **Prominent Spending Input**: The main input field is visually emphasized
- **Responsive Grid Layout**: Adapts to different screen sizes
- **Color-Coded Results**: Green for gains, red for losses, blue for neutral
- **Smooth Animations**: Collapsible sections with CSS transitions
- **Accessibility**: Proper labels, focus states, and semantic HTML

## 📈 Example Scenarios

### Conservative Investor
- Stocks: 40%, Bonds: 50%, Cash: 10%
- Expected return: ~4.4%
- Lower risk, moderate growth

### Balanced Investor
- Stocks: 60%, Bonds: 30%, Cash: 10%
- Expected return: ~5.5%
- Moderate risk, good growth potential

### Aggressive Investor
- Stocks: 80%, Bonds: 15%, Cash: 5%
- Expected return: ~6.25%
- Higher risk, higher growth potential

## 🔮 Future Enhancements (Phase 2)

- Pre-filled asset allocation presets
- Historical performance data integration
- Graphical visualization of growth over time
- Save and share calculation results
- Multiple spending item comparisons
- Goal-based financial planning
- Dark mode theme option

## ⚠️ Disclaimer

This tool provides educational estimates only. Past performance does not guarantee future results. The calculations are based on simplified assumptions and should not be considered as investment advice. Please consult with a qualified financial advisor for personalized financial planning.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

## 📞 Support

If you encounter any issues or have questions about using Tomorrow's Dollar, please open an issue in this repository.

---

**Start making informed financial decisions today with Tomorrow's Dollar!** 💰