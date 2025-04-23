require('dotenv').config();
const express = require('express');
const {Pool} = require('pg');
const cors = require('cors');


const app = express();
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
const port = process.env.PORT;

console.log(process.env.DB_PASSWORD);


const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
});


app.get('/', async (req,res) => {
    try {
        const result = await pool.query('SELECT NOW()');
        res.send(`Hello from Muckswon! Server time is ${result.rows[0].now}`);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error connecting to the database.')
    }
});


app.listen(port,() => {
    console.log(`App running on http://localhost:${port}`)
})