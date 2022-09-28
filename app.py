import os
import psycopg2
from flask import Flask, render_template
import user
from flask import jsonify
from psycopg2.extras import RealDictCursor



conn = psycopg2.connect(database="olympic_db", user= user.username,  
password = user.password, host="localhost")
print("connected")

mycursor = conn.cursor(cursor_factory=RealDictCursor)

app = Flask(__name__)



@app.route("/")
def data():
    mycursor.execute("SELECT * FROM olympic_data where Season = 'Winter'")
    results = mycursor.fetchall()
    # for x in mycursor:
    #     print(x)
    # data = [col for col in mycursor]
    # mycursor.close()
    # print(results)
    return jsonify(results)
    # return render_template('index.html', data=data)

    
    # return render_template('index.html')

# @app.route('/pageone')
# def PageOne():
#     mycursor.execute("SELECT * FROM olympic_data where Season = 'Winter'")
#     data = mycursor.fetchall()
    
#     return jsonify(data)

# @app.route('/pagetwo')
# def PageTwo():
#     mycursor.execute("SELECT * FROM olympic_data")
#     data = mycursor.fetchall()
#     return render_template('index.html', data=data)

# @app.route('/pagethree')
# def PageThree():
#     mycursor.execute("SELECT * FROM olympic_data")
#     data = mycursor.fetchall()
#     return render_template('index.html', data=data)


if __name__ == "__main__":
    app.run(debug=True)