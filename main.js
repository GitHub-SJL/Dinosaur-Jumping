const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight - 100;

ctx.fillStyle = "green";

const img1 = new Image();
img1.src = "cactus.png";
const img2 = new Image();
img2.src = "dinosaur.png";

// 등장 캐릭터의 속성부터 object 자료에 정리
const dino = {
  x: 10,
  y: 200,
  width: 50,
  height: 50,
  draw() {
    // ctx.fillStyle = "green";
    // ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.drawImage(img2, this.x, this.y, this.width, this.height);
  },
};

dino.draw();

// 장애물도 object자료에 정리해두면 편리
// 장애물은 각각 높이, 넓이가 다를수도 있으므로 비슷한 object가 많이필요
// 그래서 클래스로 생성

class Cactus {
  constructor() {
    this.x = 500;
    this.y = 200;
    this.width = 30;
    this.height = 30;
  }
  draw() {
    // ctx.fillStyle = "red";
    // ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.drawImage(img1, this.x, this.y, this.width, this.height);
  }
}

const cactus = new Cactus();

cactus.draw();

// 애니메이션 만들려면 1초에 60번 x++ 해줘야함

let timer = 0;
let cacus여러개 = [];
let 점프timer = 0;
var animation;

const 프레임마다실행할것 = () => {
  animation = requestAnimationFrame(프레임마다실행할것);
  timer++;
  // 기존에 남아있는 이미지를 초기화시켜서 이동하는것을 보여줌
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // 캐릭터는 가만히 있고, 장애물들이 다가오도록 만들기
  // 2~3초에 한번씩 보여주도록 하기
  // 게임은 항상 프레임으로 움직인다.
  if (timer % 200 === 0) {
    // 장애물을 여러개 관리하려면 배열에 추가하기
    const cactus = new Cactus();
    cacus여러개.push(cactus);
  }
  cacus여러개.forEach((a, i, o) => {
    // 필요없어진 장애물 제거
    // x좌표가 0미만이면 제거
    if (a.x < 0) {
      // o가 배열
      o.splice(i, 1);
    }

    a.x--;
    // 캐릭터와 모든 장애물 충돌체크하기 위해 forEach에 넣기
    충돌여부(dino, a);
    a.draw();
  });

  if (점프중 == true) {
    dino.y--;
    점프timer++;
  }

  if (점프중 == false) {
    // 점프 눌렀을때의 y높이를 정해두고 그 이상으로 ++금지
    if (dino.y < 200) {
      dino.y++;
    }
  }

  // 100프레임 지나면 dino.y-- 점프 중지
  if (점프timer > 100) {
    점프중 = false;
    점프timer = 0;
  }

  dino.draw();
};
프레임마다실행할것();

// 충돌체크하기
const 충돌여부 = (dino, cactus) => {
  var x축차이 = cactus.x - (dino.x + dino.width);
  var y축차이 = cactus.y - (dino.y + dino.height);
  if (x축차이 < 0 && y축차이 < 0) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    cancelAnimationFrame(animation);
  }
};

// 스페이스바 누르면 점프
var 점프중 = false;
document.addEventListener("keydown", (e) => {
  if (e.code === "Space") {
    점프중 = true;
  }
});
