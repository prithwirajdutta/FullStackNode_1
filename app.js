const express = require('express')
const bodyparser = require('body-parser')
const app = express()
var mysql = require('mysql');

app.use(express.static('public'))
app.use(bodyparser.urlencoded({ extended: true }));

var con = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'test'
  });

app.get('/',(req,res)=>{
    res.sendFile('index.html')
})
app.post('/success',(req,res)=>{
    

    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
        var sql = "INSERT INTO testtb (name) VALUES ('"+req.body.name+"')";
        con.query(sql, function (err, result) {
          if (err) throw err;
          console.log("1 record inserted");
          res.sendFile(__dirname + "/public/"+"success.html")
        });
      });

})


app.listen(3000,console.log('listening at port 3000'))
