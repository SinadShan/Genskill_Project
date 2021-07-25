
from flask import Flask, request, jsonify
import json
import sqlite3

from flask_cors.extension import CORS
import db

app = Flask(__name__)
CORS(app)
db.initdb()

@app.route('/login',methods=['GET','POST'])
def login():

    if request.method == 'POST':
        con = sqlite3.connect('app_db.db')
        cursor = con.cursor()
        username = json.loads(request.get_data().decode())['username']
        password = json.loads(request.get_data().decode())['password']
        cursor.execute('select username from users where username=? and password=?',(username,password))
        result = cursor.fetchone()
        print(result)
        cursor.close()
        con.close()
        if(result):
            return jsonify({'message': 'Successfully Logged in'})
        else:
            return jsonify({'message': 'Failed to Log in'})

@app.route('/signup', methods=['POST'])
def signup():

    if request.method == 'POST':
        con = sqlite3.connect('app_db.db')
        cursor = con.cursor()
        username = json.loads(request.get_data().decode())['username']
        password = json.loads(request.get_data().decode())['password']
        try:
            cursor.execute('insert into users (username,password) values (?,?);',[username,password])
            con.commit()

        except sqlite3.Error as error:
            print(error)

        cursor.close()
        con.close()
        return jsonify({'message':'Successfully Signed up!'})


if __name__=="__main__":
    app.run(debug = True)