/*
 * 작성자 : 김아영
 * 연락처 : kimaydev@gmail.com
 * 작성일 : 23-05-30
 * 기능 : ticket 리스트 슬라이드 코드
 * 업데이트 : 각 ticket 리스트 목록 코드 fetch로 변경
 */
window.addEventListener("load", function () {
  // Ticket Swiper

  function parseTicket(_cate) {
    if (_cate === "뮤지컬") {
      fetch("data/ticketdata.json")
        .then((res) => res.json())
        .then((result) => makeTicketSlide(result))
        .catch((err) => console.log(err));
    } else if (_cate === "콘서트") {
      fetch("data/ticketdata1.json")
        .then((res) => res.json())
        .then((result) => makeTicketSlide(result))
        .catch((err) => console.log(err));
    } else if (_cate === "연극") {
      fetch("data/ticketdata2.json")
        .then((res) => res.json())
        .then((result) => makeTicketSlide(result))
        .catch((err) => console.log(err));
    } else if (_cate === "클래식/무용") {
      fetch("data/ticketdata3.json")
        .then((res) => res.json())
        .then((result) => makeTicketSlide(result))
        .catch((err) => console.log(err));
    } else if (_cate === "스포츠") {
      fetch("data/sports.json")
        .then((res) => res.json())
        .then((result) => makeTicketSlide(result))
        .catch((err) => console.log(err));
    } else if (_cate === "레저/캠핑") {
      fetch("data/ticketdata5.json")
        .then((res) => res.json())
        .then((result) => makeTicketSlide(result))
        .catch((err) => console.log(err));
    } else if (_cate === "전시/행사") {
      fetch("data/ticketexhibition.json")
        .then((res) => res.json())
        .then((result) => makeTicketSlide(result))
        .catch((err) => console.log(err));
    } else if (_cate === "아동/가족") {
      fetch("data/ticketdata7.json")
        .then((res) => res.json())
        .then((result) => makeTicketSlide(result))
        .catch((err) => console.log(err));
    }
  }
  parseTicket("뮤지컬");
  let ticketSwiper;

  function makeTicketSlide(_data) {
    swticketHtml = ``;
    for (let i = 0; i < _data.ticket_total; i++) {
      let obj = _data[`ticket_${i + 1}`];
      let cate = obj.sale;
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
                <span class="ticket-date">${obj.date}</span>
              </li>`;
      if (cate) {
        temp += `
                <li>
                <span class="ticket-sale">${obj.sale}</span>
                </li>
                `;
      }
      temp += `
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
  let cateName = [
    "뮤지컬",
    "콘서트",
    "연극",
    "클래식/무용",
    "스포츠",
    "레저/캠핑",
    "전시/행사",
    "아동/가족",
  ];
  for (let i = 0; i < cateName.length; i++) {
    btns[i].onclick = function (event) {
      event.preventDefault();
      parseTicket(cateName[i]);
      for (let j = 0; j < btns.length; j++) {
        btns[j].classList.remove("btns-active");
      }
      this.classList.add("btns-active");
    };
  }
});
