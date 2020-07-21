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
    process(car);
    car++;
  }
  res.redirect("/system");
};

const factory = msg => {
  if (msg == "startmsg") {
    factorysystem();
  }
  if (msg == "stopmsg") {
    console.log("공장 가동중지");
    factorystate = 0;
    //clearTimeout(factorytime);
  }
};

const factorysystem = function() {
  console.log("공장 가동중...");
  factorystate = 1;

  //process();
  //factorytime = setTimeout(factorysystem, 3000);
};

const process = function(car) {
  /**
   *  DB에 추가하기 !!
   */
  let state = true;
  if (factorystate == 1) {
    while (state) {
      let flag = 0;
      switch (flag) {
        case 0:
          press(car);
          flag = 1;
        case 1:
          bodyassembly(car);
          flag = 2;
        case 2:
          coating(car);
          flag = 3;
        case 3:
          design(car);
          flag = 4;
        case 4:
          finaltest(car);
          flag = 5;
        case 5:
          casting(car);
          flag = 6;
        case 6:
          forging(car);
          flag = 7;
        case 7:
          sintering(car);
          flag = 8;
        case 8:
          heattreatment(car);
          flag = 9;
        case 9:
          machining(car);
          flag = 10;
        case 10:
          assemblyfixing(car);
          flag = 11;
        case 11:
          complete(car);
          state = false;
      }
    }
  } else {
    console.log("공장이 작동중이 아닙니다.");
  }
  //timeid = setTimeout(process, 1000);
};
//프레스
const press = function(car) {
  console.log(car + "번째 프레스 단계 진입 !! (1번째단계) ");
  sleep(1000);
};
//차체조립
const bodyassembly = function(car) {
  console.log(car + "번째 차체조립 단계 진입 !! (2번째단계)");
  sleep(1000);
};
//도장
const coating = function(car) {
  console.log(car + "번째 도장 단계 진입 !! (3번째단계)");
  sleep(1000);
};
//의장
const design = function(car) {
  console.log(car + "번째 의장 단계 진입 !! (4번째단계)");
  sleep(1000);
};
//최종테스트
const finaltest = function(car) {
  console.log(car + "번째 최종테스트 단계 진입 !! (5번째단계)");
  sleep(1000);
};
//주조
const casting = function(car) {
  console.log(car + "번째 주조 단계 진입 !! (6번째단계)");
  sleep(1000);
};
//단조
const forging = function(car) {
  console.log(car + "번째 단조 단계 진입 !! (7번째단계)");
  sleep(1000);
};
//소결
const sintering = function(car) {
  console.log(car + "번째 소결 단계 진입 !! (8번째단계)");
  sleep(1000);
};
//열처리
const heattreatment = function(car) {
  console.log(car + "번째 열처리 단계 진입 !! (9번째단계)");
  sleep(1000);
};
//기계가공
const machining = function(car) {
  console.log(car + "번째 기계가공 단계 진입 !! (10번째단계)");
  sleep(1000);
};
//조립고정
const assemblyfixing = function(car) {
  console.log(car + "번째 조립고정 단계 진입 !! (11번째단계)");
  sleep(1000);
};
//완성
const complete = function(car) {
  console.log(car + "번째 완성 단계 진입 !! ");
};

router.get("/", systemcontrolUI);
router.post("/", systemcontrol);
//router.post("/add", addcontrol);

module.exports = router;
