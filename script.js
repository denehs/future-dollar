// Translation system
const translations = {
    'en': {
        'page-title': "Tomorrow's Dollar - Financial Planning Tool",
        'title': "Tomorrow's Dollar",
        'subtitle': "Understand the future value of your spending decisions",
        'spending-amount': "Spending Amount (USD)",
        'asset-allocation': "Asset Allocation",
        'stocks': "Stocks (%)",
        'bonds': "Bonds (%)",
        'cash': "Cash (%)",
        'auto-adjusts': "- Auto adjusts",
        'allocation-error': "Asset allocation must sum to 100%",
        'total': "Total:",
        'target-year': "Target Year",
        'advanced-assumptions': "Advanced Assumptions",
        'inflation-rate': "Annual Inflation Rate (%)",
        'stock-return': "Annual Stock Return (%)",
        'bond-return': "Annual Bond Return (%)",
        'cash-return': "Annual Cash Return (%)",
        'reset-defaults': "Reset to Defaults",
        'reset-all-defaults': "Reset All to Defaults",
        'future-value-calculation': "Future Value Calculation",
        'if-you-spend': "If you spend",
        'today': "today...",
        'in-the-year': "...in the year",
        'years-from-now': "years from now), that amount could have grown to approximately:",
        'opportunity-cost-label': "Opportunity Cost (in today's dollars, after inflation)",
        'nominal-value-label': "Nominal Future Value (without considering inflation)",
        'understanding-results': "Understanding Your Results",
        'opportunity-cost-explanation-label': "Opportunity Cost:",
        'opportunity-cost-explanation': "What you're potentially giving up by spending this money today instead of investing it, shown in today's purchasing power after accounting for inflation.",
        'nominal-value-explanation-label': "Nominal Value:",
        'nominal-value-explanation': "The raw dollar amount your investment could grow to, not accounting for inflation.",
        'investment-summary': "Investment Summary",
        'weighted-average-return': "Weighted Average Annual Return:",
        'time-horizon': "Time Horizon:",
        'inflation-assumption': "Inflation Assumption:",
        'disclaimer': "This tool provides educational estimates only. Past performance does not guarantee future results. Consult a financial advisor for personalized advice."
    },
    'zh-TW': {
        'page-title': "明日美元 - 財務規劃工具",
        'title': "明日美元",
        'subtitle': "了解您消費決策的未來價值",
        'spending-amount': "消費金額 (美元)",
        'asset-allocation': "資產配置",
        'stocks': "股票 (%)",
        'bonds': "債券 (%)",
        'cash': "現金 (%)",
        'auto-adjusts': "- 自動調整",
        'allocation-error': "資產配置必須總計為 100%",
        'total': "總計:",
        'target-year': "目標年份",
        'advanced-assumptions': "進階假設",
        'inflation-rate': "年通脹率 (%)",
        'stock-return': "年股票回報率 (%)",
        'bond-return': "年債券回報率 (%)",
        'cash-return': "年現金回報率 (%)",
        'reset-defaults': "重設為預設值",
        'reset-all-defaults': "重設所有為預設值",
        'future-value-calculation': "未來價值計算",
        'if-you-spend': "如果您今天花費",
        'today': "...",
        'in-the-year': "...在",
        'years-from-now': "年後），該金額可能會增長到約:",
        'opportunity-cost-label': "機會成本（以今天的購買力計算，扣除通脹後）",
        'nominal-value-label': "名義未來價值（不考慮通脹）",
        'understanding-results': "理解您的結果",
        'opportunity-cost-explanation-label': "機會成本:",
        'opportunity-cost-explanation': "您今天花費這筆錢而不是投資它可能放棄的價值，以今天的購買力顯示，已考慮通脹影響。",
        'nominal-value-explanation-label': "名義價值:",
        'nominal-value-explanation': "您的投資可能增長到的原始美元金額，不考慮通脹。",
        'investment-summary': "投資摘要",
        'weighted-average-return': "加權平均年回報率:",
        'time-horizon': "投資期限:",
        'inflation-assumption': "通脹假設:",
        'disclaimer': "此工具僅提供教育性估算。過往表現不保證未來結果。請諮詢財務顧問以獲得個人化建議。"
    }
};

