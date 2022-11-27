import sqlite3
from sqlite3 import Error
import http.client
import json

def create_connection(path):
    connection = None
    try:
        connection = sqlite3.connect(path)
        print("Connection to SQLite DB successful")
    except Error as e:
        print(f"The error '{e}' occurred")
    return connection


connection = create_connection("./db/BundesligaData.db")
cursor = connection.cursor()

conn = http.client.HTTPSConnection("v3.football.api-sports.io")

headers = {
    'x-rapidapi-host': "v3.football.api-sports.io",
    'x-rapidapi-key': "1d58387c493f67551682e6ea66ca27fe"
    }

def getCurrStandings():
    conn.request("GET", "/standings?league=78&season=2022", headers=headers)
    res = conn.getresponse()
    data = res.read().decode("utf-8")
    standingsList = json.loads(data)["response"][0]["league"]["standings"][0]

    for i in standingsList:
        rank = i["rank"]
        teamID = i["team"]["id"]
        teamName = i["team"]["name"]
        points = i["points"]
        print(type(rank))
        print(type(teamID))
        print(type(teamName))
        print(type(points))
        data = (rank, teamID, teamName, points)
        try:
            cursor.execute("INSERT INTO currStandings VALUES(?, ?, ?, ?)", data)
            connection.commit()
            print("success")
        except:
            print("failed")

def getCurrRound():
    conn.request("GET", "/fixtures/rounds?league=78&season=2022&current=true", headers=headers)
    res = conn.getresponse()
    data = res.read().decode("utf-8")
    currRound = json.loads(data)["response"][0]

    return currRound


def getCurrFixtures():
    currRound = getCurrRound()
    path = "/fixtures?league=78&season=2022&round="+currRound
    path = path.replace(" ", "%20")
    conn.request("GET", path, headers=headers)
    res = conn.getresponse()
    data = res.read().decode("utf-8")
    currFixtures = []
    for i in range(0,9):
        currFixtures.append(json.loads(data)["response"][i]["fixture"]["id"])
    return currFixtures

def getCurrPredictions():
    currFixtures = getCurrFixtures()
    for i in currFixtures:
        path = "/predictions?fixture="+str(i)
        conn.request("GET", path, headers=headers)
        res = conn.getresponse()
        data = res.read().decode("utf-8")
        response = json.loads(data)["response"][0]
        prediction = response["predictions"]
        predictionData = (i, prediction["winner"]["name"], prediction["goals"]["home"], prediction["goals"]["away"], prediction["percent"]["home"], prediction["percent"]["draw"], prediction["percent"]["away"])
        teams = response["teams"]
        teamsData = (i, teams["home"]["name"], teams["away"]["name"])
        try:
            cursor.execute("INSERT INTO currPredictions VALUES(?, ?, ?, ?, ?, ?, ?", predictionData)
            connection.commit()
            print("success (predicitons)")
        except:
            print("failed (predictions)")
        try:
            cursor.execute("INSERT INTO currFixtures VALUES(?, ?, ?)", teamsData)
            connection.commit()
            print("success (fixtures)")
        except:
            print("failed (fixtures)")

def test():
    data = ("871307", "VfB Stuttgart", "FSV Mainz 05")
    cursor.execute("INSERT INTO currFixtures VALUES(?, ?, ?)", data)
    connection.commit()


test()



