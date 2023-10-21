from flask import Flask, render_template, request, jsonify
from random import choice  # Import choice function to randomly select a label

app = Flask(__name__)

# Define a list of predefined class labels
class_labels = ['Mild', 'Moderate', 'Severe']

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    if request.method == 'POST':
        try:
            # Randomly select a label from the predefined list
            prediction_label = choice(class_labels)

            return jsonify({'result': prediction_label})

        except Exception as e:
            return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True)
