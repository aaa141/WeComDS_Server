const fs = require('fs'); 
const data = fs.readFileSync('./database.json');
const conf = JSON.parse(data); 
const mysql = require('mysql'); 

const connection = mysql.createConnection({
  host: conf.host,

  user: conf.user,

  password: conf.password,

  port: conf.port,

  database: conf.database

})

connection.connect();

/* 로그인 */

/* 회원가입 */
exports.register = (req, res) =>{
  console.log('register')

  const user_name = req.body.user_name;
  const user_email = req.body.user_email;
  const user_pw = req.body.user_pw;
  const user_card = req.body.user_card;
  const user_check = req.body.user_check;

  let params = [user_name, user_email, user_pw, user_card, user_check];
  let sql = 'INSERT INTO user(user_name, user_email, user_pw, user_card, user_check) VALUES (?, ?, ?, ?, ?);';

  connection.query(sql, params,

    (err, rows, fields) => {
      console.log(err);
      if(err){  // 회원가입 실패
        console.log('register err')
        res.send(rows)

      }else{    // 회원가입 성공
        console.log('register success')
        res.send(rows)
      }
    }
  )
}