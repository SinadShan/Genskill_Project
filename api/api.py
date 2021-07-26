
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
        # print(type(result)) 

        if(result and result[0]== username):
            cursor.execute('select reminder,date from reminders where uid=(select id from users where username=?);',(username,))
            remindersList = cursor.fetchall()
            print(remindersList)
            cursor.close()
            con.close()
            return jsonify({
                'message': 'success',
                'reminders': remindersList    
            })
        else:
            cursor.close()
            con.close()
            return jsonify(None)
        

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
            cursor.close()
            con.close()
            return jsonify({
            'message':'success',
            'reminders': None        
        })

        except sqlite3.Error as error:
            print(error)
            cursor.close()
            con.close()
            return jsonify(None)

        


if __name__=="__main__":
    app.run(debug = True)