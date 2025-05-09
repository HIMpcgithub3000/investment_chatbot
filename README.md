# Investment Chatbot 💼💬

This project demonstrates an **Investment Chatbot** that helps users make informed decisions about their investments. The chatbot recommends various investment options based on user inputs, guiding them through the process of selecting suitable options while explaining the associated risks and expected returns. The bot is designed to handle common queries and provide personalized investment advice.

## 🔍 Functionality

1. **User Interaction**:
   - The user initiates a conversation with the chatbot.
   - The bot asks questions about the user's investment goals, risk tolerance, and preferred investment duration.
   - Based on the user's responses, the chatbot suggests investment options suited to the user's profile.

2. **Investment Options**:
   - The chatbot recommends various investment categories such as **stocks**, **bonds**, **mutual funds**, **real estate**, and more.
   - For each recommended investment option, the chatbot provides a brief explanation of the investment, including its potential benefits, risks, and typical returns. 
   - The chatbot also offers advice on how to diversify the user's portfolio for better risk management.

3. **Risk Management**:
   - The chatbot calculates the risk associated with each recommended investment based on the user’s inputs.
   - It explains risk categories such as low, moderate, and high, helping users understand their potential exposure to market volatility.

4. **Investment Simulator**:
   - Users can simulate different investment scenarios by inputting hypothetical amounts they wish to invest. The chatbot will calculate potential outcomes based on predefined formulas.
   - Users can experiment with different risk profiles and investment types to observe how their money might grow or shrink over time.
   - **Note**: The investment simulator does not rely on real-time data or market trends. The results are simulated using static data and preset assumptions.

5. **No Real-Time Data**:
   - The chatbot does not fetch real-time market data or prices. The investment recommendations and simulated outcomes are based on general investment principles, and the simulated values do not reflect current market conditions.
   - While the bot provides useful insights based on common investment strategies, the data used for simulations is static and not reflective of real-time fluctuations.

6. **User Experience**:
   - The chatbot features a simple and intuitive interface that guides users through the investment decision process.
   - It engages users with conversational tones and offers explanations in layman’s terms, making it easy for both novice and experienced investors to understand.

## 🛠️ Technologies Used

- **Python**: For back-end logic and calculations.
- **Flask**: To build the web application and handle user requests.
- **HTML/CSS**: For creating the front-end interface.
- **JavaScript**: For interactive elements on the web page.
- **SQLite**: For storing user preferences and investment details (optional based on the implementation).
- **Bootstrap**: For responsive design and user-friendly interface.

## 📂 Features

- **Interactive Chat**: Conversational interface that guides users through the investment process.
- **Investment Recommendations**: Based on user preferences, risk tolerance, and goals.
- **Risk Management**: Explanation of risk categories and how to manage them.
- **Investment Simulator**: Simulate potential investment outcomes based on user input.
- **Static Data for Simulations**: Simulations do not depend on real-time market data, and results are based on preset assumptions.

## 🚀 Getting Started

1. **Clone the repository**:

    ```bash
    git clone https://github.com/HIMpcgithub3000/investment_chatbot.git
    cd investment_chatbot
    ```

2. **Install dependencies**:

    If you don’t have Flask installed, run:

    ```bash
    pip install -r requirements.txt
    ```

3. **Run the application**:

    ```bash
    python app.py
    ```

    This will start a local server, and you can access the chatbot by navigating to `http://127.0.0.1:5000/` in your browser.

## 📄 License

This project is licensed under the MIT License – see the [LICENSE](LICENSE) file for details.

---

Feel free to replace any placeholders with actual implementation details as needed!
