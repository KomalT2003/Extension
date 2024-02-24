# server.py => summarisation template for extension 
from flask import Flask, request, jsonify
from transformers import pipeline
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})
summarization_pipeline = pipeline("summarization")

@app.route('/summarize', methods=["GET", "POST"])
def summarize():
    data = request.get_json()
    webpage_content = data.get('webpage_content')
    summarization_output = summarization_pipeline(webpage_content, max_length=100, min_length=30, do_sample=False)
    print(summarization_output)  # Print the output for debugging
    summary = summarization_output[0]['summary_text']
    return jsonify({'summary': summary})


@app.route('/', methods=['GET'])
def hello():
    return "Hello, World!"

if __name__ == '__main__':
    app.run(debug=True, port=3000)
