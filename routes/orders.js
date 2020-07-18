// 발주 확인 출력파일
// 날짜별로 들어온 발주 목록을 확인, 각 발주별 작업 현황 확인 
// 새로 들어온 발주를 추가하여 생산 추가 기능 가능한 페이지

const  express = require('express');
const  ejs = require('ejs');
const  fs = require('fs');
const  router = express.Router();
var    loglevel = 1;

//-----------------발주 현황----------------------------------------------------------------
const  GetOrder = (req, res) => {   // 발주 현황 화면 출력
let    htmlstream = '';
     logging(loglevel, '  GetOrder() 호출 ');

     htmlstream = fs.readFileSync(__dirname + '/../views/header.ejs','utf8');    // header
     htmlstream = htmlstream + fs.readFileSync(__dirname + '/../views/navbar.ejs','utf8');  // navbar
     htmlstream = htmlstream + fs.readFileSync(__dirname + '/../views/orders.ejs','utf8'); // Content
     htmlstream = htmlstream + fs.readFileSync(__dirname + '/../views/footer.ejs','utf8');  // Footer
    
     res.writeHead(200, {'Content-Type':'text/html; charset=utf8'});
     res.end(ejs.render(htmlstream, { 'title' : '발주 확인'}));

};

const logging = (level, logmsg) => {
       if (level != 0) {
         console.log(level, logmsg)
         loglevel++;
      }
}

//----------------생산 추가 화면 출력-------------------------------------

const  GetNewOrder = (req, res) => {   // 발주 현황 화면 출력
  let    htmlstream = '';
       logging(loglevel, '  GetOrder() 호출 ');
  
       htmlstream = fs.readFileSync(__dirname + '/../views/header.ejs','utf8');    // header
       htmlstream = htmlstream + fs.readFileSync(__dirname + '/../views/navbar.ejs','utf8');  // navbar
       htmlstream = htmlstream + fs.readFileSync(__dirname + '/../views/newOrder.ejs','utf8'); // Content
       htmlstream = htmlstream + fs.readFileSync(__dirname + '/../views/footer.ejs','utf8');  // Footer
      
       res.writeHead(200, {'Content-Type':'text/html; charset=utf8'});
       res.end(ejs.render(htmlstream, { 'title' : '발주 확인'}));
  
  };
  

router.get('/', GetOrder);
router.get('/neworder', GetNewOrder);
router.post('/neworder', GetNewOrder);
module.exports = router
