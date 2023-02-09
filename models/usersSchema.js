const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
    sku:{
        type:String,
        required:true,
        trime:true
    },
    altsku:{
        type:String,
        required:true,
        trime:true
    },
    description:{
        type:String,
        required:true,
        trime:true
    }
})

//model

const barcodes = new mongoose.model("barcodes",usersSchema)

module.exports = barcodes;