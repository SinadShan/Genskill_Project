
from flask import current_app
import sqlite3

def initdb():
    con = sqlite3.connect('app_db.db')
    cursor = con.cursor()

    f = open('./sql/initdb.sql')
    queries = f.readlines()
    
    for query in queries:
        cursor.execute(query)
    cursor.close()
    con.commit()