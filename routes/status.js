// 실시간 작업 현황 출력파일
const  express = require('express');
const  ejs = require('ejs');
const  fs = require('fs');
const  router = express.Router();
var    loglevel = 1;


const  GetStatus = (req, res) => {   // 생산량 통계 화면을 출력합니다
let    htmlstream = '';
     logging(loglevel, 'GetStatus() 호출');

     htmlstream = fs.readFileSync(__dirname + '/../views/header.ejs','utf8');    // header
     htmlstream = htmlstream + fs.readFileSync(__dirname + '/../views/navbar.ejs','utf8');  // navbar
     htmlstream = htmlstream + fs.readFileSync(__dirname + '/../views/status.ejs','utf8'); // Content
     htmlstream = htmlstream + fs.readFileSync(__dirname + '/../views/footer.ejs','utf8');  // Footer
    
     res.writeHead(200, {'Content-Type':'text/html; charset=utf8'});
     res.end(ejs.render(htmlstream, { 'title' : '생산량 통계'}));

};

const logging = (level, logmsg) => {
       if (level != 0) {
         console.log(level, logmsg)
         loglevel++;
      }
}


router.get('/', GetStatus);
module.exports = router