// Language management
class LanguageManager {
    constructor() {
        this.currentLanguage = this.getDefaultLanguage();
        this.initLanguageSelector();
        this.applyTranslations();
    }

    getDefaultLanguage() {
        // Check if user has previously selected a language
        const storedLanguage = localStorage.getItem('language');
        if (storedLanguage) {
            return storedLanguage;
        }

        // Detect browser language
        const browserLanguage = navigator.language || navigator.languages?.[0] || 'en';
        
        // If browser language is any Chinese variant, default to Traditional Chinese
        if (browserLanguage.startsWith('zh')) {
            return 'zh-TW';
        }
        
        // Default to English for all other languages
        return 'en';
    }

    initLanguageSelector() {
        this.languageSelector = document.getElementById('languageSelector');
        this.languageSelector.value = this.currentLanguage;
        this.languageSelector.addEventListener('change', (e) => {
            this.setLanguage(e.target.value);
        });
    }

    setLanguage(lang) {
        this.currentLanguage = lang;
        localStorage.setItem('language', lang);
        this.applyTranslations();
        
        // Update page language attribute
        document.documentElement.lang = lang === 'zh-TW' ? 'zh-TW' : 'en-US';
    }

    applyTranslations() {
        const elements = document.querySelectorAll('[data-translate]');
        elements.forEach(element => {
            const key = element.getAttribute('data-translate');
            const translation = translations[this.currentLanguage][key];
            if (translation) {
                element.textContent = translation;
            }
        });
        
        // Update page title
        document.title = translations[this.currentLanguage]['page-title'];
    }
}

// Application state and DOM elements
class TomorrowsDollar {
    constructor() {
        this.initializeElements();
        this.loadUserPreferences();
        this.setDefaults();
        this.bindEvents();
        this.adjustAllocationFromStocks();
        this.calculate();
    }

    initializeElements() {
        // Input elements
        this.spendingAmount = document.getElementById('spendingAmount');
        this.stocksPercent = document.getElementById('stocksPercent');
        this.bondsPercent = document.getElementById('bondsPercent');
        this.cashPercent = document.getElementById('cashPercent');
        this.targetYear = document.getElementById('targetYear');
        this.inflationRate = document.getElementById('inflationRate');
        this.stockReturn = document.getElementById('stockReturn');
        this.bondReturn = document.getElementById('bondReturn');
        this.cashReturn = document.getElementById('cashReturn');

        // Slider elements
        this.stocksSlider = document.getElementById('stocksSlider');
        this.bondsSlider = document.getElementById('bondsSlider');
        this.cashSlider = document.getElementById('cashSlider');
        this.targetYearSlider = document.getElementById('targetYearSlider');

        // UI elements
        this.advancedToggle = document.getElementById('advancedToggle');
        this.advancedIcon = document.getElementById('advancedIcon');
        this.advancedSection = document.getElementById('advancedSection');
        this.resetAssumptions = document.getElementById('resetAssumptions');
        this.resetAll = document.getElementById('resetAll');
        this.allocationError = document.getElementById('allocationError');
        this.totalAllocation = document.getElementById('totalAllocation');

        // Display elements
        this.displayAmount = document.getElementById('displayAmount');
        this.displayYear = document.getElementById('displayYear');
        this.displayYears = document.getElementById('displayYears');
        this.nominalValue = document.getElementById('nominalValue');
        this.realValue = document.getElementById('realValue');
        this.weightedReturn = document.getElementById('weightedReturn');
        this.timeHorizon = document.getElementById('timeHorizon');
        this.inflationAssumption = document.getElementById('inflationAssumption');
    }

