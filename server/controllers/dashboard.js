console.log('Dashboard controller');
var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();
// var User = mongoose.model('User');


//just a placehold till i figure out how react client side is going to look
let test_json = {
            fisrt: "one",
            second: "two",
            third: "three"
        }
let index_json = {
            fisrt: "one",
            second: "two"
        }
        


class Dashboard {
    
    index(req,res){
        console.log("ya got the index")
        res.json(index_json)
    }
    test(req,res){
        console.log("ya got the test")
        res.json(test_json)
    }
   
}

module.exports = new Dashboard