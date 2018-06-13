var bcrypt= require("bcrypt-nodejs");
var mongoose= require("mongoose");

var SALT_FACTOR=10;
//toma los valores que se crearon en la BD
var zombieSchema=mongoose.Schema({
    username:{type: String, required: true, unique:true},
    password:{type: String, required:true},
    createdAt:{type: Date, default: Date.now},
    displayName:{type: String,required:true},
    bio: String
});

var donothing=()=>{

}
//Encripta antes de entrar a la base
zombieSchema.pre("save",(done)=>{
    var zombie= this;
    if(!zombie.isModified("password")){
        return done();
    }
    bcrypt.genSalt(SALT_FACTOR,(err,salt)=>{
        if(err){
            return done(err);
        }
        bcrypt.hash(zombie.password,salt,donothing,(err,hashedpassword)=>{
            if(err){
                return done (err);
            }
            zombie.password=hashedpassword;
            done ();
        });
    });
});


zombieSchema.methods.checkPassword=(guess,done)=>{
    bcrypt.compare(guess,this.password,(err,isMatch)=>{
        done(err,isMath);
    });
}

zombieSchema.methods.name=function(){
    return this.displayName||this.username;
}

var Zombie=mongoose.model("Zombie",zombieSchema);
module.exports=Zombie;
