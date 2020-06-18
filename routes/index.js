var express=require('express');
var router=express.Router();


//get homepage
router.get('/',function(req,res){
    res.render('index',{
        showTitle: true,

        // Override `foo` helper only for this rendering.
        helpers:{
            ifequal:function(a, b,options) {
              if (a == b) {
                  console.log('checked');
                return options.fn(this);
              } else {
                return options.inverse(this);
              }
            }
          }
    });
});

router.get('/events',function(req,res){
  res.render('events');
});
router.get('/about',function(req,res){
  res.render('about');
});
router.get('/contact',function(req,res){
  res.render('contact');
});
router.get('/achievements',function(req,res){
  res.render('achievements');
});
router.get('/teaching',function(req,res){
  res.render('teaching');
});
function ensureAuthenticated(req,res,next){
  console.log('inside index en');  
  if(req.isAuthenticated())
    {
        res.redirect('/users/admin_home');
    }
    else{
       // req.flash('error_msg','Your are not logged in');
        return next();
    }
}

module.exports=router;