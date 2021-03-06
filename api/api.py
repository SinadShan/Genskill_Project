
from flask import Flask, request, jsonify
import json
import sqlite3
from datetime import datetime
import bcrypt

from flask_cors.extension import CORS
import db

app = Flask(__name__)
CORS(app)
db.initdb()

def getRems(user):
    con = sqlite3.connect('app_db.db')
    cursor = con.cursor()
    cursor.execute('select reminder,date from reminders where uid=(select id from users where username=?) order by date;',(user,))
    remindersList = cursor.fetchall() 
    for i in range(len(remindersList)):
        y = None
        if(remindersList[i][1]!=''):
            y = datetime.strptime(remindersList[i][1],"%Y-%m-%d")
            remindersList[i]=list(remindersList[i])
            remindersList[i][1] = y.strftime("%d/%m/%Y")
            remindersList[i]=tuple(remindersList[i])
    cursor.close()
    con.close()
    return jsonify({
        'message':'success',
        'reminders': remindersList        
    })

@app.route('/login',methods=['GET','POST'])
def login():

    if request.method == 'POST':
        con = sqlite3.connect('app_db.db')
        cursor = con.cursor()
        username = json.loads(request.get_data().decode())['username']
        password = json.loads(request.get_data().decode())['password']

        cursor.execute('select username,password from users where username=?',(username,))
        result = cursor.fetchone()

        # print(type(result)) 
        cursor.close()
        con.close()

        if(bcrypt.checkpw(password, result[1])):
            return getRems(username)
        else:
            return jsonify(None)
        

@app.route('/signup', methods=['POST'])
def signup():

    if request.method == 'POST':
        con = sqlite3.connect('app_db.db')
        cursor = con.cursor()
        username = json.loads(request.get_data().decode())['username']
        password = json.loads(request.get_data().decode())['password']

        hashedPass = bcrypt.hashpw(password,bcrypt.gensalt())
        try:
            cursor.execute('insert into users (username,password) values (?,?);',[username,hashedPass])
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

@app.route('/addrem',methods=["POST"])
def addRem():
    if request.method== 'POST':
        con = sqlite3.connect('app_db.db')
        cursor = con.cursor()
        data = json.loads(request.get_data().decode())
        date = data['date']
        reminder = data['reminder']
        user = data['username']
        # print(data) 
        try:
            cursor.execute('insert into reminders (uid,reminder,date) values ((select id from users where username=?),?,?);',[user,reminder,date])
            con.commit()
            cursor.close()
            con.close()
            return getRems(user)  

        except sqlite3.Error as error:
            print(error) 
            cursor.close()
            con.close()
            return jsonify(None)
        
@app.route('/deleteRem',methods=['POST'])
def deleteReminder():
    if request.method== 'POST':
        con = sqlite3.connect('app_db.db')
        cursor = con.cursor()
        data = json.loads(request.get_data().decode())
        date = data['date']

        # change date format
        if(date!=''):
            modifDate = datetime.strptime(date,"%d/%m/%Y")
            date = modifDate.strftime("%Y-%m-%d")

        reminder = data['reminder']
        user = data['username']

        try:
            cursor.execute('delete from reminders where uid=(select id from users where username=?) and reminder=? and date=?;',[user,reminder,date])
            con.commit()
            cursor.close()
            con.close()

            return getRems(user)

        except sqlite3.Error as error:
            print(error)
            return jsonify(None)

if __name__=="__main__":
    app.run(debug = True)