    loadUserPreferences() {
        // Load saved preferences from localStorage
        const savedPrefs = localStorage.getItem('tomorrowsDollarPrefs');
        if (savedPrefs) {
            try {
                this.userPreferences = JSON.parse(savedPrefs);
            } catch (e) {
                this.userPreferences = {};
            }
        } else {
            this.userPreferences = {};
        }
    }

    saveUserPreferences() {
        // Save current values to localStorage
        this.userPreferences = {
            spendingAmount: parseFloat(this.spendingAmount.value) || 100,
            stocksPercent: parseFloat(this.stocksPercent.value) || 75,
            bondsPercent: parseFloat(this.bondsPercent.value) || 15,
            cashPercent: parseFloat(this.cashPercent.value) || 10,
            inflationRate: parseFloat(this.inflationRate.value) || 3,
            stockReturn: parseFloat(this.stockReturn.value) || 7,
            bondReturn: parseFloat(this.bondReturn.value) || 4,
            cashReturn: parseFloat(this.cashReturn.value) || 1,
            targetYear: parseInt(this.targetYear.value) || new Date().getFullYear() + 20
        };
        
        localStorage.setItem('tomorrowsDollarPrefs', JSON.stringify(this.userPreferences));
    }

    applySavedPreferences() {
        // Apply saved preferences if they exist
        if (Object.keys(this.userPreferences).length > 0) {
            this.spendingAmount.value = this.userPreferences.spendingAmount || 100;
            this.stocksPercent.value = this.userPreferences.stocksPercent || 75;
            this.stocksSlider.value = this.userPreferences.stocksPercent || 75;
            this.bondsPercent.value = this.userPreferences.bondsPercent || 15;
            this.bondsSlider.value = this.userPreferences.bondsPercent || 15;
            this.cashPercent.value = this.userPreferences.cashPercent || 10;
            this.cashSlider.value = this.userPreferences.cashPercent || 10;
            this.inflationRate.value = this.userPreferences.inflationRate || 3;
            this.stockReturn.value = this.userPreferences.stockReturn || 7;
            this.bondReturn.value = this.userPreferences.bondReturn || 4;
            this.cashReturn.value = this.userPreferences.cashReturn || 1;
            
            // Handle target year with fallback to current year + 20
            const savedTargetYear = this.userPreferences.targetYear || new Date().getFullYear() + 20;
            this.targetYear.value = savedTargetYear;
            this.targetYearSlider.value = savedTargetYear;
        }
    }

    setDefaults() {
        // Set default target year to current year + 20
        const currentYear = new Date().getFullYear();
        
        // Apply saved preferences or use defaults
        this.applySavedPreferences();
        
        // Ensure target year is set if not in preferences
        if (!this.targetYear.value) {
            this.targetYear.value = currentYear + 20;
            this.targetYearSlider.value = currentYear + 20;
        }
        
        // Set minimum year to current year for both input and slider
        this.targetYear.min = currentYear;
        this.targetYearSlider.min = currentYear;
    }

