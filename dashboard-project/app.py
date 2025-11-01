from flask import Flask, render_template, jsonify
import plotly.express as px
import pandas as pd

app = Flask(__name__)

# হোম পেজ রেন্ডার করুন
@app.route('/')
def index():
    return render_template('index.html')

# ডাটা এবং গ্রাফ রেন্ডার করুন
@app.route('/data')
def data():
    # স্যাম্পল ডাটা
    df = pd.DataFrame({
        'Month': ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
        'CPU Usage': [65, 59, 80, 81, 56]
    })
    # Plotly গ্রাফ তৈরি করুন
    fig = px.line(df, x='Month', y='CPU Usage', title='CPU Usage Over Time')
    graph = fig.to_html(full_html=False)  # গ্রাফ HTML ফরম্যাটে রূপান্তরিত হচ্ছে
    return jsonify({'graph': graph})  # গ্রাফ JSON ফরম্যাটে ফেরত দেওয়া হচ্ছে

if __name__ == '__main__':
    app.run(debug=True)  # অ্যাপ চালু করা হচ্ছে
