var express=require('express');
var path=require('path');
var cookieParser=require('cookie-parser');
var bodyParser=require('body-parser');
var exphbs=require('express-handlebars');
var expressValidator=require('express-validator');
var flash=require('connect-flash');
var session=require('express-session');

var PORT=process.env.PORT || 3000;




var routes=require('./routes/index');
// var users=require('./routes/users');


//init app
var app=express();

//view engine
var hbs=exphbs.create({

  defaultLayout:'layout',
  helpers:{
    ifequal:function(a, b,options) {
      if (a == b) {
        console.log('checked');
        return options.fn(this);
      } else {
        return options.inverse(this);
      }
    },
    json:function(obj)
    {
      return JSON.stringify(obj);    
    }
  }
});


app.set('views',path.join(__dirname,'views'));
app.engine('handlebars',hbs.engine);


app.set('view engine','handlebars');

//bodyparser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieParser());

//set static folder
app.use(express.static(path.join(__dirname,'public')));

//express session
app.use(session({
    secret:'secret',
    saveUninitialized:true,
    resave:true
}));



app.use(flash());



app.use(function(req,res,next){
    res.locals.success_msg=req.flash('success_msg');
    res.locals.error_msg=req.flash('error_msg');
    res.locals.error=req.flash('error');
    res.locals.user=req.user || null;
    next();
});


app.use('/',routes);
// app.use('/users',users);


//set port
//app.set('port',(process.env.PORT || 5000));

app.listen(PORT,function(){
    console.log('server is running on port '+3000);
});