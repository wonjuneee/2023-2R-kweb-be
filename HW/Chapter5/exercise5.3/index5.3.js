const express = require('express');
const port = 3000;
const app = express();

const mysql = require('mysql2/promise');
const pool = mysql.createPool({
    host: "localhost",
    port: 3306,
    user: "kwebuser",
    password: "kwebpw",
    database: "kwebdb1",
});

const runQuery = async sql => {
    const conn = await pool.getConnection();
    try {
        const [result] = await conn.query(sql);
        return result;
    } 
    finally {
        conn.release();
    }
};


app.get('/fare', async (req, res) =>{
    try {
        const {uid} = req.query;
        const sql = 'SELECT users.name, ' +
            'SUM(Round((fare_rate / 100) * (distance / 10), -2)) AS fare FROM tickets ' +
            'INNER JOIN trains on tickets.train = trains.id ' +
            'INNER JOIN types on trains.type = types.id ' +
            `INNER JOIN users on tickets.user = users.id AND users.ID = ${uid} ` +
            'GROUP BY users.id';
        const { name, fare } = (await runQuery(sql))[0];
        res.send(`Total fare of ${name} is ${fare} KRW.`);
    } catch(err){
        console.error(err);
        res.sendStatus(500);
    }
});

app.get('/train/status', async (req, res) =>{
    try{
        const { tid } = req.query;
        const sql = 'SELECT max_seats AS maximum, Count(*) AS occupied FROM tickets ' +
            `INNER JOIN trains on tickets.train = trains.id AND trains.id = ${tid} ` +
            'INNER JOIN types on trains.type = types.id ';
        const { maximum, occupied } = (await runQuery(sql))[0];
        if(maximum - occupied > 0)
            res.send(`Train ${tid} is not sold out`);
        else
            res.send(`Train ${tid} is sold out`);
    } catch(err){
        console.error(err);
        res.sendStatus(500);
    }
})

app.listen(port, () => console.log(`Server listening on port ${port}!`));