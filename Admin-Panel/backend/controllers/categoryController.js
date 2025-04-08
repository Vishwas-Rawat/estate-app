import db from "../config/db.js";
function addCategory(req, res) {
  const addCategoryQuery = "Insert into category (category_name, category_image) values (?, ?)";
  const values = [req.body.category_name, req.file.filename];
  db.query(addCategoryQuery, values, (err, result) => {
    try {
      if (err) throw err;
      if (result.affectedRows > 0) {
        res
          .status(200)
          .send({ msg: "Category added successfully", success: true });
      } else {
        res
          .status(200)
          .send({
            msg: "Invalid category or category already present",
            success: false,
          });
      }
    } catch (error) {
      res.status(500).send({ msg: "Server error", success: false });
    }
  });
}


function getAllCategories(req, res){
    const getAllCategoriesQuery = 'Select * from category';
    try{
        db.query(getAllCategoriesQuery, (err, result)=>{
            if(result.length > 0){
                res.status(200).send({ msg: "All categories: ", result: result, success: true });
            }else{
                res.status(400).send({ msg: "No category found!", success: false });
            }
        })
    }catch(error){
      res.status(500).send({ msg: "Server error", success: false });
    }
}


function updateCategory(req, res){
    const updateCategoryQuery = 'Update category set category_name = ?, category_image = ? where category_id = ?'

    const values = [req.body.category_name, req.file.filename, req.params.category_id];
    try{
        console.log(req.params.id);
        db.query(updateCategoryQuery, values, (err, result)=>{
            if(err) throw err;
            console.log(result);
            if(result.affectedRows > 0){
                res.status(200).send({ msg: "Category updated successfully", success: true });
            }else{
                res.status(400).send({ msg: "No category found", success: false });
            }
        })
    }catch(error){
        res.status(500).send({ msg: "Server error", success: false });
      }
}


function deleteCategory(req, res){
    const deleteCategoryQuery = 'Delete from category where category_id = ?'
    const values = [req.query.category_id];
    try{
        console.log(req.query.category_id);
        db.query(deleteCategoryQuery, values, (err, result)=>{
            if(err) throw err;
            console.log(result);
            if(result.affectedRows > 0){
                res.status(200).send({ msg: "Category deleted successfully", success: true });
            }else{
                res.status(400).send({ msg: "No category found", success: false });
            }
        })
    }catch(error){
        res.status(500).send({ msg: "Server error", success: false });
      }
}
export default {addCategory, getAllCategories, updateCategory, deleteCategory}