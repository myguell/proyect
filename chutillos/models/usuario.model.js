var mongoose=require('mongoose');
var schema = mongoose.Schema;
var esquema=new schema({
    nombre:{type:String,required:true},
    apellido:{type:String},
    login:{type:String,required:true},
    password:{type:String,required:true},
})
module.exports=mongoose.model('Usuario',esquema);