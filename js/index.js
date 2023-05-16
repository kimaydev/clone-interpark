/* 
  html, css, js, images, font, video 등의 
  사용되는 리소스가 모두 완료되고 나서 js가 실행되어야 정상적인 처리가 가능하다
*/
window.onload = function () {
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
  xhttp.open("GET", "prodata.json");
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

  // Shopping Swiper

  let shoppingData;
  const shopXhttp = new XMLHttpRequest();
  shopXhttp.onreadystatechange = function (event) {
    let req = event.target;
    if (req.readyState === XMLHttpRequest.DONE) {
      shoppingData = JSON.parse(req.response);
      makeShoppingSlide();
    }
  };
  shopXhttp.open("GET", "shoppingdata.json");
  shopXhttp.send();
  function makeShoppingSlide() {
    let swShoppingHtml = ``;
    for (let i = 0; i < shoppingData.good_count; i++) {
      let obj = shoppingData[`good_${i + 1}`];
      let temp = `
      <div class="swiper-slide">
        <a href="${obj.link}" class="good">
          <img src="images/${obj.pic}" alt="${obj.product}" />
          <div class="good-info">
            <ul class="good-info-list">
              <li>
                <b> <span>${obj.ratio}%</span> ${obj.price}원 </b>
              </li>
              <li>
                <p>${obj.product}</p>
              </li>
            </ul>
          </div>
        </a>
      </div>
      `;
      swShoppingHtml += temp;
    }
    let swShoppingWrapper = document.querySelector(
      ".sw-shopping .swiper-wrapper"
    );
    swShoppingWrapper.innerHTML = swShoppingHtml;
    let shoppingSwiper = new Swiper(".sw-shopping", {
      slidesPerView: 5,
      grid: {
        rows: 2,
        fill: "row",
      },
      spaceBetween: 10,
      navigation: {
        nextEl: ".shopping .sw-next",
        prevEl: ".shopping .sw-prev",
      },
      breakpoints: {
        1024: {
          spaceBetween: 32,
          slidesPerView: 3,
          // 화면당 3개씩 슬라이드 이동
          slidesPerGroup: 3,
          grid: {
            rows: 1,
          },
        },
        1280: {
          spaceBetween: 26,
          slidesPerView: 4,
          // 화면당 4개씩 슬라이드 이동
          slidesPerGroup: 4,
          grid: {
            rows: 1,
          },
        },
      },
    });
  }

  // tour Swiper

  let tourData;
  const tourXhttp = new XMLHttpRequest();
  tourXhttp.onreadystatechange = function (event) {
    let req = event.target;
    if (req.readyState === XMLHttpRequest.DONE) {
      tourData = JSON.parse(req.response);
      makeTourSlide();
    }
  };
  tourXhttp.open("GET", "tourdata.json");
  tourXhttp.send();
  function makeTourSlide() {
    let swTourHtml = ``;
    for (let i = 0; i < tourData.tour_total; i++) {
      let obj = tourData[`tour_${i + 1}`];
      let cate = obj.category;
      let temp = `
      <div class="swiper-slide">
        <a href="${obj.link}" class="tour-link">
          <div class="tour-img">
            <img src="images/${obj.pic}" alt="${obj.alt}" />
          </div>
          <div class="tour-info">
            <ul class="tour-info-list">`;
      // category에 내용이 없을 경우에는 HTML 자체가 출력되지 않게 한다.
      if (cate) {
        // cate 내용이 존재 할 때
        temp += `
                  <li><span class="tour-cate">${obj.category}</span></li>
                `;
      }
      temp += `
              <li>
                <span class="tour-title"
                  >${obj.title}</span
                >
              </li>
              <li>
                <span class="tour-place">${obj.place}</span>
              </li>
              <li>
                <span class="tour-price"><b>${obj.price}</b>원~</span>
              </li>
            </ul>
          </div>
        </a>
      </div>
    `;
      swTourHtml += temp;
    }
    let swTourWrapper = document.querySelector(".sw-tour .swiper-wrapper");
    swTourWrapper.innerHTML = swTourHtml;
    let tourSwiper = new Swiper(".sw-tour", {
      slidesPerView: 3,
      grid: {
        rows: 2,
        fill: "row",
      },
      spaceBetween: 10,
      navigation: {
        nextEl: ".tour .sw-next",
        prevEl: ".tour .sw-prev",
      },
      breakpoints: {
        1024: {
          spaceBetween: 24,
          slidesPerView: 2,
          // 화면당 3개씩 슬라이드 이동
          slidesPerGroup: 2,
          grid: {
            rows: 1,
          },
        },
        1280: {
          spaceBetween: 26,
          slidesPerView: 3,
          // 화면당 4개씩 슬라이드 이동
          slidesPerGroup: 3,
          grid: {
            rows: 1,
          },
        },
      },
    });
  }

  // Ticket Swiper

  let ticketData;
  const ticketXhttp = new XMLHttpRequest();
  ticketXhttp.onreadystatechange = function (event) {
    let req = event.target;
    if (req.readyState === XMLHttpRequest.DONE) {
      ticketData = JSON.parse(req.response);
      makeTicketSlide();
    }
  };
  ticketXhttp.open("GET", "ticketdata.json");
  ticketXhttp.send();
  function makeTicketSlide() {
    swticketHtml = ``;
    for (let i = 0; i < ticketData.ticket_total; i++) {
      let obj = ticketData[`ticket_${i + 1}`];
      let temp = `
      <div class="swiper-slide">
        <a href="${obj.link}" class="ticket-link">
          <div class="ticket-img">
            <img src="images/${obj.pic}" alt="${obj.alt}" />
            <span class="ticket-rank">${obj.rank}</span>
          </div>
          <div class="ticket-info">
            <ul class="ticket-info-list">
              <li>
                <span class="ticket-title"
                  ><b>${obj.title}</b></span
                >
              </li>
              <li>
                <span class="ticket-hall">${obj.place}</span>
              </li>
              <li>
                <span class="ticket-date"
                  >${obj.date}</span
                >
              </li>
              <li>
                <span class="ticket-sale">${obj.sale}</span>
              </li>
            </ul>
          </div>
        </a>
      </div>
    `;
      swticketHtml += temp;
    }
    let swticketWrapper = document.querySelector(".sw-ticket .swiper-wrapper");
    swticketWrapper.innerHTML = swticketHtml;

    let ticketSwiper = new Swiper(".sw-ticket", {
      slidesPerView: "auto",
      spaceBetween: 10,
      navigation: {
        nextEl: ".ticket .sw-next",
        prevEl: ".ticket .sw-prev",
      },
      breakpoints: {
        1024: {
          slidesPerView: 3,
          spaceBetween: 32,
        },
        1280: {
          slidesPerView: 4,
          spaceBetween: 27,
        },
      },
    });
  }

  // live swiper

  let liveData;
  const liveXhttp = new XMLHttpRequest();
  liveXhttp.onreadystatechange = function (event) {
    let req = event.target;
    if (req.readyState === XMLHttpRequest.DONE) {
      liveData = JSON.parse(req.response);
      makeLiveSlide();
    }
  };
  liveXhttp.open("GET", "livedata.json");
  liveXhttp.send();
  function makeLiveSlide() {
    let swLiveHtml = ``;
    for (let i = 0; i < liveData.live_total; i++) {
      let obj = liveData[`live_${i + 1}`];
      let temp = `
      <div class="swiper-slide">
        <a href="${obj.link}" class="live-link">
          <div class="live-img">
            <img src="images/${obj.pic}" alt="${obj.alt}" />
          </div>
          <div class="live-info">
            <div class="live-info-top">
              <span class="live-info-cate">${obj.category}</span>
              <p class="live-info-title">
                ${obj.title}
              </p>
            </div>
            <div class="live-info-main">
              <p class="live-info-date">${obj.date}</p>
              <p class="live-info-time">${obj.time}</p>
            </div>
            <div class="live-info-bottom clearfix">
              <div class="live-info-thumb">
                <img src="images/${obj.pic}" alt="${obj.alt}" />
              </div>
              <div class="live-info-desc">
                <p class="live-info-desc-title">
                  ${obj.desc}
                </p>
                <p class="live-info-desc-price">
                  <em>${obj.ratio}%</em>
                  <b>${obj.price}</b>원
                </p>
              </div>
            </div>
          </div>
        </a>
      </div>
    `;
      swLiveHtml += temp;
    }

    let swLiveWrapper = document.querySelector(".sw-live .swiper-wrapper");
    swLiveWrapper.innerHTML = swLiveHtml;

    let liveSwiper = new Swiper(".sw-live", {
      slidesPerView: 4,
      spaceBetween: 10,
      navigation: {
        nextEl: ".live .sw-next",
        prevEl: ".live .sw-prev",
      },
      breakpoints: {
        1024: {
          slidesPerView: 3,
          spaceBetween: 32,
        },
        1280: {
          slidesPerView: 4,
          spaceBetween: 24,
        },
      },
    });
  }

  // book swiper

  let booksData;
  const booksXhttp = new XMLHttpRequest();
  booksXhttp.onreadystatechange = function (event) {
    let req = event.target;
    if (req.readyState === XMLHttpRequest.DONE) {
      booksData = JSON.parse(req.response);
      makeBooksSlide();
    }
  };
  booksXhttp.open("GET", "booksdata.json");
  booksXhttp.send();
  function makeBooksSlide() {
    let swbooksHtml = ``;
    for (let i = 0; i < booksData.books_total; i++) {
      let obj = booksData[`books_${i + 1}`];
      let temp = `
      <div class="swiper-slide">
        <a href="${obj.link}" class="books-link">
          <div class="books-img">
            <img src="images/${obj.pic}" alt="${obj.alt}" />
          </div>
          <div class="books-info">
            <p class="books-info-title">${obj.title}</p>
            <p class="books-info-price"><em>${obj.price}</em>원</p>
          </div>
        </a>
      </div>
    `;
      swbooksHtml += temp;
    }

    let swbooksWrapper = document.querySelector(".sw-books .swiper-wrapper");
    swbooksWrapper.innerHTML = swbooksHtml;

    let booksSwiper = new Swiper(".sw-books", {
      slidesPerView: 3,
      grid: {
        rows: 4,
        fill: "row",
      },
      spaceBetween: 19,
      navigation: {
        nextEl: ".books .sw-next",
        prevEl: ".books .sw-prev",
      },
      breakpoints: {
        1024: {
          slidesPerView: 3,
          slidesPerGroup: 3,
          spaceBetween: 30,
          grid: {
            rows: 1,
          },
        },
        1280: {
          slidesPerView: 5,
          slidesPerGroup: 5,
          spaceBetween: 27,
          grid: {
            rows: 1,
          },
        },
      },
    });
  }
  //  event swiper

  let eventData;
  const eventXhttp = new XMLHttpRequest();
  eventXhttp.onreadystatechange = function (event) {
    let req = event.target;
    if (req.readyState === XMLHttpRequest.DONE) {
      eventData = JSON.parse(req.response);
      makeEventSlide();
    }
  };
  eventXhttp.open("GET", "eventdata.json");
  eventXhttp.send();
  function makeEventSlide() {
    let swEventHtml = ``;
    for (let i = 0; i < eventData.event_total; i++) {
      let obj = eventData[`event_${i + 1}`];
      let temp = `
      <div class="swiper-slide">
        <a href="${obj.link}" class="event-link">
          <img src="images/${obj.pic}" alt="${obj.alt}" />
        </a>
      </div>
    `;
      swEventHtml += temp;
    }

    let swEventWrapper = document.querySelector(".sw-events .swiper-wrapper");
    swEventWrapper.innerHTML = swEventHtml;

    let eventsSwiper = new Swiper(".sw-events", {
      slidesPerView: 3,
      spaceBetween: 24,
      navigation: {
        nextEl: ".event .sw-next",
        prevEl: ".event .sw-prev",
      },
      breakpoints: {
        1280: {
          slidesPerView: 4,
        },
      },
    });
  }
};
