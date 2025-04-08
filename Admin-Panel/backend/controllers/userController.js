import db from "../config/db.js";
import jwt from 'jsonwebtoken'
function register(req, res) {
  const registerQuery =
    "Insert into user (First_Name, Last_Name, Mobile_Number, Email, Password) values (?, ?, ?, ?, ?)";

  const values = [
    req.body.First_Name,
    req.body.Last_Name,
    req.body.Mobile_Number,
    req.body.Email,
    req.body.Password,
  ];
  try {
    db.query(registerQuery, values, (err, result) => {
      if (err) {
        return res.status(500).send({ msg: "Database is not connected", err });
      }

      if (result.affectedRows > 0) {
        return res.status(200).send({
          msg: "Thank you for registering!",
          success: true,
        });
      } else {
        return res.status(400).send({ msg: "Enter valid values" });
      }
    });
  } catch (error) {
    return res.status(500).send({ msg: "Server error", error });
  }
}



function login(req, res) {
  const registerQuery = "SELECT * FROM user where Email = ? and Password = ?";

  const values = [req.body.Email, req.body.Password];
  console.log(values);
  try {
    db.query(registerQuery, values, (err, result) => {
      if (err) {
        res.status(500).send({ msg: "Database is not connected", err });
      }

      if (result.length > 0) {
        const payload = { email: req.body.Email, password: req.body.Password };
        const token = jwt.sign(payload, "eState", {expiresIn: '1d'});
        res.status(200).send({
          msg: "Login successful",
          success: true,
          result: result[0],
          token: token
        });
      } else {
        return res.status(400).send({ msg: "User is not registered", success: false });
      }
    });
  } catch (error) {
    res.status(500).send({ msg: "Server error", error });
  }
}

function getUserInfo(req, res){
  console.log("Here");
  const q1 = 'Select * from user where Email = ?';
  try{
    db.query(q1, [req.body.Email], (err, result)=>{
      if(err)throw err;
      if(result.length > 0){
        return res.status(200).send({msg: 'User found!', result: result[0], success: true});
      }else{
        return res.status(400).send({msg: 'User not found!', success: false});
      }
    })
  }catch(error){
    return res.status(500).send({msg: 'Server error', success: false});
  }
}

// Add this new function to your existing controller
function getLikesByProperty(req, res) {
  const { product_id } = req.params;

  try {
    const query = "SELECT user_id FROM likes WHERE product_id = ?";
    
    db.query(query, [product_id], (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ 
          success: false, 
          message: "Database error" 
        });
      }
      res.json({ 
        success: true, 
        user_ids: results.map(item => item.user_id) 
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      success: false, 
      message: "Server error" 
    });
  }
}

// Add to your exports
export default { 
  register, 
  login, 
  getUserInfo,
  getLikesByProperty 
};
