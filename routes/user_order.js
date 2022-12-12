var express = require('express');
var router = express.Router();
const mongoose = require("mongoose");
const Product = require("../schemas/products");
const ShoppingCart = require("../schemas/shoppingCart");
const Order = require("../schemas/orders");
const User = require('../schemas/users');
const moment = require('moment-timezone');

const SUPER_USER_ID = "63976f7a0403b414ba4a4e4a";


const isLoggedIn = (req, res, next)=> {
    if (!req.isAuthenticated()) {
        res.redirect("/users/login");
    }
    else {
        next();
    }
  }

 

const isSuperUser = (req, res, next)=> {
    if (!req.isAuthenticated()) {
        res.redirect("/users/login");
    }
    else {
        if (req.user.id == SUPER_USER_ID) {
            // super user
            next();
        } else {
            // alert messages
            res.redirect('/users/login')
        }
    }
}
// ORDER History
router.get('/', isLoggedIn, (req,res)=> {
    
    User.findById(req.user.id, (error, user)=>{
        if (error) {
          res.send("User not found");
        } else {
          Order.find({order_by : req.user.id}, (error, orders)=> {
            if (error) {
              res.send("ERROR : order not found")
            } else {
                
              res.render('order_history', {title : "order history", orders : orders, user : user})
            }
          })
        }
      })  
})





module.exports = router;