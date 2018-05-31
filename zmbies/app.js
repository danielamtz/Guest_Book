var http= require('http');
var path= require('path');
var express= require('express');
var logger = require ('morgan');
var bodyParser =require('body-parser');


var app= express();

app.set('views',path.resolve(__dirname, 'views'));
app.set('view engine','ejs');
//arreglo para entradas
var entries=[];
app.locals.entries=entries;


app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: false}));

app.get("/", (request,response)=> response.render('header'));
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