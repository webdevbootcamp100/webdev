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
app.use(methodOverride('_method'));     

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
//new route
app.get('/campgrounds/new',(req,res)=>{
	res.render('new');   
});
//create route
app.post('/campgrounds',(req,res)=>{
	Campground.create(req.body.camp,(e,s)=>{
		if(e){
			res.render('new');
		}
		else{
			res.redirect('/campgrounds');     
		}
	});
});
//show route
app.get('/campgrounds/:id',(req,res)=>{
	Campground.findById(req.params.id,(e,s)=>{
		if(e){
			res.redirect('/campgrounds');
		}
		else{
			res.render('show',{campi:s});                 
		}
	});
});
//edit route
app.get('/campgrounds/:id/edit',(req,res)=>{
	Campground.findById(req.params.id,(e,s)=>{
		if(e){
			res.redirect('/campgrounds');
		}
		else{
			res.render('edit',{campss:s});  
		}
	}); 
});
//update route
app.put('/campgrounds/:id',(req,res)=>{
	Campground.findByIdAndUpdate(req.params.id,req.body.campss,(e,s)=>{
		if(e){
			res.redirect('/campgrounds');
		}
		else{
			res.redirect('/campgrounds/'+req.params.id);     
		}
	});
}); 
//delete route
app.delete('/campgrounds/:id',(req,res)=>{
	Campground.findByIdAndRemove(req.params.id,(e,s)=>{
		if(e){
			res.redirect('/campgrounds');
		}
		else{
			res.redirect('/campgrounds');   
		}
	});  
});        

//server connection
app.listen(process.env.PORT,process.env.IP);                     
