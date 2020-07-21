// 실시간 작업 현황 출력파일
const express = require('express');
const ejs = require('ejs');
const fs = require('fs');
const router = express.Router()
var loglevel = 1;
const mysql = require('mysql');

const db = mysql.createConnection({
     host: 'localhost',        // DB서버 IP주소
     port: 3306,               // DB서버 Port주소
     user: 'root',            // DB접속 아이디
     password: 'gachon654321',  // DB암호
     database: 'bridge'         //사용할 DB명
});



const GetStatus = (req, res) => {   // 생산량 통계 화면을 출력합니다
     let htmlstream = '';

     if (req.session.auth) {  //로그인 된 상태에서만 발주목록 조회 가능
          logging(loglevel, 'GetStatus() 호출');

     htmlstream = fs.readFileSync(__dirname + '/../views/header.ejs', 'utf8');    // header
     htmlstream = htmlstream + fs.readFileSync(__dirname + '/../views/navbar.ejs', 'utf8');  // navbar
     htmlstream = htmlstream + fs.readFileSync(__dirname + '/../views/status.ejs', 'utf8'); // Content
     htmlstream = htmlstream + fs.readFileSync(__dirname + '/../views/footer.ejs', 'utf8');  // Footer

     res.writeHead(200, { 'Content-Type': 'text/html; charset=utf8' });
     res.end(ejs.render(htmlstream, {
          'title': '생산량 통계',
          'logurl': '/users/logout',
          'loglabel': "로그아웃"
     }));
     }
     else { //로그인 되지 않은 상태에서 조회 불가능

     htmlstream = fs.readFileSync(__dirname + '/../views/alert.ejs','utf8');
     res.status(562).end(ejs.render(htmlstream, {
                        'warn_title':'비회원',
                        'warn_message':'로그인 후 이용 가능합니다.',
                        'return_url':'/' }));
     }
     

};

const logging = (level, logmsg) => {
     if (level != 0) {
          console.log(level, logmsg)
          loglevel++;
     }
}


router.get('/', GetStatus);
module.exports = router
