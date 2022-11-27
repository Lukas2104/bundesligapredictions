const express = require('express');
const app = express();
const port = 8000;
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

let currStandings = null;
let currFixtures = null;

let db = new sqlite3.Database('./db/BundesligaData.db', (err) => {
    if (err){
        console.error(err.message);
    }
    console.log('Successfully connected to db')
})

let sqlStandings = `SELECT * FROM currStandings`;

db.all(sqlStandings, [], (err, rows) => {
    if (err) {
        throw err;
    }
    rows.forEach((row) => {
        console.log(row);
    });
    currStandings = rows;
});

let sqlFixtures = `SELECT * FROM currFixtures`;

db.all(sqlFixtures, [], (err, rows) => {
    if (err) {
        throw err;
    }
    rows.forEach((row) => {
        console.log(row);
    })
    currFixtures = rows;
});

db.close()

app.use(cors({
    origin: '*'
}))

app.get('/standings', (req, res) => {
    res.send(currStandings);
})

app.get('/fixtures', (req, res) => {
    res.send(currFixtures);
})

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
})