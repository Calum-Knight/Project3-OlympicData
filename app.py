import os
import psycopg2
from flask import Flask, render_template, redirect
import user
from flask import jsonify
from psycopg2.extras import RealDictCursor
import pandas as pd



conn = psycopg2.connect(database="olympic_db", user= user.username,  
password = user.password, host="localhost")
print("connected")

mycursor = conn.cursor(cursor_factory=RealDictCursor)

app = Flask(__name__)

#Render templates

@app.route('/')
def home():
    return render_template('index.html')

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
    # return jsonify(data)
    return render_template('HTML1.html')



@app.route('/api/years/<year>')
def years(year):
    # Retrieve data for Gold Medals
    mycursor.execute("SELECT noc, medal, count(Medal), event, year, season FROM olympic_data where Season = 'Winter' and Medal = 'Gold' group by year, noc, event, season, medal order by medal, count(Medal) desc")
    gold_data = mycursor.fetchall()
    gold_data_df = pd.DataFrame(gold_data)
    gold_data_df = gold_data_df.loc[lambda gold_data_df: gold_data_df['year'] == int(year)]
    gold_data_df['count'] = gold_data_df['count'].astype(int)
    gold_data_df['count'].values[gold_data_df['count'] > 1] = 1
    gold_data_df = gold_data_df.groupby('noc').sum()['count']
    gold_data_df = gold_data_df.reset_index()
    # End of - Retrieve data for Gold Medals
    

    # Retrieve data for Silver Medals
    mycursor.execute("SELECT noc, medal, count(Medal), event, year, season FROM olympic_data where Season = 'Winter' and Medal = 'Silver' group by year, noc, event, season, medal order by medal, count(Medal) desc")
    silver_data = mycursor.fetchall()
    silver_data_df = pd.DataFrame(silver_data)
    silver_data_df = silver_data_df.loc[lambda silver_data_df: silver_data_df['year'] == int(year)]
    silver_data_df['count'] = silver_data_df['count'].astype(int)
    silver_data_df['count'].values[silver_data_df['count'] > 1] = 1
    silver_data_df = silver_data_df.groupby('noc').sum()['count']
    silver_data_df = silver_data_df.reset_index()
    # End of - Retrieve data for Silver Medals


    # Retrieve data for Bronze Medals
    mycursor.execute("SELECT noc, medal, count(Medal), event, year, season FROM olympic_data where Season = 'Winter' and Medal = 'Bronze' group by year, noc, event, season, medal order by medal, count(Medal) desc")
    bronze_data = mycursor.fetchall()
    bronze_data_df = pd.DataFrame(bronze_data)
    bronze_data_df = bronze_data_df.loc[lambda bronze_data_df: bronze_data_df['year'] == int(year)]
    bronze_data_df['count'] = bronze_data_df['count'].astype(int)
    bronze_data_df['count'].values[bronze_data_df['count'] > 1] = 1
    bronze_data_df = bronze_data_df.groupby('noc').sum()['count']
    bronze_data_df = bronze_data_df.reset_index()
    # End of - Retrieve data for Bronze Medals


    # Retrieve List of All Countries (NOC)
    mycursor.execute("SELECT DISTINCT noc FROM olympic_data order by noc")
    nocs = mycursor.fetchall()
    
    
    # Get data into a usable format
    data = [
        {"country": [gold_data_df['noc'].to_list()], "Gold:": [gold_data_df['count'].to_list()]},
        {"country": [silver_data_df['noc'].to_list()], "Silver:": [silver_data_df['count'].to_list()]},
        {"country": [bronze_data_df['noc'].to_list()], "Bronze:": [bronze_data_df['count'].to_list()]},
    ]

    gold_list_count = gold_data_df['noc'].to_list()
    gold_list = gold_data_df['count'].to_list()
    

    silver_list_count = silver_data_df['noc'].to_list()
    silver_list = silver_data_df['count'].to_list()
    

    bronze_list_count = bronze_data_df['noc'].to_list()
    bronze_list = bronze_data_df['count'].to_list()
    

    gold_medals_df = pd.DataFrame({'Country': gold_list_count,'Gold_Medals': gold_list})
    
    silver_medals_df = pd.DataFrame({'Country': silver_list_count,'Silver_Medals': silver_list})
    
    bronze_medals_df = pd.DataFrame({'Country': bronze_list_count,'Bronze_Medals': bronze_list})
    

    merge1_df = gold_medals_df.merge(silver_medals_df, how = 'outer', on = "Country")
    merge2_df = merge1_df.merge(bronze_medals_df, how = 'outer', on = "Country")
    merge2_df = merge2_df.fillna(0)
    noc = merge2_df["Country"].to_list()
    gold_ = merge2_df["Gold_Medals"].to_list()
    silver_ = merge2_df["Silver_Medals"].to_list()
    bronze_ = merge2_df["Bronze_Medals"].to_list()
    
   
    
    return jsonify(data, nocs,noc, gold_, silver_, bronze_)




@app.route('/pagethree')
def PageThree():
    mycursor.execute("SELECT noc, city, year, medal, count(medal) FROM olympic_data WHERE Season = 'Winter' group by medal, noc, city, year order by year")
    data = mycursor.fetchall()

    return jsonify(data)
    


if __name__ == "__main__":
    app.run(debug=True)