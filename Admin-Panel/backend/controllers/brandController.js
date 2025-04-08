import express from 'express'
import db from '../config/db.js';
function addBrand(req, res){    
    try{
        const addBrandQuery = 'insert into brand (brand_name, brand_image) values(?,?)'
        const values = [req.body.brand_name, req.file.filename];
        db.query(addBrandQuery, values, (err, result)=>{
            if(err)throw err;
            if(result.affectedRows > 0){
                res.status(200).send({msg: 'Thank you for adding your brand!', success: true});
            }else{
                res.status(400).send({msg: 'Please enter a unique brand name!', success: false});
            }
        })
    }catch(error){
        console.log(error);
        res.status(500).send({msg: 'Server error', success: false});
    }
}


function getAllBrands(req, res){
    const allBrandsQuery = 'Select * from brand';
    try{
        db.query(allBrandsQuery, (err, result)=>{
            if (err) throw err;
            if(result.length > 0){
                res.status(200).send({msg: 'All brands shown', result: result, success: true});
            }else{
                res.status(400).send({msg: 'No brands found', success: false});
            }
        })
    }catch(error){
        res.status(500).send({msg: 'Server error', success: false});
    }
}


function editBrand(req, res){
    const editBrandQuery = 'update brand set brand_name = ?, brand_image = ? where brand_id = ?';
    const brand_name = req.body.brand_name || null;
    const brand_image = req.file ? req.file.filename : null;
    const values = [brand_name, brand_image, req.query.brand_id];

    if(brand_name == null || brand_image === null){
        return res.status(400).send({msg: 'No brands found, please enter name and image', success: false});
    }

    try{
        db.query(editBrandQuery, values, (err, result)=>{
            console.log(result);
            if(err)throw err;
            return res.status(200).send({msg: 'Brand updated successfully', result: result, success: true});
        })
    }catch(error){
        return res.status(500).send({msg: 'Server error', success: false});
    }
}

function deleteBrand(req, res){
    const brand_id = req.params.brand_id;
    const deleteQuery = 'DELETE from brand where brand_id = ?';
    const value = [brand_id];
    if (!brand_id) {
        return res.status(400).send({ msg: "Brand ID is required", success: false });
    }

    try{
        db.query(deleteQuery, value, (err, result)=>{
            if(err)throw err;
            if(result.affectedRows > 0){
                return res.status(200).send({msg: 'Brand deleted successfully', result: result[0], success: true});
            }else{
                return res.status(400).send({msg: 'No brand found', success: false});
            }
            
        })
    }catch(error){
        return res.status(500).send({msg: 'Server error', success: false});
    }
}
export default {addBrand, getAllBrands, editBrand, deleteBrand}