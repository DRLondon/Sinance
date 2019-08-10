const express = require('express')
const morgan = require('morgan')
const app = express()
const PORT = 3000 || process.env.PORT
const mysql = require('mysql')

app.use(morgan('short'))
// app.use(morgan('combined'))

app.get('/user/:id', (req, res) => {
    console.log(`Fetching user with id: ${req.params.id}`)
    res.end()
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'lbta_mysql'
    })

    connection.query('SELECT * FROM users', (err, rows, fields) => {
        console.log("I think we fetched users successfully")
        res.json(rows)
    })
})

// Routes
app.get('/', function(req, res){
    res.send("Home Route")
})
app.get('/users', function(req, res){
    const user_one = {firstName: 'Bobby', lastName: 'Johnson'}
    const user_two = {firstName: 'OhGee', lastName: 'Thoei'}
    res.json([user_one, user_two])
    // res.send("Posts Route")
})
app.listen(PORT)