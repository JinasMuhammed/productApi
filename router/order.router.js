
const express = require('express');
const orderRoute = express.Router();

const Order = require('../model/order.model');

orderRoute.route('/').get(function(req,res){
    Order.find(function(err,data){
        if(err){
console.log(err);

        }else{
            res.json(data)
        }
    });
});
orderRoute.route('/').post(function(req,res){
    let order = new Order(req.body);

    order
        .save()
        .then(obj=>{
            res.status(200).json({message:'order recived success fully'});
        })
        .catch(err=>{
            res.status(400).json({message:'unable to take order'});

        });
});

orderRoute.route('/:id').get(function(req,res){
    let id= req.params.id;
    Order.findById({_id:id},function(err,data){
        res.json(data);
    });

});
orderRoute.route('/:username').get(function(req,res){
    let username =req.params.username;
    Order.find({username:username},function(err,data){
        if(err){
            throw err;

        }else{
            res.json(data);
        };
    });
});

orderRoute.route('/:id').patch(function(req,res){
    let id=req.params.id;
    //validate request
    if(!req.body.orderstatus){
        return res.status(400).send({
            message:"order Content can't be empty"
        });
    }
    //find note and update it with the request body 
    Order.findByIdAndUpdate(id,{
        orderstatus: req.body.orderstatus || "Accepted"
    },{new:true})
    .then(obj=>{
        if(!obj){
            return res.status(404).send({
                message:"Order not found with id "+id
            });

        }
        res.send(obj);
    }).catch(err=>{
        if(err.kind === 'id'){

            return res.status(404).send({
                message:"order not found with id"+ id
            });
      
        }
        return  res.status(500).send({
            message:"error updating note with id "+ id
        });
    });
});

orderRoute.route(':/id').delete(function(req,res){
    let id = req.params.id;

    Order.findByIdAndDelete({_id:id},function(err,data){
        if(err){
            console.log(err);
        }else{
            res.status(200).json({message:"Succesfully deleted the Order"});
        }
    });

});
module.exports= orderRoute;
  
