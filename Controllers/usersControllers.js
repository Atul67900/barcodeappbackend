const barcodes = require("../models/usersSchema");

// Register Barcode
exports.userpost = async(req,res)=>{
    // console.log(req.file);
    // console.log(req.body);
    // const file = req.file.filename;
    const {sku,altsku,description} = req.body;

    if(!sku || !altsku || !description){
        res.status(401).json("All Inputs are Required")
    }
    try {
        const peruser = await barcodes.findOne({sku:sku});

        if(peruser){
            res.status(401).json("This barcode Already exist in Database")
        }else{

            const userData = new barcodes({
                sku,altsku,description
            });
            await userData.save();
            res.status(200).json(userData);
        }
    } catch (error) {
        res.status(401).json(error);
        console.log("catch block error");
    }
}


//  Barcodes Get

exports.userget = async(req,res)=>{

    const search = req.query.search || ""

    const query = {
        altsku : {$regex:search,$options:"i"}
    }

    try {
        // console.log(req.query);
        barcodesdata = await barcodes.find(query);
        res.status(200).json(barcodesdata)
    } catch (error) {
        res.status(401).json(error);
        // console.log("catch block error");
    }
}

// single user get

exports.singlebarcodeget = async(req,res)=>{

    const {id} = req.params;

    try {
        const barcodedata = await barcodes.findOne({_id:id});
        res.status(200).json(barcodedata)
    } catch (error) {
        res.status(401).json(error)
    }
}

// Edit Barcode

exports.barcodeedit = async(req,res)=>{
    const {id} = req.params;

    const {sku,altsku,description} = req.body;

    try {
        const updatebarcode = await barcodes.findByIdAndUpdate({_id: id},{
            sku,altsku,description  
        },{
            new:true
        });

        await updatebarcode.save();
        res.status(200).json(updatebarcode);
    } catch (error) {
        res.status(401).json(error)
    }
}


// Delete Barcode

exports.barcodedelete = async(req,res)=>{
    const {id} = req.params;
    try {
        const deletebarcode = await barcodes.findByIdAndDelete({_id:id});
        res.status(200).json(deletebarcode);    
    } catch (error) {
        res.status(401).json(error)
    }
}