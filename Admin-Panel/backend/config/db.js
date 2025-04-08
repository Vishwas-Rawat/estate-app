import mysql from 'mysql2';
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "EstateApp",
    password: "Vishwas@2002"
});

db.connect((err)=>{
    if(err){
        console.log(err);
        console.log("Database is not connected", err);
    }
    else{
        console.log("Database is connected");
    }
})

export default db;