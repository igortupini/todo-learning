var express = require('express');
var router = express.Router();
var { Client } = require('pg');

//Database Config
console.log(process.env.PGUSER);
var client = new Client({
    user: process.env.PGUSER,
    host: 'localhost',
    database: process.env.PGDB,
    password: process.env.PGPASS,
    port: '5432'
})

router.get('/',(req,res)=>{
    res.send({message: 'ok'});
});

router.post('/',(req,res)=>{
    
    var data = {
        title: req.body.title,
        content: req.body.content,
        createdat: new Date()
    }

    client.connect();
    client.query('INSERT INTO tasks(title,content,createdat) VALUES($1,$2,$3)',[data.title,data.content,data.createdat],(err,result)=>{
        if(err){
            client.end();
            console.log(err);
            return res.status(500).json({success: false,data: err});
        };

        client.end();
        return res.json({success: true, data: result});   
    });
});

module.exports = router;