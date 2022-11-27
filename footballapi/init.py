import sqlite3

con = sqlite3.connect("./db/BundesligaData.db")
cur = con.cursor()

def createStandingsTable():
    cur.execute("CREATE TABLE currStandings(rank, id, name, points)")

def createPredictionsTable():
    cur.execute("CREATE TABLE currPredictions(id, winner, goalshome, goalsaway, home, draw, away)")

def createFixtureTable():
    cur.execute("CREATE TABLE currFixtures(id, home, away)")


createPredictionsTable()
createFixtureTable()

