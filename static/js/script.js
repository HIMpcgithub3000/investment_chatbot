const GROQ_API_KEY = '';
const GROQ_API_URL = '';

let userState = {
    investmentAmount: null,
    goal: null,
    riskLevel: null,
    timeHorizon: null
};

let conversationHistory = [];
let chatState = 'initial';
let growthChart = null;


document.addEventListener('DOMContentLoaded', () => {
    const initialMessage = "Hi! I'm your investment advisor. How much would you like to invest? (Please enter amount in ₹)";
    addMessage(initialMessage, 'bot');
    conversationHistory.push({
        role: 'assistant',
        content: initialMessage
    });
    initializeSimulator();
});


async function sendMessage() {
    const input = document.getElementById('user-input');
    const message = input.value.trim();
    if (!message) return;

    
    addMessage(message, 'user');
    input.value = '';
   
    const loadingIndicator = document.getElementById('loadingIndicator');
    const sendButton = document.getElementById('sendButton');
    loadingIndicator.style.display = 'block';
    sendButton.disabled = true;
    input.disabled = true;

    try {
        const response = await processUserInput(message);
        addMessage(response, 'bot');
        if (chatState === 'initial' && !isNaN(message)) {
            calculateGrowth(parseFloat(message));
        }
    } catch (error) {
        addMessage("Sorry, I encountered an error. Please try again.", 'bot');
    } finally {
        loadingIndicator.style.display = 'none';
        sendButton.disabled = false;
        input.disabled = false;
        input.focus();
    }
}

async function processUserInput(userInput) {
    try {
        conversationHistory.push({
            role: 'user',
            content: userInput
        });

        const response = await fetch(GROQ_API_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${GROQ_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: 'llama-3.3-70b-versatile',
                messages: [
                    {
                        role: 'system',
                        content: `You are an Indian investment advisor bot. Current state: ${chatState}.
                        If user provides amount: Ask about their investment goal (Retirement/House/Education/etc).
                        If user provides goal: Ask about risk tolerance (Low/Medium/High).
                        If user provides risk: Provide specific Indian investment recommendations based on:
                        - Low risk: FD, PPF, Blue-chip stocks (6-8% returns)
                        - Medium risk: Mutual funds, Mid-cap stocks (10-14% returns)
                        - High risk: Small-cap stocks, Sectoral funds (12-18% returns)
                        Include expected returns and investment horizon.`
                    },
                    ...conversationHistory
                ],
                temperature: 0.7,
                max_tokens: 1000
            })
        });

        if (!response.ok) {
            throw new Error(`API error: ${response.status}`);
        }

        const data = await response.json();
        const botResponse = data.choices[0].message.content;
        
        conversationHistory.push({
            role: 'assistant',
            content: botResponse
        });

        updateStateAndUI(userInput, botResponse);
        return botResponse;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}


function initializeSimulator() {
    if (document.getElementById('growthChart')) {
        calculateGrowth(0);
    }
}

function calculateGrowth(amount = 0, growth = 12, years = 5) {
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

    updateResults(amount, finalAmount, profit);
    updateGraph(yearlyData);
}

function updateResults(initial, final, profit) {
    if (document.getElementById('initial')) {
        document.getElementById('initial').textContent = `₹${initial.toLocaleString('en-IN')}`;
        document.getElementById('final').textContent = `₹${final.toLocaleString('en-IN', {maximumFractionDigits: 0})}`;
        document.getElementById('profit').textContent = `₹${profit.toLocaleString('en-IN', {maximumFractionDigits: 0})}`;
    }
}

function updateGraph(data) {
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

// Helper Functions
function addMessage(message, sender) {
    const chatMessages = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', `${sender}-message`);
    messageDiv.textContent = message;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function updateStateAndUI(userInput, botResponse) {
    if (chatState === 'initial' && !isNaN(userInput)) {
        userState.investmentAmount = parseFloat(userInput);
        document.getElementById('totalInvestment').textContent = `₹${userInput}`;
        chatState = 'goal';
    } else if (chatState === 'goal') {
        userState.goal = userInput;
        document.getElementById('investmentGoal').textContent = userInput;
        chatState = 'risk';
    } else if (chatState === 'risk') {
        userState.riskLevel = userInput.toLowerCase();
        document.getElementById('riskLevel').textContent = userInput;
        document.getElementById('riskProfile').textContent = userInput;
        document.getElementById('expectedReturns').textContent = getRiskBasedReturns(userState.riskLevel);
        document.getElementById('timeHorizon').textContent = getGoalBasedHorizon(userState.goal);
        chatState = 'complete';
    }
}

function getRiskBasedReturns(risk) {
    switch(risk.toLowerCase()) {
        case 'low': return '6-8% p.a.';
        case 'medium': return '10-14% p.a.';
        case 'high': return '12-18% p.a.';
        default: return '--';
    }
}

function getGoalBasedHorizon(goal) {
    switch(goal.toLowerCase()) {
        case 'retirement': return '20+ years';
        case 'house': return '5-7 years';
        case 'education': return '10-15 years';
        default: return '3-5 years';
    }
}
