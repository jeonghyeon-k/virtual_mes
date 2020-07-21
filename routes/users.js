const   fs = require('fs');
const   express = require('express');
const   ejs = require('ejs');
const   mysql = require('mysql');
const   bodyParser = require('body-parser');
const   session = require('express-session');
const   router = express.Router();
const   url = require('url');

router.use(bodyParser.urlencoded({ extended: false }));

const   db = mysql.createConnection({
    host: 'localhost',        // DB서버 IP주소
     port: 3306,               // DB서버 Port주소
     user: 'root',            // DB접속 아이디
     password: 'gachon654321',  // DB암호
     database: 'gbridge'         //사용할 DB명
});



// 로그인 기능-----------------------------------------------------
const HandleLogin = (req, res) => {
    let body = req.body;
    let userid, userpass, username;
    let sql_str;
    let htmlstream = '';

  
        console.log('로그인 입력정보: %s, %s', body.uid, body.pass);
        if (body.uid == '' || body.pass == '') {
           console.log("아이디나 암호가 입력되지 않아서 로그인할 수 없습니다.");
           htmlstream = fs.readFileSync(__dirname + '/../views/alert.ejs','utf8');
           res.status(562).end(ejs.render(htmlstream, { 'title': '알리미',
                              'warn_title':'로그인 오류',
                              'warn_message':'아이디나 비밀번호를 전부 입력하세요.',
                              'return_url':'/' }));
        }
        else {
  
          db.query("SELECT id, pass, name from users where id ='"+ body.uid +"';", (error, results, fields) =>{
            if (error) { res.status(562).end("Fail as No id in DB!"); 
            console.log(error);
        }
            else { //입력된 아이디의 비밀번호 조회 성공
  
  
              if (results.length <= 0) {  // select 조회결과가 없는 경우 (즉, 등록계정이 없는 경우)
                    htmlstream = fs.readFileSync(__dirname + '/../views/alert.ejs','utf8');
                    res.status(562).end(ejs.render(htmlstream, { 'title': '알리미',
                                       'warn_title':'로그인 오류',
                                       'warn_message':'등록된 계정이 없습니다.',
                                       'return_url':'/' }));
               } else {
                 results.forEach((item, index) => {
  
                    userid = item.id;  username = item.name; userpass = item.pass;
                    console.log("아이디: "+ userid+ "비번: "+ userpass);

                    if (body.uid == userid && body.pass == userpass) {
                       req.session.auth = 99;      // 임의로 수(99)로 로그인성공했다는 것을 설정함
                       req.session.who = username; // 인증된 사용자명 확보 (로그인후 이름출력용)
                       req.session.loginId = userid;  // 인증된 아이디 확보
                       res.redirect('/');
                    } else {
                      htmlstream = fs.readFileSync(__dirname + '/../views/alert.ejs','utf8');
                      res.status(562).end(ejs.render(htmlstream, { 'title': '알리미',
                                         'warn_title':'로그인 오류',
                                         'warn_message':'등록된 계정이나 암호가 틀립니다.',
                                         'return_url':'/' }));
                    }
                  }); /* foreach */
               }
            }
          });
  
  
  
     }
  }


  //로그아웃------------------------------
  
const HandleLogout = (req, res) => {
  req.session.destroy();     
  res.redirect('/');        
}



  
  
  router.get('/logout', HandleLogout);       // 로그아웃 기능
  router.post('/auth', HandleLogin);     // 로그인 정보로 인증처리
  module.exports = router;