    bindEvents() {
        // Input event listeners for real-time updates
        const inputs = [
            this.spendingAmount,
            this.inflationRate,
            this.stockReturn,
            this.bondReturn,
            this.cashReturn
        ];

        inputs.forEach(input => {
            input.addEventListener('input', () => {
                this.validateInputs();
                this.calculate();
                this.saveUserPreferences();
            });
        });

        // Target year slider and input synchronization
        this.targetYearSlider.addEventListener('input', () => {
            this.targetYear.value = this.targetYearSlider.value;
            this.validateInputs();
            this.calculate();
            this.saveUserPreferences();
        });

        this.targetYear.addEventListener('input', () => {
            const currentYear = new Date().getFullYear();
            const value = Math.max(currentYear, Math.min(2080, parseInt(this.targetYear.value) || currentYear + 20));
            this.targetYear.value = value;
            this.targetYearSlider.value = value;
            this.validateInputs();
            this.calculate();
            this.saveUserPreferences();
        });

        // Stocks slider and input synchronization
        this.stocksSlider.addEventListener('input', () => {
            this.stocksPercent.value = this.stocksSlider.value;
            this.adjustAllocationFromStocks();
            this.validateInputs();
            this.calculate();
            this.saveUserPreferences();
        });

        this.stocksPercent.addEventListener('input', () => {
            const value = Math.max(0, Math.min(100, parseFloat(this.stocksPercent.value) || 0));
            this.stocksPercent.value = value;
            this.stocksSlider.value = value;
            this.adjustAllocationFromStocks();
            this.validateInputs();
            this.calculate();
            this.saveUserPreferences();
        });

        // Bonds slider and input synchronization
        this.bondsSlider.addEventListener('input', () => {
            this.bondsPercent.value = this.bondsSlider.value;
            this.adjustAllocationFromBonds();
            this.validateInputs();
            this.calculate();
            this.saveUserPreferences();
        });

        this.bondsPercent.addEventListener('input', () => {
            const value = Math.max(0, Math.min(100, parseFloat(this.bondsPercent.value) || 0));
            this.bondsPercent.value = value;
            this.bondsSlider.value = value;
            this.adjustAllocationFromBonds();
            this.validateInputs();
            this.calculate();
            this.saveUserPreferences();
        });

        // Cash is read-only but we still sync the slider for visual representation
        this.cashPercent.addEventListener('change', () => {
            this.cashSlider.value = this.cashPercent.value;
        });

        // Advanced section toggle
        this.advancedToggle.addEventListener('click', () => {
            this.toggleAdvancedSection();
        });

        // Reset assumptions button
        this.resetAssumptions.addEventListener('click', () => {
            this.resetAssumptionsToDefaults();
        });

        // Reset all button
        this.resetAll.addEventListener('click', () => {
            this.reset();
        });
    }

    validateInputs() {
        // Ensure all inputs have valid numeric values
        const inputs = [
            this.spendingAmount,
            this.targetYear,
            this.inflationRate,
            this.stockReturn,
            this.bondReturn,
            this.cashReturn
        ];

        inputs.forEach(input => {
            const value = parseFloat(input.value);
            if (isNaN(value) || value < parseFloat(input.min) || value > parseFloat(input.max)) {
                input.classList.add('border-red-500');
            } else {
                input.classList.remove('border-red-500');
            }
        });

        this.adjustAllocationFromStocks();
    }

    adjustAllocationFromStocks() {
        const stocks = parseFloat(this.stocksPercent.value) || 0;
        const bonds = parseFloat(this.bondsPercent.value) || 0;
        
        // Respect the user's stocks input, adjust bonds if necessary
        if (stocks + bonds > 100) {
            // Reduce bonds to fit the available space
            const availableForBonds = 100 - stocks;
            this.bondsPercent.value = Math.max(0, Math.round(availableForBonds));
            this.bondsSlider.value = Math.max(0, Math.round(availableForBonds));
            this.cashPercent.value = 0;
            this.cashSlider.value = 0;
        } else {
            // Normal case: cash = 100 - stocks - bonds
            const cash = 100 - stocks - bonds;
            this.cashPercent.value = Math.max(0, Math.round(cash));
            this.cashSlider.value = Math.max(0, Math.round(cash));
        }
        
        this.validateAssetAllocation();
    }

    validateAssetAllocation() {
        const stocks = parseFloat(this.stocksPercent.value) || 0;
        const bonds = parseFloat(this.bondsPercent.value) || 0;
        const cash = parseFloat(this.cashPercent.value) || 0;
        const total = stocks + bonds + cash;

        this.totalAllocation.textContent = Math.round(total);

        if (Math.abs(total - 100) > 0.1) {
            this.allocationError.classList.remove('hidden');
            this.totalAllocation.parentElement.classList.add('text-red-600');
            this.totalAllocation.parentElement.classList.remove('text-gray-600');
        } else {
            this.allocationError.classList.add('hidden');
            this.totalAllocation.parentElement.classList.remove('text-red-600');
            this.totalAllocation.parentElement.classList.add('text-gray-600');
        }
    }

