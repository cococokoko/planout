import json
import sqlalchemy
import os
import pandas as pd
import collections

db_user = os.environ.get('CLOUD_SQL_USERNAME')
db_password = os.environ.get('CLOUD_SQL_PASSWORD')
db_name = os.environ.get('CLOUD_SQL_DATABASE_NAME')
db_connection_name = os.environ.get('CLOUD_SQL_CONNECTION_NAME')
host = os.environ.get('CLOUD_SQL_HOST')

if os.environ.get('GAE_ENV') == 'standard':
    unix_socket = '/cloudsql/{}'.format(db_connection_name)
    engine_url = 'mysql+pymysql://{}:{}@/{}?unix_socket={}'.format(
        db_user, db_password, db_name, unix_socket)
else:
    # If running locally, we use TCP connections
    engine_url = 'mysql+pymysql://{}:{}@{}/{}'.format(
        db_user, db_password, host, db_name)

engine = sqlalchemy.create_engine(engine_url, pool_size=3)


def places():
    df = pd.read_excel ("./Data.xlsx", sheet_name = ['Sheet1','Sheet2'], header = [0], parse_dates = True) 
    places = df.get('Sheet1')
    times = df.get('Sheet2')
    times['date'] = pd.to_datetime(times.date, format='YYYY-MM-DD').dt.date
 
    with engine.connect() as connection: 
        #connection.execute("DROP TABLE place")
        #connection.execute("DROP TABLE availabilites")
        #connection.execute("DROP TABLE validation")
        connection.execute("CREATE TABLE place (id INT, name VARCHAR(200), activity VARCHAR(20), kitchen VARCHAR(50), address VARCHAR(200), latitude FLOAT, longitude FLOAT, area VARCHAR(50), price VARCHAR(10), capacity INT, bundle VARCHAR(50), image VARCHAR(300), days VARCHAR(50), hours VARCHAR(200), menu_1 VARCHAR(1000), price_menu_1 INT, menu_2 VARCHAR(100), price_menu_2 INT, details VARCHAR(1000), rating INT, reviews INT, PRIMARY KEY(id))")
        connection.execute("CREATE TABLE availabilites (id INT, place_id INT, availability VARCHAR(20), date VARCHAR(20), booking_id INT, PRIMARY KEY(id))")
        connection.execute("CREATE TABLE validation (id INT NOT NULL AUTO_INCREMENT, activity  VARCHAR(50), date VARCHAR(20), budget INT, guests INT, PRIMARY KEY(id))")

        places.to_sql("place",connection,if_exists="append",index=False)
        times.to_sql("availabilites",connection,if_exists="append",index=False)
        

def search(activity, date, guests, budget):
    with engine.connect() as connection:
        query= f"SELECT id, name, kitchen, address, latitude, longitude, area, price, image, days, hours, menu_1, price_menu_1, menu_2, price_menu_2, details, rating, reviews, capacity FROM place INNER JOIN availabilites ON place.id=availabilites.place_id WHERE (place.activity='{activity}' AND place.capacity >= '{guests}' AND place.price_menu_1 <= '{budget}' AND availabilites.date = '{date}' AND availabilites.bookind_id IS NULL)"
        search = connection.execute(query).fetchall()
        objects_list = []
        for row in search:
            d = collections.OrderedDict()
            d['id'] = row[0]
            d['name'] = row[1]
            d['kitchen'] = row[2]
            d['address'] = row[3]
            d['latitude'] = row[4]
            d['longitude'] = row[5]
            d['area'] = row[6]
            d['price'] = row[7]
            d['image'] = row[8]
            d['days'] = row[9]
            d['hours'] = row[10]
            d['menu_1'] = row[11]
            d['price_menu_1'] = row[12]
            d['menu_2'] = row[13]
            d['price_menu_2'] = row[14]
            d['details'] = row[15]
            d['rating'] = row[16]
            d['reviews'] = row[17]
            d['capacity'] = row[18]
            objects_list.append(d)

        j = json.dumps(objects_list,default=str)
        return j

def testsearch():
    with engine.connect() as connection:
        query= f"SELECT id, name, kitchen, address, latitude, longitude, area, price, image, days, hours, menu_1, price_menu_1, menu_2, price_menu_2, details, rating, reviews FROM place"
        search = connection.execute(query).fetchall()
        objects_list = []
        for row in search:
            d = collections.OrderedDict()
            d['id'] = row[0]
            d['name'] = row[1]
            d['kitchen'] = row[2]
            d['address'] = row[3]
            d['latitude'] = row[4]
            d['longitude'] = row[5]
            d['area'] = row[6]
            d['price'] = row[7]
            d['image'] = row[8]
            d['days'] = row[9]
            d['hours'] = row[10]
            d['menu_1'] = row[11]
            d['price_menu_1'] = row[12]
            d['menu_2'] = row[13]
            d['price_menu_2'] = row[14]
            d['details'] = row[15]
            d['rating'] = row[16]
            d['reviews'] = row[17]
            objects_list.append(d)

        j = json.dumps(objects_list,default=str)
        return j

def gettimes(id, date):
    with engine.connect() as connection:
        query= f"SELECT availability FROM availabilites WHERE place_id = '{id}' AND date = '{date}'"
        search = connection.execute(query).fetchall()
        objects_list = []
        for row in search:
            row=row[0][:-3]
            objects_list.append(row)
        j = json.dumps(objects_list,default=str)
        return j

def create(username, password):              
    with engine.connect() as connection: 
        connection.execute("CREATE TABLE users (id INT NOT NULL AUTO_INCREMENT, username VARCHAR(50), password VARCHAR(50), PRIMARY KEY(id))")
        connection.execute(f"INSERT INTO users (username, password) VALUES ('{username}','{password}')")
        return "success"

def lookupuser(username, password):
    lookup =f"SELECT * FROM accounts where (username='{username}' and password='{password}')" 
    with engine.connect() as connection: 
        user = connection.execute(lookup).fetchone()
        if user:
            return True

def validation(activity, date, budget, guests):
    insert = f"INSERT INTO validation (activity, date, budget, guests) VALUES ('{activity}', '{date}', '{budget}', '{guests}');" 
    with engine.connect() as connection: 
        connection.execute(insert)

def records():
    searchsummary ="SELECT AVG(budget), AVG(guests) FROM validation GROUP BY activity" 
    with engine.connect() as connection: 
        validation_records = connection.execute(searchsummary).fetchall()
        return print(validation_records)