// 실시간 작업 현황 출력파일
// 메인으로 출력, 현재 진행중인 작업들 현황을 확인하는 페이지


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
     database: 'gbridge'         //사용할 DB명
 });


//-----------------작업 현황----------------------------------------------------------------
const GetStep = (req, res) => {   // 현재 작업 현황 화면 출력
    let htmlstream = '';
    let htmlstream2 = '';
    let sql_str;
    var page = req.params.page;
    logging(loglevel, 'GetStep() 호출');
    if (req.session.auth) {  //로그인 된 상태에서만 발주목록 조회 가능
        htmlstream = fs.readFileSync(__dirname + '/../views/header.ejs', 'utf8');    // header
    htmlstream = htmlstream + fs.readFileSync(__dirname + '/../views/navbar.ejs', 'utf8');  // navbar
    htmlstream = htmlstream + fs.readFileSync(__dirname + '/../views/step.ejs', 'utf8'); // Content
    htmlstream = htmlstream + fs.readFileSync(__dirname + '/../views/footer.ejs', 'utf8');  // Footer

    sql_str = " select * from step order by stepidx desc; "; // 작업 현황 조회SQL

    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf8' });

    db.query(sql_str, (error, results, fields) => {  // 작업 현황 조회 SQL실행
        if (error) { res.status(562).end("DB query is failed"); }
        else if (results.length <= 0) {  // 조회된 작업 현황 목록이 없다면, 오류메시지 출력
            htmlstream2 = fs.readFileSync(__dirname + '/../views/alert.ejs', 'utf8');
            res.status(562).end(ejs.render(htmlstream2, {
                'title': '알리미',
                'warn_title': '현재 작업 현황 목록조회 오류',
                'warn_message': '현재 작업 현황 목록이 존재하지 않습니다.',
                'return_url': '/'
            }));
        }
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
                'loglabel': "로그아웃",
                'logurl': '/users/logout',
                today: today,
                length: results.length - 1,
                page: page,
                previous: Number(page) - 1,
                next: Number(page) + 1,
                page_num: 5,
                stepdata: results


            }));


        } // else
    }); // db.query()
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


router.get('/list/:page', GetStep);
module.exports = router
