const  express = require('express');
const  ejs = require('ejs');
const  fs = require('fs');
const  router = express.Router();
const   bodyParser = require('body-parser');
const   url = require('url');
var    loglevel = 1;

const   mysql = require('mysql');

const   db = mysql.createConnection({
     host: 'localhost',        // DB서버 IP주소
     port: 3306,               // DB서버 Port주소
     user: 'root',            // DB접속 아이디
     password: 'gachon654321',  // DB암호
     database: 'bridge'         //사용할 DB명
 });



 const GetMain = (req, res) => {
    let htmlstream = '';
    let htmlstream2 = '';
    let sql_str;
    var page = req.params.page;
    logging(loglevel, 'GetStep() 호출');

    htmlstream = fs.readFileSync(__dirname + '/../views/header.ejs', 'utf8');    // header
    htmlstream = htmlstream + fs.readFileSync(__dirname + '/../views/navbar.ejs', 'utf8');  // navbar

    if(req.session.auth){
        htmlstream = htmlstream + fs.readFileSync(__dirname + '/../views/main.ejs','utf8');  
    }
    else{
        htmlstream = htmlstream + fs.readFileSync(__dirname + '/../views/login.ejs','utf8'); 
    }
    htmlstream = htmlstream + fs.readFileSync(__dirname + '/../views/footer.ejs','utf8');  // Footer

    sql_str = "select * from step order by orderidx desc limit 5;";
    res.writeHead(200, {'Content-Type':'text/html; charset=utf8'});

    if(req.session.auth){  //로그인 되어 있다면 현재 작업 현황 5개 노출


        db.query(sql_str, (error, results, fields) => {  // 작업 현황 조회 SQL실행
            if (error) { res.status(562).end("DB query is failed"); }
            else {  // 조회된 현재 작업 현황이 있다면, 현재 작업 현황 리스트를 출력
    
                var today = new Date();
                var dd = today.getDate();
                var mm = today.getMonth() + 1;
                var yyyy = today.getFullYear();
    
                if (dd < 10) {
                    dd = '0' + dd
                }
    
                else if (mm < 10) {
                    mm = '0' + mm
                }
    
                today = yyyy + '-' + mm + '-' + dd;
    
    
                res.end(ejs.render(htmlstream, {
                    'title': '실시간 작업 현황',
                    'logurl': '/users/logout',
                    'loglabel': "로그아웃",
                    today: today,
                    stepdata: results
    
    
                }));
    
    
            } // else
        }); // db.query()
    }  //if 로그인 된 상태

    else { //로그인 안된 상태

        res.end(ejs.render(htmlstream, {
            'title': '생산 관리 시스템',
            'logurl': '/',
            'loglabel': "로그인"
        }));
    }

 }

 const logging = (level, logmsg) => {
    if (level != 0) {
      console.log(level, logmsg)
      loglevel++;
   }
}

 // ‘/’ get 메소드의 핸들러를 정의
router.get('/', GetMain);

// 외부로 뺍니다.
module.exports = router