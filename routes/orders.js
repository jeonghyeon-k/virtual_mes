// 발주 확인 출력파일
// 날짜별로 들어온 발주 목록을 확인, 각 발주별 작업 현황 확인 
// 새로 들어온 발주를 추가하여 생산 추가 기능 가능한 페이지

const express = require('express');
const ejs = require('ejs');
const fs = require('fs');
const router = express.Router();
const bodyParser = require('body-parser');
const url = require('url');
var loglevel = 1;

const mysql = require('mysql');

const db = mysql.createConnection({
     host: 'localhost',        // DB서버 IP주소
     port: 3306,               // DB서버 Port주소
     user: 'root',            // DB접속 아이디
     password: 'gachon654321',  // DB암호
     database: 'bridge'         //사용할 DB명
});

//-----------------발주 현황----------------------------------------------------------------
const GetOrder = (req, res) => {   // 발주 현황 화면 출력
     let htmlstream = '';
     let htmlstream2 = '';
     let sql_str;
     var page = req.params.page;
     if (req.session.auth) {  //로그인 된 상태에서만 발주목록 조회 가능
          logging(loglevel, '  GetOrder() 호출 ');

          htmlstream = fs.readFileSync(__dirname + '/../views/header.ejs', 'utf8');    // header
          htmlstream = htmlstream + fs.readFileSync(__dirname + '/../views/navbar.ejs', 'utf8');  // navbar
          htmlstream = htmlstream + fs.readFileSync(__dirname + '/../views/orders.ejs', 'utf8'); // Content
          htmlstream = htmlstream + fs.readFileSync(__dirname + '/../views/footer.ejs', 'utf8');  // Footer

          sql_str = " select * from orders"; // 발주조회SQL

          res.writeHead(200, { 'Content-Type': 'text/html; charset=utf8' });

          db.query(sql_str, (error, results, fields) => {  // 발주조회 SQL실행
               if (error) { res.status(562).end("DB query is failed"); }
               else if (results.length <= 0) {  // 조회된 발주가 없다면, 오류메시지 출력
                    htmlstream2 = fs.readFileSync(__dirname + '/../views/alert.ejs', 'utf8');
                    res.status(562).end(ejs.render(htmlstream2, {
                         'title': '알리미',
                         'warn_title': '발주목록조회 오류',
                         'warn_message': '발주 목록이 존재하지 않습니다.',
                         'return_url': '/'
                    }));
               }
               else {  // 조회된 발주가 있다면, 발주리스트를 출력


                    res.end(ejs.render(htmlstream, {
                         'title': '발주 목록',
                         'loglabel': "로그아웃",
                         'logurl': '/users/logout',
                         length: results.length - 1,
                         page: page,
                         previous: Number(page) - 1,
                         next: Number(page) + 1,
                         page_num: 5,
                         orderdata: results

                    }));


               } // else
          }); // db.query()


     } //if
     else { //로그인 되지 않은 상태에서 조회 불가능
          htmlstream = fs.readFileSync(__dirname + '/../views/alert.ejs', 'utf8');
          res.status(562).end(ejs.render(htmlstream, {
               'warn_title': '비회원',
               'warn_message': '로그인 후 이용 가능합니다.',
               'return_url': '/'
          }));

     }




};

const logging = (level, logmsg) => {
     if (level != 0) {
          console.log(level, logmsg)
          loglevel++;
     }
}

//----------------생산 추가 화면 출력-------------------------------------

const GetNewOrder = (req, res) => {   // 발주 현황 화면 출력
     let htmlstream = '';



     logging(loglevel, '  GetOrder() 호출 ');

     htmlstream = fs.readFileSync(__dirname + '/../views/header.ejs', 'utf8');    // header
     htmlstream = htmlstream + fs.readFileSync(__dirname + '/../views/navbar.ejs', 'utf8');  // navbar
     htmlstream = htmlstream + fs.readFileSync(__dirname + '/../views/newOrder.ejs', 'utf8'); // Content
     htmlstream = htmlstream + fs.readFileSync(__dirname + '/../views/footer.ejs', 'utf8');  // Footer



     res.writeHead(200, { 'Content-Type': 'text/html; charset=utf8' });
     res.end(ejs.render(htmlstream, { 'title': '생산 추가','loglabel': "로그아웃",
     'logurl': '/users/logout' }));

};

const testDB = (req, res) => {
     let body = req.body;
     let htmlstream = '';

     db.query('INSERT INTO test2 (name, amount) VALUES (?,?)', [body.cars, body.amount], (error, results, fields) => {
          if (error) {
               console.log(error);
               htmlstream = fs.readFileSync(__dirname + '/../views/alert.ejs', 'utf8');
               res.status(562).end(ejs.render(htmlstream, {
                    'title': '알리미',
                    'warn_title': '회원가입 오류',
                    'warn_message': '이미 회원으로 등록되어 있습니다. 바로 로그인을 하시기 바랍니다.',
                    'return_url': '/'
               }));
          } else {
               console.log("회원가입에 성공하였으며, DB에 신규회원으로 등록하였습니다.!");
               res.redirect('/');
          }
     });

}


router.get('/list/:page', GetOrder);
router.get('/neworder', GetNewOrder);
router.post('/neworder', testDB);
module.exports = router
