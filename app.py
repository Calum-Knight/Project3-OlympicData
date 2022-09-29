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


@app.route('/')

def data():
    # mycursor.execute("SELECT Year, count(year) FROM olympic_data where Season = 'Winter' and Sex = 'M' group by year order by year")
    # results_male = mycursor.fetchall()
    # mycursor.execute("SELECT Year, count(year) FROM olympic_data where Season = 'Winter' and Sex = 'F' group by year order by year")
    # results_female = mycursor.fetchall()
    # data = {
    #     "male": results_male,
    #     "female": results_female
    # }
    # return jsonify(data)
    return render_template('index.html')




@app.route('/pageone')

def pageone():
    mycursor.execute("SELECT Year, count(year) FROM olympic_data where Season = 'Winter' and Sex = 'M' group by year order by year")
    results_male = mycursor.fetchall()
    mycursor.execute("SELECT Year, count(year) FROM olympic_data where Season = 'Winter' and Sex = 'F' group by year order by year")
    results_female = mycursor.fetchall()
    data = {
        "male": results_male,
        "female": results_female
    }
    return jsonify(data)
    # return render_template('HTML1.html')

@app.route('/pagetwo')
def PageTwo():
    mycursor.execute("SELECT noc, Medal, count(Medal), event FROM olympic_data where Season = 'Winter' and year = 2014 and Medal = 'Gold' group by Event, Medal, noc order by medal, count(Medal) desc")
    gold_data = mycursor.fetchall()

    # gold = {}

    # for x in gold_data:
    #     gold[x["noc"]= : x["medal"]]

    mycursor.execute("SELECT noc, Medal, count(Medal), event FROM olympic_data where Season = 'Winter' and year = 2014 and Medal = 'Silver' group  by Event, Medal, noc order by medal, count(Medal) desc")
    silver_data = mycursor.fetchall()
    mycursor.execute("SELECT noc, Medal, count(Medal), event FROM olympic_data where Season = 'Winter' and year = 2014 and Medal = 'Bronze' group by Event, Medal, noc order by medal, count(Medal) desc")
    bronze_data = mycursor.fetchall()

    data = {
        "Gold": gold_data,
        "Silver": len(silver_data),
        "Bronze": len(bronze_data)
    }

    return jsonify(data)
    # return render_template('index.html')

@app.route('/pagethree')
def PageThree():
    mycursor.execute("SELECT noc, city, year, medal, count(medal) FROM olympic_data WHERE Season = 'Winter' group by medal, noc, city, year order by year")
    data = mycursor.fetchall()

    return jsonify(data)
    # return render_template('index.html')


if __name__ == "__main__":
    app.run(debug=True)