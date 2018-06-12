var express= require("express");
var api= express.Router();

api.get("/",(req,res)=>{
res.status(500).send("Utilizaste el verbo GET");
});

api.post("/",(req,res)=>{
    res.status(300).send("Utilizaste el verbo POST");
    });

api.put("/",(req,res)=>{
     res.status(400).send("Utilizaste el verbo PUT");
    });

    api.delete("/",(req,res)=>{
        res.status(100).send("Utilizaste el verbo DELETE");
        });

module.exports=api;