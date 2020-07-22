const express = require("express");
const ejs = require("ejs");
const fs = require("fs");
const router = express.Router();

const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost", // DB서버 IP주소
  port: 3306, // DB서버 Port주소
  user: "root", // DB접속 아이디
  password: "gachon654321", // DB암호
  database: "bridge" //사용할 DB명
});

/**
 * factory1 ,factory2 리스트
 * -> index별 각 단계 함수들이 들어있음
 * -> 예) factory1[0] : 1단계 함수 , factory1[1] : 2단계 함수,factory1[2] : 3단계 함수
 */
let factory1 = [
  function press(value) {
    console.log(value + " 차량 프레스 단계 진입 !! (1번째단계)");
  },
  function bodyassembly(value) {
    console.log(value + "차량 차체조립 단계 진입 !! (2번째단계)");
  },
  function coating(value) {
    console.log(value + " 차량 도장 단계 진입 !! (3번째단계)");
  },
  function design(value) {
    console.log(value + " 차량 의장 단계 진입 !! (4번째단계)");
  },
  function finaltest(value) {
    console.log(value + " 차량 최종테스트 단계 진입 !! (5번째단계)");
  },
  function casting(value) {
    console.log(value + " 차량 주조 단계 진입 !! (6번째단계)");
  },
  function forging(value) {
    console.log(value + " 차량 단조 단계 진입 !! (7번째단계)");
  },
  function sintering(value) {
    console.log(value + " 차량 소결 단계 진입 !! (8번째단계)");
  },
  function heattreatment(value) {
    console.log(value + " 차량 열처리 단계 진입 !! (9번째단계)");
  },
  function machining(value) {
    console.log(value + " 차량 기계가공 단계 진입 !! (10번째단계)");
  },
  function assemblyfixing(value) {
    console.log(value + " 차량 조립고정 단계 진입 !! (11번째단계)");
  },
  function complete(value) {
    console.log(value + " 차량 완성 !! ");
  }
];

let factory2 = [
  function press(value) {
    console.log(value + " 차량 프레스 단계 진입 !! (1번째단계)");
  },
  function bodyassembly(value) {
    console.log(value + " 차량 차체조립 단계 진입 !! (2번째단계)");
  },
  function coating(value) {
    console.log(value + " 차량 도장 단계 진입 !! (3번째단계)");
  },
  function design(value) {
    console.log(value + " 차량 의장 단계 진입 !! (4번째단계)");
  },
  function finaltest(value) {
    console.log(value + " 차량 최종테스트 단계 진입 !! (5번째단계)");
  },
  function casting(value) {
    console.log(value + " 차량 주조 단계 진입 !! (6번째단계)");
  },
  function forging(value) {
    console.log(value + " 차량 단조 단계 진입 !! (7번째단계)");
  },
  function sintering(value) {
    console.log(value + " 차량 소결 단계 진입 !! (8번째단계)");
  },
  function heattreatment(value) {
    console.log(value + " 차량 열처리 단계 진입 !! (9번째단계)");
  },
  function machining(value) {
    console.log(value + " 차량 기계가공 단계 진입 !! (10번째단계)");
  },
  function assemblyfixing(value) {
    console.log(value + " 차량 조립고정 단계 진입 !! (11번째단계)");
  },
  function complete(value) {
    console.log(value + " 차량 차량 완성 !! ");
  }
];

let turn = 0;


//나중에 DB에서 받을 예정 !!
let waiting = new Array();
waiting = ["f1", "f2", "f3", "f4", "f5", "f6", "f7", "f8", "f9", "f10"];

let factory1state = new Array();
let factory2state = new Array();
factory1state[0] = "";
factory2state[0] = "";
const factorysystem = function() {
  /**
   * factorysystem() : 대기 리스트에 있는 상품하나를 비어있는 공정에 넣어주는 함수 재귀로 리스트 전체 탐색
   * turn : waiting을 찾는 index 번호
   * factory1state : 공정1에서 돌아가고 있는 상품 리스트
   * factory2state : 공정2에서 돌아가고 있는 상품 리스트
   */

  if (turn % 2 == 0) {
    console.log("공정 1 작동 !!")
    let temp = waiting[turn];
    factory1state.unshift(temp);
    // 리스트들에 맞는 단계 실행
    for (let i = 0; i < factory1state.length-1&&i<12; i++) {
      factory1[i](factory1state[i]);
    }
    //factory1state[0] == "";
  } else {
    console.log("공정 2 작동 !!")
    let temp = waiting[turn];
    factory2state.unshift(temp);
    // 리스트들에 맞는 단계 실행
    for (let j = 0; j < factory2state.length-1&&j<12; j++) {
      factory2[j](factory2state[j]);
    }
    sleep(5000);
    //factory2state[0] == "";
  }

  if(factory1state.length == 12){
    factory1state[11] = "";

  }
  if(factory2state.length == 12){
    factory2state[11] = "";
  }

  // turn index 다시 0으로 설정하면서 처음부터 찾기
  if (turn == 9) {
    // 여기서 waiting리스트 DB에서 다시 업데이트 !!
    // factory state clear;
    turn = 0;
  } else {
    turn++;
  }
  console.log("turn : "+turn)
  console.log("-----");
  
  factoryid = setTimeout(factorysystem, 1);
};

//타이머 함수
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
  res.end(
    ejs.render(htmlstream, {
      title: "시스템 제어",
      loglabel: "로그아웃",
      logurl: "/users/logout"
    })
  );
};

//----------------시스템 제어 버튼 입력시 실행-------------------------------------

const systemcontrol = (req, res) => {
  let body = req.body;
  let msg = body.msg;
  let item = body.item;

  if (msg) {
    console.log("메시지 : " + msg);
    factory(msg);
  }
  if (item) {
    console.log("process 실행 !!");
    // 공장이 가동 중이어야 생산 할수 있게 하는 것 !! 나중에 주석 제거

    //if (factorystate == 1) {
    factorysystem();
    // }else {
    //  console.log("공장이 가동중이지 않습니다.")
    // }
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

module.exports = router;
