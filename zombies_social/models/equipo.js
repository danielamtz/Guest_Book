var bcrypt= require("bcrypt-nodejs");
var mongoose= require("mongoose");
var SALT_FACTOR=10;

var equipoSchema=mongoose.Schema({
    description:{type: String, required: true},
    defense:{type:Number, required:true},
    category:{type:String},
    weight:{type:Number}
});

var donothing=()=>{

}

equipoSchema.methods.name=function(){
    return this.description;
}
var Equipo=mongoose.model("equipment",equipoSchema);

module.exports=Equipo;
