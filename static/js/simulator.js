
let growthChart = null;

class InvestmentSimulator {
    constructor() {
        this.initializeSimulator();
    }

    initializeSimulator() {
       
        if (document.getElementById('amount')) {
            this.calculateGrowth();
        }
    }

    calculateGrowth() {
        const amount = parseFloat(document.getElementById('amount').value);
        const growth = parseFloat(document.getElementById('growth').value);
        const years = parseInt(document.getElementById('years').value);

        const yearlyData = [];
        let currentAmount = amount;

        for (let i = 0; i <= years; i++) {
            yearlyData.push({
                year: i,
                amount: currentAmount
            });
            currentAmount *= (1 + growth/100);
        }

        const finalAmount = yearlyData[years].amount;
        const profit = finalAmount - amount;

        this.updateResults(amount, finalAmount, profit);
        this.updateGraph(yearlyData);
    }

    updateResults(initial, final, profit) {
        document.getElementById('initial').textContent = `₹${initial.toLocaleString('en-IN')}`;
        document.getElementById('final').textContent = `₹${final.toLocaleString('en-IN', {maximumFractionDigits: 0})}`;
        document.getElementById('profit').textContent = `₹${profit.toLocaleString('en-IN', {maximumFractionDigits: 0})}`;
    }

    updateGraph(data) {
        const ctx = document.getElementById('growthChart')?.getContext('2d');
        if (!ctx) return;
        
        if (growthChart) {
            growthChart.destroy();
        }

        growthChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: data.map(d => `Year ${d.year}`),
                datasets: [{
                    label: 'Investment Value',
                    data: data.map(d => d.amount),
                    borderColor: '#007bff',
                    backgroundColor: 'rgba(0, 123, 255, 0.1)',
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: 'Investment Growth Over Time'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return '₹' + value.toLocaleString('en-IN');
                            }
                        }
                    }
                }
            }
        });
    }
}

// Initialize the simulator when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const simulator = new InvestmentSimulator();
    // Add event listeners for input changes
    ['amount', 'growth', 'years'].forEach(id => {
        document.getElementById(id)?.addEventListener('change', () => simulator.calculateGrowth());
    });
});