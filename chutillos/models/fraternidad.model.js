var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var esquema=new Schema({
    nombre:{type:String},
    institucion:{type:String},
    presidente:{type:String,required:true},
    delegadoaffap:{type:String,required:true},
    reina:{type:String},
    cantidad:{type:Number,min:0},
    danza:{type:String},
    descripcion:{type:String,required:true},
    hora:{type:String},
    dia:{type:String,required:true},
    tipodanza:{type:String,required:true}
});
module.exports=mongoose.model('Fraternidad',esquema);
