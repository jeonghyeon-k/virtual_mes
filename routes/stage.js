// 실시간 작업 현황 출력파일
// 메인으로 출력, 현재 진행중인 작업들 현황을 확인하는 페이지


const  express = require('express');
const  ejs = require('ejs');
const  fs = require('fs');
const  router = express.Router();
var    loglevel = 1;


//-----------------작업 현황----------------------------------------------------------------
const  GetStage = (req, res) => {   // 현재 작업 현황 화면 출력
let    htmlstream = '';
     logging(loglevel, 'GetStage() 호출');

     htmlstream = fs.readFileSync(__dirname + '/../views/header.ejs','utf8');    // header
     htmlstream = htmlstream + fs.readFileSync(__dirname + '/../views/navbar.ejs','utf8');  // navbar
     htmlstream = htmlstream + fs.readFileSync(__dirname + '/../views/stage.ejs','utf8'); // Content
     htmlstream = htmlstream + fs.readFileSync(__dirname + '/../views/footer.ejs','utf8');  // Footer
    
     res.writeHead(200, {'Content-Type':'text/html; charset=utf8'});
     var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1;
    var yyyy = today.getFullYear();
    
    if(dd < 10) {
        dd ='0' + dd
    } 
    
    else if(mm < 10) {
        mm = '0' + mm
    } 
    
    today = yyyy + '-' + mm + '-' + dd;
     res.end(ejs.render(htmlstream, { 'title' : '실시간 작업 현황','today': today}));

};

const logging = (level, logmsg) => {
       if (level != 0) {
         console.log(level, logmsg)
         loglevel++;
      }
}


router.get('/', GetStage);
module.exports = router
