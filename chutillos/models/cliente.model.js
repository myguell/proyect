var mongoose=require('mongoose');
var schema = mongoose.Schema;
var esquema=new schema({
    nombre:{type:String,required:true},
    apellido:{type:String,required:true},
    ci:{type:String,required:true},
    direccion:{type:String,required:true},
})
module.exports=mongoose.model('Cliente',esquema);