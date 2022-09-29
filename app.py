import os
import psycopg2
from flask import Flask, render_template
import user
from flask import jsonify
from psycopg2.extras import RealDictCursor
import pandas as pd



conn = psycopg2.connect(database="olympic_db", user= user.username,  
password = user.password, host="localhost")
print("connected")

mycursor = conn.cursor(cursor_factory=RealDictCursor)

app = Flask(__name__)


@app.route('/')

def home():

    return render_template('index.html')

#Render templates

@app.route('/gender')

def gender():

    return render_template('HTML1.html')



@app.route('/year')

def year():

    return render_template('HTML2.html')



@app.route('/map')

def map():

    return render_template('HTML3.html')

#End to Render Templates


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

    # year=2014

    mycursor.execute("SELECT noc, medal, count(Medal), event, year, season FROM olympic_data where Season = 'Winter' and Medal = 'Gold' group by year, noc, event, season, medal order by medal, count(Medal) desc")
    gold_data = mycursor.fetchall()
    gold_data_df = pd.DataFrame(gold_data)
    # gold_data_df = pd.pivot_table(gold_data_df,"count",["year","noc", "event", "season"],"medal").fillna(0)
    print(gold_data_df)

    # gold_data_df['Bronze'].values[gold_data_df['Bronze'] > 1] = 1
    # gold_data_df['Silver'].values[gold_data_df['Silver'] > 1] = 1
    gold_data_df['count'] = gold_data_df['count'].astype(int)
    gold_data_df['count'].values[gold_data_df['count'] > 1] = 1
    gold_data_df = gold_data_df.groupby('noc').sum()['count']
    print(gold_data_df.head(20))
    # mycursor.execute("SELECT noc, Medal, count(Medal), event FROM olympic_data where Season = 'Winter' and year = 2014 and Medal = 'Silver' group by Event, Medal, noc order by medal, count(Medal) desc")
    # silver_data = mycursor.fetchall()
    # mycursor.execute("SELECT noc, Medal, count(Medal), event FROM olympic_data where Season = 'Winter' and year = 2014 and Medal = 'Bronze' group by Event, Medal, noc order by medal, count(Medal) desc")
    # bronze_data = mycursor.fetchall()

    data = {
        "country": gold_data_df['noc'].to_list(),
        "Gold": gold_data_df['count'].to_list(),
        # "Silver": len(silver_data),
        # "Bronze": len(bronze_data)
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