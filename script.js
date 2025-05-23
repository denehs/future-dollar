// Application state and DOM elements
class TomorrowsDollar {
    constructor() {
        this.initializeElements();
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

    setDefaults() {
        // Set default target year to current year + 20
        const currentYear = new Date().getFullYear();
        this.targetYear.value = currentYear + 20;
        this.targetYearSlider.value = currentYear + 20;
        
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
            });
        });

        // Target year slider and input synchronization
        this.targetYearSlider.addEventListener('input', () => {
            this.targetYear.value = this.targetYearSlider.value;
            this.validateInputs();
            this.calculate();
        });

        this.targetYear.addEventListener('input', () => {
            const currentYear = new Date().getFullYear();
            const value = Math.max(currentYear, Math.min(2080, parseInt(this.targetYear.value) || currentYear + 20));
            this.targetYear.value = value;
            this.targetYearSlider.value = value;
            this.validateInputs();
            this.calculate();
        });

        // Stocks slider and input synchronization
        this.stocksSlider.addEventListener('input', () => {
            this.stocksPercent.value = this.stocksSlider.value;
            this.adjustAllocationFromStocks();
            this.validateInputs();
            this.calculate();
        });

        this.stocksPercent.addEventListener('input', () => {
            const value = Math.max(0, Math.min(100, parseFloat(this.stocksPercent.value) || 0));
            this.stocksPercent.value = value;
            this.stocksSlider.value = value;
            this.adjustAllocationFromStocks();
            this.validateInputs();
            this.calculate();
        });

        // Bonds slider and input synchronization
        this.bondsSlider.addEventListener('input', () => {
            this.bondsPercent.value = this.bondsSlider.value;
            this.adjustAllocationFromBonds();
            this.validateInputs();
            this.calculate();
        });

        this.bondsPercent.addEventListener('input', () => {
            const value = Math.max(0, Math.min(100, parseFloat(this.bondsPercent.value) || 0));
            this.bondsPercent.value = value;
            this.bondsSlider.value = value;
            this.adjustAllocationFromBonds();
            this.validateInputs();
            this.calculate();
        });

        // Cash is read-only but we still sync the slider for visual representation
        this.cashPercent.addEventListener('change', () => {
            this.cashSlider.value = this.cashPercent.value;
        });

        // Advanced section toggle
        this.advancedToggle.addEventListener('click', () => {
            this.toggleAdvancedSection();
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
            this.bondsPercent.value = Math.max(0, availableForBonds).toFixed(1);
            this.bondsSlider.value = Math.max(0, Math.round(availableForBonds));
            this.cashPercent.value = 0;
            this.cashSlider.value = 0;
        } else {
            // Normal case: cash = 100 - stocks - bonds
            const cash = 100 - stocks - bonds;
            this.cashPercent.value = Math.max(0, cash).toFixed(1);
            this.cashSlider.value = Math.max(0, Math.round(cash));
        }
        
        this.validateAssetAllocation();
    }

    validateAssetAllocation() {
        const stocks = parseFloat(this.stocksPercent.value) || 0;
        const bonds = parseFloat(this.bondsPercent.value) || 0;
        const cash = parseFloat(this.cashPercent.value) || 0;
        const total = stocks + bonds + cash;

        this.totalAllocation.textContent = total.toFixed(1);

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
    }

    adjustAllocationFromBonds() {
        const stocks = parseFloat(this.stocksPercent.value) || 0;
        const bonds = parseFloat(this.bondsPercent.value) || 0;
        
        // Respect the user's bonds input, adjust stocks if necessary
        if (stocks + bonds > 100) {
            // Reduce stocks to fit the available space
            const availableForStocks = 100 - bonds;
            this.stocksPercent.value = Math.max(0, availableForStocks).toFixed(1);
            this.stocksSlider.value = Math.max(0, Math.round(availableForStocks));
            this.cashPercent.value = 0;
            this.cashSlider.value = 0;
        } else {
            // Normal case: cash = 100 - stocks - bonds
            const cash = 100 - stocks - bonds;
            this.cashPercent.value = Math.max(0, cash).toFixed(1);
            this.cashSlider.value = Math.max(0, Math.round(cash));
        }
        
        this.validateAssetAllocation();
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
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