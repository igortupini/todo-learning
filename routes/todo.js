var express = require('express');
var router = express.Router();
var db = require('../db');

//Get All To-do's
router.get('/',(req,res)=>{
    db.query('SELECT * FROM tasks',(err,result)=>{
        if(err){
            console.error(err);
            return res.status(400).json({success: false, data: err});
        };

        return res.json({success: true, data: result.rows});
    });
});

//Get To-do by ID
router.get('/:id',(req,res)=>{
    var { id } = req.params;
    db.query('SELECT * FROM tasks WHERE id = $1',[id],(err,result)=>{
        if(err){
            console.error(err);
            return res.status(400).json({success: false, data: err});
        };
        
        return result.rows.length ?
            res.json({success: true, data: result.rows})
            :
            res.status(404).json({success:false,data: 'Couldnt find any matched relations with the id '+ id +'.'})
    });
});

//Post new to-do
router.post('/',(req,res)=>{
    
    var data = {
        title: req.body.title,
        content: req.body.content,
        createdat: new Date()
    }

    db.query('INSERT INTO tasks(title,content,createdat) VALUES($1,$2,$3)',[data.title,data.content,data.createdat],(err,result)=>{
        if(err){
            console.error(err);
            return res.status(400).json({success: false,data: err});
            };

        return res.json({success: true, data: result});   
    });
});

//Exports
module.exports = router;