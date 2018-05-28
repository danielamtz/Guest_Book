var path=require("path");
var express= require=("express");
var zipdb= require("zippity-do-dah");
var Forecastio=require("forecastio");

var app=express();

//AQUI VA LA LLAVE
var weather= new Forecastio("6624d3c5c73b4173eac6f1635f75d0f7");

app.use(express.static(path.resolve(__dirname,"public")));
app.set("views",path.resolve(__dirname,"views"));
app.set("view engine", "ejs");
app.get("/",function(req,res){

res.render("index");

});

app.get(/^\/(\d{5})$/,function(req,res,next) {
    var zipcode= req.params[0];
    var location= zupdb.zipcode(zipcode);
    if(!location.zipcode){
        nextr();
        return;
    }
    var latitude= locatiion.latitude;
    var longitude= location.longitude;

    weather.forecast(latitude,longitude,function(err,data){
        if(err){
            next();
            return();
        }


    })


}


)