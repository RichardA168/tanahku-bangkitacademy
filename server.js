const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'bangkitacademy'
})

//api signup
app.post('', (req, res) => { // '/signup' -> misalnya
    const sql = "INSERT INTO login (`name`, `email`, `password`) VALUES (?)";
    const values = [
        req.body.name,
        req.body.email,
        req.body.password
    ]
    db.query(sql, [values], (err, data) => {
        if(err){
            return res.json("error");
        }
        return res.json(data);
    })
})

//api login
app.post('', (req, res) => {
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
})

app.listen(3000, () => {
    console.log("Node berhasil dinyalakan!");
})
