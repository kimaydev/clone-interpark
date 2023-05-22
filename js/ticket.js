/*
 * 작성자 : 김아영
 * 연락처 : kimaydev@gmail.com
 * 작성일 : 23-05-22
 * 기능 : ticket 리스트 슬라이드 코드
 * 업데이트 : 각 ticket 리스트 목록 출력 함수화 작업
 */
window.addEventListener("load", function () {
  // Ticket Swiper

  function parseTicket(_cate) {
    const ticketXhttp = new XMLHttpRequest();
    ticketXhttp.onreadystatechange = function (event) {
      let req = event.target;
      if (req.readyState === XMLHttpRequest.DONE) {
        let data = JSON.parse(req.response);
        makeTicketSlide(data);
      }
    };
    if (_cate === "뮤지컬") {
      ticketXhttp.open("GET", "data/ticketdata.json");
    } else if (_cate === "콘서트") {
      ticketXhttp.open("GET", "data/ticketdata1.json");
    } else if (_cate === "연극") {
      ticketXhttp.open("GET", "data/ticketdata2.json");
    } else if (_cate === "클래식/무용") {
      ticketXhttp.open("GET", "data/ticketdata3.json");
    } else if (_cate === "스포츠") {
      ticketXhttp.open("GET", "data/ticketdata4.json");
    } else if (_cate === "레저/캠핑") {
      ticketXhttp.open("GET", "data/ticketdata5.json");
    } else if (_cate === "전시/행사") {
      ticketXhttp.open("GET", "data/ticketdata6.json");
    } else if (_cate === "아동/가족") {
      ticketXhttp.open("GET", "data/ticketdata7.json");
    }
    ticketXhttp.send();
  }
  parseTicket("뮤지컬");
  let ticketSwiper;

  function makeTicketSlide(_data) {
    swticketHtml = ``;
    for (let i = 0; i < _data.ticket_total; i++) {
      let obj = _data[`ticket_${i + 1}`];
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
    if (ticketSwiper) {
      ticketSwiper.destroy();
    }

    ticketSwiper = new Swiper(".sw-ticket", {
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
  let btns = document.querySelectorAll(".ticket .btns a");
  btns[0].onclick = function (event) {
    event.preventDefault();
    parseTicket("뮤지컬");
  };
  btns[1].onclick = function (event) {
    event.preventDefault();
    parseTicket("콘서트");
  };
  btns[2].onclick = function (event) {
    event.preventDefault();
    parseTicket("연극");
  };
  btns[3].onclick = function (event) {
    event.preventDefault();
    parseTicket("클래식/무용");
  };
  btns[4].onclick = function (event) {
    event.preventDefault();
    parseTicket("스포츠");
  };
  btns[5].onclick = function (event) {
    event.preventDefault();
    parseTicket("레저/캠핑");
  };
  btns[6].onclick = function (event) {
    event.preventDefault();
    parseTicket("전시/행사");
  };
  btns[7].onclick = function (event) {
    event.preventDefault();
    parseTicket("아동/가족");
  };
});
