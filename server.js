const express = require('express');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const cors = require('cors');

const app = express();

const corsOptions = {
    origin: 'http://example.com',
    optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'bangkitacademy'
})

//api signup
app.post('/signup', async (req, res) => { // '/signup' -> misalnya
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const sql = "INSERT INTO login (`name`, `email`, `password`) VALUES (?, ?, ?)";
        const values = [
            req.body.name,
            req.body.email,
            hashedPassword
        ]
        db.query(sql, values, (err, data) => {
            if (err) {
                return res.json("error");
            }
            return res.json(data);
        })
    } catch  {
        console.error(error);
        return res.json("error");
    }
});

//api login
app.post('/login', (req, res) => {
    const sql = "SELECT * FROM login WHERE `email` = ? AND `password` = ?";
    // const values = [
    //     req.body.name,
    //     req.body.email,
    //     req.body.password
    // ]
    db.query(sql, [req.body.email, req.body.password], (err, data) => {
        if(err){
            return res.json("error");
        }
        if(data.length > 0){
            return res.json("success");
        } else {
            return res.json("Failed");
        }
        // return res.json(data);
    })
});

app.listen(8080, () => {
    console.log("Node berhasil dinyalakan!");
})