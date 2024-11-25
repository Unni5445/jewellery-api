import mongoose from "mongoose";

const binSchema = new mongoose.Schema({
    model:{
        type:String,
        required:true
    },
    data:{
        type:Object,
        required:true
    }
})

const Bin = mongoose.model("Bin",binSchema)
export default Bin