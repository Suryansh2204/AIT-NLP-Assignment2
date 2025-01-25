from flask import Flask,request,jsonify
from flask_cors import CORS
import pickle
import numpy as np

app=Flask(__name__)

# Enable CORS
CORS(app,resources={r"/predict": {"origins": "http://localhost:3000"}})
with open('./model/glove_gensim_model.pkl', 'rb') as model_file:
    model = pickle.load(model_file)
    

@app.route('/predict', methods=['GET'])
def predict():
    try:
        query =  request.args.get('query') 
        # Perform the prediction using the loaded model
        prediction = model.most_similar(query)
        predictions = [word for (word, similarity) in prediction]
        return jsonify({'predictions': predictions})
    except Exception as e:
        return jsonify({'error': str(e)})

@app.route('/', methods=['GET'])
def call():
    return jsonify({'Name':"Suryansh Srivastava", 'ID':124997})
if __name__ == '__main__':
    app.run(debug=True,host='0.0.0.0', port=5000)