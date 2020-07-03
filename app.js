const express          = require('express'),
	  app              = express(),
	  mongoose         = require('mongoose'),
	  bodyParser       = require('body-parser'),
	  methodOverride   = require('method-override'),
	  expressSanitizer = require('express-sanitizer');

//app configuration
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine','ejs');
app.use(express.static('public'));      

//database connection
mongoose.connect('mongodb+srv://colt:9HXkkHt5v67u@TD@cluster0-ddvng.mongodb.net/app_db?retryWrites=true&w=majority',{useNewUrlParser:true,useUnifiedTopology:true});
//schema setup
const campgroundSchema = new mongoose.Schema({
	title:String,
	image:String,
	body:String,
	created:{type:Date,default:Date.now} 
});
//model setup     
const Campground = mongoose.model('app_table',campgroundSchema);    

//RESTful routes  
//index route
app.get('/',(req,res)=>{
	res.redirect('/campgrounds'); 
});     
app.get('/campgrounds',(req,res)=>{  
	Campground.find({},(e,s)=>{
		if(e){ 
			console.log(e);
		}
		else{
			res.render('index',{camps:s});  
		} 
	}); 
});  


//server connection
app.listen(process.env.PORT,process.env.IP);  
