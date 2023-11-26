const express = require("express");
const app = express();
const fs = require("fs");
const hostname = "localhost";
const port = 704;
const bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
const multer = require("multer");
const path = require("path");
const mysql = require("mysql");
const { userInfo } = require("os");
const { constrainedMemory } = require("process");

app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "public/img/");
  },

  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const imageFilter = (req, file, cb) => {
  // Accept images only
  if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
    req.fileValidationError = "Only image files are allowed!";
    return cb(new Error("Only image files are allowed!"), false);
  }
  cb(null, true);
};

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "dreammyweb_db",
});

con.connect((err) => {
  if (err) throw err;
  else {
    console.log("MySQL connected");
  }
});

const queryDB = (sql) => {
  return new Promise((resolve, reject) => {
    con.query(sql, (err, result, fields) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
};

app.post("/regisDB", async (req, res) => {
  let sql = "CREATE TABLE IF NOT EXISTS userInfo (id INT AUTO_INCREMENT PRIMARY KEY, reg_date TIMESTAMP, name VARCHAR(255),surname VARCHAR(255), email VARCHAR(100),password VARCHAR(100))";
  let result = await queryDB(sql);
  const EmailExisted = await checkEmailExisted(req.body.email);

  if(EmailExisted){
    return res.redirect("register.html?error=2");
  }

  let now_date = new Date().toISOString().slice(0, 19).replace("T", " ");
  sql = `INSERT INTO userInfo (name, surname, reg_date, email, password) VALUES ("${req.body.name}", "${req.body.surname}", "${now_date}","${req.body.email}", "${req.body.password}")`;
  result = await queryDB(sql);
  return res.redirect("login.html");
});

const checkEmailExisted = async (email) => {
  const sql = `SELECT * FROM userInfo WHERE email = '${email}'`;
  const result = await queryDB(sql);
  return result.length > 0;
}

// app.post("/profilepic", async (req, res) => {
//   let upload = multer({ storage: storage, fileFilter: imageFilter }).single(
//     "avatar"
//   );
//   upload(req, res, (err) => {
//     if (req.fileValidationError) {
//       return res.send(req.fileValidationError);
//     } else if (!req.file) {
//       return res.send("Please select an image to upload");
//     } else if (err instanceof multer.MulterError) {
//       return res.send(err);
//     } else if (err) {
//       return res.send(err);
//     }
//     updateImg(req.cookies.username, req.file.filename);
//     res.cookie("img", req.file.filename);
//     return res.redirect("feed.html");
//   });
// });

// const updateImg = async (username, filen) => {
//   let sql = `UPDATE userInfo SET img = '${filen}' WHERE username = '${username}'`;
//   let result = await queryDB(sql);
//   console.log(result);
// };

// app.get("/readPost", async (req, res) => {
//   let sql =
//     "CREATE TABLE IF NOT EXISTS userPost (username VARCHAR(255), post VARCHAR(500))";
//   let result = await queryDB(sql);
//   sql = `SELECT post, username FROM userPost`;
//   result = await queryDB(sql);
//   result = Object.assign({}, result);
//   console.log(result);
//   res.json(result);
// });

// app.post("/writePost", async (req, res) => {
//     let sql =
//     "CREATE TABLE IF NOT EXISTS userPost (username VARCHAR(255), post VARCHAR(500))";
//   let result = await queryDB(sql);
//   sql = `INSERT INTO userPost (username,post) VALUES ("${req.body.user}", "${req.body.message}")`;
//   result = await queryDB(sql);
//   res.redirect("feed.html");
// });

app.post("/checkLogin", async (req, res) => {
  let sql = `SELECT email, password, name FROM userInfo`; // เพิ่มการดึงค่าชื่อผู้ใช้จากฐานข้อมูล
  let result = await queryDB(sql);
  result = Object.assign({}, result);
  var keys = Object.keys(result);
  var IsCorrect = false;

  for (var numberOfKeys = 0; numberOfKeys < keys.length; numberOfKeys++) {
    if (
      req.body.email == result[keys[numberOfKeys]].email &&
      req.body.password == result[keys[numberOfKeys]].password
    ) {
      console.log("login successful");
      res.cookie("email", result[keys[numberOfKeys]].email);
      res.cookie("name", result[keys[numberOfKeys]].name); // ตั้งค่าคุกกี้ "name" ด้วยชื่อผู้ใช้
      IsCorrect = true;
      return res.redirect("index.html");
    }
  }

  if (IsCorrect == false) {
    console.log("login failed");
    return res.redirect("login.html?error=1");
  }
});

app.get("/logout", (req, res) => {
  res.clearCookie("email");
  return res.redirect("Preindex.html");
});

app.listen(port, hostname, () => {
  console.log(`Server running at  http://${hostname}:${port}/Preindex.html`);
});