/* 
  html, css, js, images, font, video 등의 
  사용되는 리소스가 모두 완료되고 나서 js가 실행되어야 정상적인 처리가 가능하다
*/
window.onload = function () {
  // 모달창 처리
  // let body = document.querySelector("body");
  // body.classList.add("modal-active");
  // let modal = document.querySelector(".modal");
  // modal.onclick = function () {
  //   body.classList.remove("modal-active");
  //   this.style.display = "none";
  // };

  /*// 위로 이동하기
  const goTop = document.querySelector(".gotop");
  // -> 바뀌지 않는 값은 const 사용
  goTop.addEventListener("click" , function(){
    // 클릭 시 화면 위로 이동
    window.scrollTo({
      top: 0,
      behavior: "smooth",
      // 속도 조절 및 애니메이팅 효과 커스텀 X
    });
  });*/
  // anime.js
  const goTop = document.querySelector(".gotop");
  const scrollElement =
    window.document.scrollingElement ||
    window.document.body ||
    window.document.documentElement;
  goTop.addEventListener("click", function () {
    anime({
      targets: scrollElement,
      scrollTop: 0,
      duration: 500,
      easing: "easeInOutQuad",
    });
  });

  // promotion Swiper

  // * json 데이터로 뽑아보기
  // 1. 백틱을 이용한 html 생성(.sw-promotion에 출력할 html생성)
  /*
  let swPromotionHtml = `
    <div class="swiper-slide">
      <a href="#">
        <img src="images/promotion1.jpg" alt="프로모션1" />
      </a>
    </div>
    <div class="swiper-slide">
      <a href="#">
        <img src="images/promotion2.png" alt="프로모션2" />
      </a>
    </div>
    <div class="swiper-slide">
      <a href="#">
        <img src="images/promotion3.jpg" alt="프로모션3" />
      </a>
    </div>
    <div class="swiper-slide">
      <a href="#">
        <img src="images/promotion4.jpg" alt="프로모션4" />
      </a>
    </div>
    <div class="swiper-slide">
      <a href="#">
        <img src="images/promotion5.jpg" alt="프로모션5" />
      </a>
    </div>
    <div class="swiper-slide">
      <a href="#">
        <img src="images/promotion6.jpg" alt="프로모션6" />
      </a>
    </div>
  `;
  */

  // prodata.json을 불러와서 배치한다.
  // XMLHttpRequest :외부데이터(json)을 불러들일 때 사용
  let data;
  const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function (event) {
    // 상태가 바뀌는 것을 감지할 준비가 되었다면 기능이 동작한다.
    // console.log(event);
    const req = event.target;
    // console.log(req);
    if (req.readyState === XMLHttpRequest.DONE) {
      // XMLHttpRequest.DONE : 자료를 다 불러 왔다면
      // console.log(req.response);

      /* 
      현재 전달된 문자들은 json이 아니다.
      req.response의 데이터 타입은 문자열이다.
      그렇기 때문에 문자열을 json 객체로 변경하는 작업이 필요하다.
      */
      // let jData = JSON.parse(req.response);
      // json으로 해석

      data = JSON.parse(req.response);
      // 자료가 들어오기 전에 실행되는 현상이 발생
      // -> 내가 원하는 시점에 기능이 동작되어야 함(함수)
      makePromotionSlide();
    }
  };
  xhttp.open("GET", "data/prodata.json");
  // GET 방식(HTTP로 가져옴)으로 prodata.json를 오픈한다.
  xhttp.send();

  function makePromotionSlide() {
    // 자료가 들어오면 실행
    let swPromotionHtml = ``;
    // 1-2. for문을 이용한 html 데이터 생성
    for (let i = 0; i < data.good_count; i++) {
      let obj = data[`good_${i + 1}`];
      //good_1, good_2, good_3 ...

      // let imgName = obj.img;

      // let imgName = `promotion${i + 1}.jpg`;
      // if (i === 1) {
      //   imgName = `promotion${i + 1}.png`;
      // }
      let html = `
        <div class="swiper-slide">
          <a href="${obj.link}">
            <img src="images/${obj.img}" alt="프로모션${obj.name}" />
          </a>
        </div>
      `;
      // swPromotionHtml = swPromotionHtml + html;
      // 아래의 방법으로도 사용할 수 있다.
      swPromotionHtml += html;
    }
    // 위 백틱의 내용을 넣어줄 장소를 저장
    let swPromotionWrapper = document.querySelector(
      ".sw-promotion .swiper-wrapper"
    );
    swPromotionWrapper.innerHTML = swPromotionHtml;

    let promotionSwiper = new Swiper(".sw-promotion", {
      slidesPerView: 1,
      spaceBetween: 24,
      speed: 1000,
      loop: true,
      autoplay: {
        delay: 2500,
        disableOnInteraction: false,
      },
      navigation: {
        nextEl: ".promotion .sw-next",
        prevEl: ".promotion .sw-prev",
      },
      pagination: {
        el: ".sw-promotion-pg",
        clickable: true,
      },
      breakpoints: {
        760: {
          slidesPerView: 2,
        },
      },
    });
  }

  // let data = jData;
  // jData는 function 안에 있기 때문에 렉시컬 스코프로 인해 js가 찾지 못한다.

  // let data = {
  //   good_1: { name: "제품1", img: "promotion1.jpg", link: "" },
  //   good_2: { name: "제품2", img: "promotion2.png", link: "" },
  //   good_3: { name: "제품3", img: "promotion3.jpg", link: "" },
  //   good_4: { name: "제품4", img: "promotion4.jpg", link: "" },
  //   good_5: { name: "제품5", img: "promotion5.jpg", link: "" },
  //   good_6: { name: "제품6", img: "promotion6.jpg", link: "" },
  // };
};
