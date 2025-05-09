from flask import Flask, render_template, jsonify, request
from werkzeug.middleware.proxy_fix import ProxyFix  # Updated import

app = Flask(__name__)
app.wsgi_app = ProxyFix(app.wsgi_app)

@app.route('/')
def index():
    return render_template('investment_ad.html')

@app.route('/chat', methods=['POST'])
def chat():
    try:
        data = request.json
        message = data.get('message', '')
        state = data.get('state', {})
        
        # Process the message
        response = {
            'response': f"Received investment amount: {message}",
            'investment': {
                'amount': message.replace('₹', '').replace(',', ''),
                'returns': '10-12%',
                'horizon': '5 years'
            }
        }
        return jsonify(response), 200
    except Exception as e:
        return jsonify({
            'error': str(e),
            'response': "Sorry, I encountered an error. Please try again."
        }), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)