    toggleAdvancedSection() {
        const isHidden = this.advancedSection.classList.contains('hidden');
        
        if (isHidden) {
            this.advancedSection.classList.remove('hidden');
            this.advancedIcon.style.transform = 'rotate(180deg)';
        } else {
            this.advancedSection.classList.add('hidden');
            this.advancedIcon.style.transform = 'rotate(0deg)';
        }
    }

    resetAssumptionsToDefaults() {
        // Reset only the advanced assumptions to their default values
        this.inflationRate.value = 3;
        this.stockReturn.value = 7;
        this.bondReturn.value = 4;
        this.cashReturn.value = 1;
        
        // Recalculate with new values
        this.calculate();
        this.saveUserPreferences();
    }

    calculate() {
        try {
            // Get input values
            const spendingAmount = parseFloat(this.spendingAmount.value) || 0;
            const stocksPercent = parseFloat(this.stocksPercent.value) || 0;
            const bondsPercent = parseFloat(this.bondsPercent.value) || 0;
            const cashPercent = parseFloat(this.cashPercent.value) || 0;
            const targetYear = parseInt(this.targetYear.value) || new Date().getFullYear() + 20;
            const inflationRate = this.inflationRate.value === '' || isNaN(parseFloat(this.inflationRate.value)) ? 3 : parseFloat(this.inflationRate.value);
            const stockReturn = this.stockReturn.value === '' || isNaN(parseFloat(this.stockReturn.value)) ? 7 : parseFloat(this.stockReturn.value);
            const bondReturn = this.bondReturn.value === '' || isNaN(parseFloat(this.bondReturn.value)) ? 4 : parseFloat(this.bondReturn.value);
            const cashReturn = this.cashReturn.value === '' || isNaN(parseFloat(this.cashReturn.value)) ? 1 : parseFloat(this.cashReturn.value);

            // Calculate years
            const currentYear = new Date().getFullYear();
            const years = Math.max(0, targetYear - currentYear);

            // Calculate weighted average annual return
            const weightedReturnPercent = (
                (stocksPercent * stockReturn) +
                (bondsPercent * bondReturn) +
                (cashPercent * cashReturn)
            ) / 100;

            // Calculate future values
            const nominalFutureValue = spendingAmount * Math.pow(1 + weightedReturnPercent / 100, years);
            const realFutureValue = spendingAmount * Math.pow(
                (1 + weightedReturnPercent / 100) / (1 + inflationRate / 100),
                years
            );

            // Update display
            this.updateDisplay({
                spendingAmount,
                targetYear,
                years,
                nominalFutureValue,
                realFutureValue,
                weightedReturnPercent,
                inflationRate
            });

        } catch (error) {
            console.error('Calculation error:', error);
        }
    }

