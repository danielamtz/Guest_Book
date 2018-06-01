var http= require('http');
var path= require('path');
var express= require('express');
var logger = require ('morgan');
var bodyParser =require('body-parser');


var app= express();

app.set('views',path.resolve(__dirname, 'views'));
app.set('view engine','ejs');


app.use(express.static(path.resolve(__dirname,"public")));
app.get("/",function(req,res){

    res.render("victimas_index");
    
    });
//arreglo para entradas
var entries=[];
var ips_blanca=['192.168.92.1','192.0.0.1','::1'];
var aux;

app.locals.entries=entries;

var IP_MALVADA="::1";


    app.use("/new-entry",(request,response,next,)=>{
        for (var i = 0; i < ips_blanca.length; i++) {

        if(request.ip ===ips_blanca[i]){
           aux=ips_blanca[i];
            
        }
    }
    if(request.ip===aux){
        next();
    }
    else{
        response.status(401).send("No estas en el arreglo de ips");
   
    }
    });
 

app.use(bodyParser.urlencoded({extended: false}));

app.get("/", (request,response)=> response.render('victimas_index'));
app.get("/armas", (request,response)=> response.render('armas'));
app.get("/clases", (request,response)=> response.render('clases'));
app.get("/new-entry",(request,response)=>response.render("new-entry"));
app.get("/victimas_index",(request,response)=>response.render("victimas_index"));

app.post("/new-entry",(request,response)=>{
    if(!request.body.title ||!request.body.body){
        response.status(400).send("Las entradas deben de tener un titulo y un mensaje");
        return;
    }
    entries.push({
        title: request.body.title,
        Direccion: request.body.Direccion,
        instagram: request.body.instagram,
        body: request.body.body,
        created: new Date()
    });
    response.redirect('/');


});

var publicPath= path.join(__dirname,'public');
app.use('/recursos',express.static(publicPath));
app.use((request,response)=>{
        response.writeHead(200,{'Content-Type':'text/plain'});
        response.end('No se encontro ningun archivo');
        
        });

app.use((request,response)=> response.status(404).render('404'));
http.createServer(app).listen(3000,()=>
console.log("La aplicaion esta corriendo en el puerto 3000")
);