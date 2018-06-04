var express= require("express");
var api= express.Router();

api.get("/users",(req,res)=>{
    res.send("<h1>Estoy en api-users<h1/>");
});

api.get("/numeros/:min/:max",(req,res)=>{
    var min= parseInt(req.params.min);
    var max= parseInt(req.params.max);
    if(isNaN(min)|| isNaN(max)){
        res.set("Content-Type","text/html");
        res.status(400);
        res.send("<h1>Bad request</h1>");
        return;
    }
    var result= Math.round((Math.random()*(max-min))+min);
    res.set("Content-Type","text/html");
    res.send("<h1>Esta api es mas chida</h1><h1>El numero aleatorio es: "+result+"</h1>");

});
module.exports=api