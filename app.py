from flask import Flask, render_template, jsonify
import plotly.express as px
import pandas as pd

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/data')
def data():
    # Sample Data
    df = pd.DataFrame({
        'Month': ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
        'CPU Usage': [65, 59, 80, 81, 56]
    })
    # Plotting the data
    fig = px.line(df, x='Month', y='CPU Usage', title='CPU Usage Over Time')
    graph = fig.to_html(full_html=False)
    return jsonify({'graph': graph})

if __name__ == '__main__':
    app.run(debug=True)
