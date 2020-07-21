// 발주 확인 출력파일
// 날짜별로 들어온 발주 목록을 확인, 각 발주별 작업 현황 확인
// 새로 들어온 발주를 추가하여 생산 추가 기능 가능한 페이지

const express = require("express");
const ejs = require("ejs");
const fs = require("fs");
const router = express.Router();
var loglevel = 1;
let factorytime;
let factorystate;
let car = 0;

let waiting = new Array();
waiting[0] = 0;
let factory1 = [
  function press(value) {
    console.log(value + "번째 프레스 단계 진입 !! (1번째단계)");
    sleep(1000);
  },
  function bodyassembly(value) {
    console.log(value + "번째 차체조립 단계 진입 !! (2번째단계)");
    sleep(1000);
  },
  function coating(value) {
    console.log(value + "번째 도장 단계 진입 !! (3번째단계)");
    sleep(1000);
  },
  function design(value) {
    console.log(value + "번째 의장 단계 진입 !! (4번째단계)");
    sleep(1000);
  },
  function finaltest(value) {
    console.log(value + "번째 최종테스트 단계 진입 !! (5번째단계)");
    sleep(1000);
  },
  function casting(value) {
    console.log(value + "번째 주조 단계 진입 !! (6번째단계)");
    sleep(1000);
  },
  function forging(value) {
    console.log(value + "번째 단조 단계 진입 !! (7번째단계)");
    sleep(1000);
  },
  function sintering(value) {
    console.log(value + "번째 소결 단계 진입 !! (8번째단계)");
    sleep(1000);
  },
  function heattreatment(value) {
    console.log(value + "번째 열처리 단계 진입 !! (9번째단계)");
    sleep(1000);
  },
  function machining(value) {
    console.log(value + "번째 기계가공 단계 진입 !! (10번째단계)");
    sleep(1000);
  },
  function assemblyfixing(value) {
    console.log(value + "번째 조립고정 단계 진입 !! (11번째단계)");
    sleep(1000);
  },
  function complete(value) {
    console.log(value + "번째 차량 완성 !! ");
    sleep(1000);
  }
];

let factory2 = [
  function press(value) {
    console.log(value + "번째 프레스 단계 진입 !! (1번째단계)");
    sleep(1000);
  },
  function bodyassembly(value) {
    console.log(value + "번째 차체조립 단계 진입 !! (2번째단계)");
    sleep(1000);
  },
  function coating(value) {
    console.log(value + "번째 도장 단계 진입 !! (3번째단계)");
    sleep(1000);
  },
  function design(value) {
    console.log(value + "번째 의장 단계 진입 !! (4번째단계)");
    sleep(1000);
  },
  function finaltest(value) {
    console.log(value + "번째 최종테스트 단계 진입 !! (5번째단계)");
    sleep(1000);
  },
  function casting(value) {
    console.log(value + "번째 주조 단계 진입 !! (6번째단계)");
    sleep(1000);
  },
  function forging(value) {
    console.log(value + "번째 단조 단계 진입 !! (7번째단계)");
    sleep(1000);
  },
  function sintering(value) {
    console.log(value + "번째 소결 단계 진입 !! (8번째단계)");
    sleep(1000);
  },
  function heattreatment(value) {
    console.log(value + "번째 열처리 단계 진입 !! (9번째단계)");
    sleep(1000);
  },
  function machining(value) {
    console.log(value + "번째 기계가공 단계 진입 !! (10번째단계)");
    sleep(1000);
  },
  function assemblyfixing(value) {
    console.log(value + "번째 조립고정 단계 진입 !! (11번째단계)");
    sleep(1000);
  },
  function complete(value) {
    console.log(value + "번째 차량 완성 !! ");
    sleep(1000);
  }
];

let turn = 0;
let flag = 0;

//나중에 DB에서 받을 예정 !!
waiting = ["f1", "f2", "f3", "f4", "f5", "f6", "f7", "f8", "f9", "f10", "f11"];

const factorysystem = function() {
  let newwaiting = new Array();
  for (let i = 0; i < waiting.length; i++) {
    if (newwaiting[0] == 0) {
      newwaiting[0] = waiting[0];
    }else{
      for(let j=newwaiting.length;j<0;j--){
        if(j==11){
          continue;
        }else{
          newwaiting[j+1]=newwaiting[j];
        }
      }
      newwaiting[0] = waiting[i];
    }
    for(let p=0;p<newwaiting.length;p++){
      console.log(newwaiting[p]);
    }
    console.log("--------");
  }

  if (waiting[turn]) {
    //factory1[turn](waiting[turn]);
    //factory2[turn](waiting[turn]);
  }
  if (turn == 11) {
    turn = 0;
  } else {
    turn++;
  }

  factoryid = setTimeout(factorysystem, 10000);
};

function sleep(ms) {
  var ts2;
  var ts1 = new Date().getTime() + ms;
  do ts2 = new Date().getTime();
  while (ts2 < ts1);
}

//-----------------발주 현황----------------------------------------------------------------
const systemcontrolUI = (req, res) => {
  // 발주 현황 화면 출력
  let htmlstream = "";

  htmlstream = fs.readFileSync(__dirname + "/../views/header.ejs", "utf8"); // header
  htmlstream =
    htmlstream + fs.readFileSync(__dirname + "/../views/navbar.ejs", "utf8"); // navbar
  htmlstream =
    htmlstream + fs.readFileSync(__dirname + "/../views/system.ejs", "utf8"); // Content
  htmlstream =
    htmlstream + fs.readFileSync(__dirname + "/../views/footer.ejs", "utf8"); // Footer

  res.writeHead(200, { "Content-Type": "text/html; charset=utf8" });
  res.end(ejs.render(htmlstream, { title: "시스템 제어" }));
};

//----------------생산 추가 화면 출력-------------------------------------

const systemcontrol = (req, res) => {
  // 발주 현황 화면 출력
  let body = req.body;
  let msg = body.msg;
  let item = body.item;

  if (msg) {
    console.log("메시지 : " + msg);
    factory(msg);
  }
  if (item) {
    console.log("process 실행 !!");
    //process(car);
    //if (factorystate == 1) {
    factorysystem();
    // }else {
    //  console.log("공장이 가동중이지 않습니다.")
    // }
    car++;
  }

  res.redirect("/system");
};

const factory = msg => {
  if (msg == "startmsg") {
    console.log("공장 가동중...");
    factorystate = 1;
  }
  if (msg == "stopmsg") {
    console.log("공장 가동중지");
    factorystate = 0;
  }
};

router.get("/", systemcontrolUI);
router.post("/", systemcontrol);
//router.post("/add", addcontrol);

module.exports = router;
