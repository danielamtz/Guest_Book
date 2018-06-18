var express= require("express");
var Zombie= require("./models/zombie");
var Equipo= require("./models/equipo");

var passport=require("passport");
var router= express.Router();

router.use((req,res,next)=>{
    res.locals.currentZombie=req.Zombie;
    res.locals.currentEquipo=req.Equipo;
    res.locals.errors=req.flash("error");
    res.locals.infos=req.flash("info");
    next();

});

router.get("/",(req,res,next)=>{
    Zombie.find()
        .sort({createdAt:"descending"})
        .exec((err,zombies)=>{
            if(err){
                return next(err);
            }
            res.render("index",{zombies:zombies});
        });
});
router.get("/index_equipment",(req,res,next)=>{
    Equipo.find()
        .sort({defense:"descending"})
        .exec((err,equipment)=>{
            if(err){
                return next(err);
            }
            res.render("index_equipment",{equipment:equipment});
        });
});
router.get("/signup",(req,res,next)=>{
    res.render("signup")
});

router.get("/index_equipment",(req,res,next)=>{
    res.render("index_equipment")
});
router.get("/registro_equipo",(req,res,next)=>{
    res.render("registro_equipo")
});
router.get("/zombies/:username",(req,res,next)=>{
Zombie.findOne({username: req.params.username}, (err,zombie)=>{
    if(err){
        return next(err);
    }
    if(!zombie){
        return next(400);
    }
    res.render("profile",{zombie: zombie});
});
});

router.post("/signup", (req,res,next)=>{
    var username= req.body.username;
    var password= req.body.password;


Zombie.findOne({username: username},(err,zombie)=>{
    if(err){
        return next(err);
    }
    if(zombie){
        req.flash("error","El nombre de usuario ya lo ha tomado otro zombie");
        return res.redirect("/signup");
    }
    var newZombie= new Zombie({
        username:username,
        password:password
    });
    newZombie.save(next);
    return res.redirect("/");
});
});


router.post("/registro_equipo", (req,res,next)=>{
    var description= req.body.description;
    var defense= req.body.defense;
    var category= req.body.category;
    var weight= req.body.weight;


Equipo.findOne({description: description},(err,equipo)=>{
    if(err){
        return next(err);
    }
   
    var newEquipo= new Equipo({
        description:description,
        defense:defense,
        category:category,
        weight:weight
    });
    newEquipo.save(next);

    return res.redirect("/index_equipment");
});
});
module.exports=router;