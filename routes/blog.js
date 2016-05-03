var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var Post = require("../models/post");


router.get('/', function(req, res, next) {
    
    Post.find({},{}, function(err, posts){
      if(err){
        console.log(err);
      }else{
          
          
        var cats = [];
        var months = [];
          
          
        (function containsCat(){
            for (var i=0; i<= posts.length; i++){ 
                
              var arr = posts[i];
                
              for (var cat in arr){
                  
                   if(cat === "category"){
                       cats.push(arr["category"]);         
                   }    
              }                               
            }return cats;             
        })();
          
        (function containsMonth(){
            for (var i=0; i<= posts.length; i++){ 
                
              var arr = posts[i];
                             
              for (var mon in arr){
                  
                   if(mon === "month"){
                       
                       if(months.indexOf(arr["month"]) == -1){
                           months.push(arr["month"]);
                           
                       }                                         
                   }                    
              }                               
            }return months;                        
        })();
          
          
         res.render('blog',{
			"posts": posts,
             "cats": cats,
             "months": months
		 }); 
      }	
	});  
});


router.get('/:id', function(req, res, next) {
    
    var id = req.params.id;
    
    Post.find({"_id": id}, function(err, post){
      if(err){
        console.log(err);
      }else{
        console.log(post);
         res.render('show',{
			"post": post[0]
		}); 
      }	
	});  
});

router.get('/category/:category', function(req, res, next) {
    
    var category = req.params.category;
    console.log(category);
    
    Post.find({"category": category}, function(err, posts){
      if(err){
        console.log(err);
      }else{
         
         console.log(posts);
         res.render('categories',{
			"posts": posts
		}); 
      }	
	});  
});

router.get('/date/:month', function(req, res, next) {
    
    var month = req.params.month;
    console.log(month);
    
    
    Post.find({"month": month}, function(err, posts){
      if(err){
        console.log(err);
      }else{
         
         res.render('categories',{
			"posts": posts
		}); 
      }	
	});  
});


module.exports = router;