    updateDisplay({
        spendingAmount,
        targetYear,
        years,
        nominalFutureValue,
        realFutureValue,
        weightedReturnPercent,
        inflationRate
    }) {
        // Format currency
        const formatCurrency = (amount) => {
            return new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            }).format(amount);
        };

        // Format percentage
        const formatPercent = (percent) => {
            return `${percent.toFixed(2)}%`;
        };

        // Update main display values
        this.displayAmount.textContent = formatCurrency(spendingAmount);
        this.displayYear.textContent = targetYear.toString();
        this.displayYears.textContent = years.toString();
        this.nominalValue.textContent = formatCurrency(nominalFutureValue);
        this.realValue.textContent = formatCurrency(realFutureValue);

        // Update summary information
        this.weightedReturn.textContent = formatPercent(weightedReturnPercent);
        this.timeHorizon.textContent = `${years} years`;
        this.inflationAssumption.textContent = formatPercent(inflationRate);

        // Update colors based on values
        if (realFutureValue > spendingAmount) {
            this.realValue.className = 'text-2xl font-bold text-green-600';
        } else if (realFutureValue < spendingAmount) {
            this.realValue.className = 'text-2xl font-bold text-red-600';
        } else {
            this.realValue.className = 'text-2xl font-bold text-blue-600';
        }

        if (nominalFutureValue > spendingAmount) {
            this.nominalValue.className = 'text-2xl font-bold text-green-600';
        } else {
            this.nominalValue.className = 'text-2xl font-bold text-blue-600';
        }
    }

    // Utility method to format numbers with commas
    formatNumber(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    // Utility method to validate year input
    validateYear(year) {
        const currentYear = new Date().getFullYear();
        return year >= currentYear && year <= 2100;
    }

    // Method to reset to defaults
    reset() {
        // Clear saved preferences
        localStorage.removeItem('tomorrowsDollarPrefs');
        this.userPreferences = {};
        
        // Reset all values to defaults
        this.spendingAmount.value = 100;
        this.stocksPercent.value = 75;
        this.stocksSlider.value = 75;
        this.bondsPercent.value = 15;
        this.bondsSlider.value = 15;
        this.cashPercent.value = 10;
        this.cashSlider.value = 10;
        this.targetYear.value = new Date().getFullYear() + 20;
        this.targetYearSlider.value = new Date().getFullYear() + 20;
        this.inflationRate.value = 3;
        this.stockReturn.value = 7;
        this.bondReturn.value = 4;
        this.cashReturn.value = 1;
        
        this.validateAssetAllocation();
        this.calculate();
        this.saveUserPreferences();
    }

    adjustAllocationFromBonds() {
        const stocks = parseFloat(this.stocksPercent.value) || 0;
        const bonds = parseFloat(this.bondsPercent.value) || 0;
        
        // Respect the user's bonds input, adjust stocks if necessary
        if (stocks + bonds > 100) {
            // Reduce stocks to fit the available space
            const availableForStocks = 100 - bonds;
            this.stocksPercent.value = Math.max(0, Math.round(availableForStocks));
            this.stocksSlider.value = Math.max(0, Math.round(availableForStocks));
            this.cashPercent.value = 0;
            this.cashSlider.value = 0;
        } else {
            // Normal case: cash = 100 - stocks - bonds
            const cash = 100 - stocks - bonds;
            this.cashPercent.value = Math.max(0, Math.round(cash));
            this.cashSlider.value = Math.max(0, Math.round(cash));
        }
        
        this.validateAssetAllocation();
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.languageManager = new LanguageManager();
    window.tomorrowsDollar = new TomorrowsDollar();
});

// Add some helpful utility functions for potential future enhancements
window.TomorrowsDollarUtils = {
    // Calculate compound annual growth rate
    calculateCAGR(beginningValue, endingValue, years) {
        return Math.pow(endingValue / beginningValue, 1 / years) - 1;
    },

    // Calculate required savings to reach a goal
    calculateRequiredSavings(goalAmount, currentSavings, years, annualReturn) {
        const futureValueOfCurrentSavings = currentSavings * Math.pow(1 + annualReturn, years);
        const remainingAmount = goalAmount - futureValueOfCurrentSavings;
        
        if (remainingAmount <= 0) return 0;
        
        // PMT calculation for annuity
        const r = annualReturn;
        const n = years;
        const monthlyPayment = remainingAmount / (((Math.pow(1 + r, n) - 1) / r));
        
        return monthlyPayment / 12; // Convert to monthly
    },

    // Format large numbers with appropriate suffixes
    formatLargeNumber(num) {
        if (num >= 1000000000) {
            return (num / 1000000000).toFixed(1) + 'B';
        } else if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M';
        } else if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K';
        }
        return num.toFixed(2);
    }
}; 