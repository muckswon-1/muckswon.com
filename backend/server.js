require('dotenv').config();
const express = require('express');
const {Pool} = require('pg');
const cors = require('cors');

const allowedOrigins = process.env.ALLOWED_ORIGINS.split(',')
const app = express();
app.use(cors({
    origin: function(origin,callback) {
        if(!origin || allowedOrigins.includes(origin)){
            callback(null,true)
        }else {
            callback(new Error('Not Allowed by CORS'));
        }
    },
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