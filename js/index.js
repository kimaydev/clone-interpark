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

  let data = {
    good_1: { name: "제품1", img: "promotion1.jpg", link: "" },
    good_2: { name: "제품2", img: "promotion2.png", link: "" },
    good_3: { name: "제품3", img: "promotion3.jpg", link: "" },
    good_4: { name: "제품4", img: "promotion4.jpg", link: "" },
    good_5: { name: "제품5", img: "promotion5.jpg", link: "" },
    good_6: { name: "제품6", img: "promotion6.jpg", link: "" },
  };
  let swPromotionHtml = ``;
  // 1-2. for문을 이용한 html 데이터 생성
  for (let i = 0; i < 6; i++) {
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
  // Shopping Swiper

  let shoppingData = {
    good_count: 5,
    good_1: {
      link: "#",
      pic: "good1.png",
      product: "맥 MAC 립스틱",
      ratio: 5,
      price: "11,950",
    },
    good_2: {
      link: "#",
      pic: "good2.jpg",
      product: "[장터할매]2023년 햇양파 중품/짱아치용 특품 3kg~10kg",
      ratio: 5,
      price: "11,950",
    },
    good_3: {
      link: "#",
      pic: "good3.jpg",
      product:
        " QCY GTS 스마트워치 2세대 블랙/ 블루투스 통화가능/실리콘 스트랩 메탈 스트랩 TPU 보호필름 추가구매",
      ratio: 5,
      price: "11,950",
    },
    good_4: {
      link: "#",
      pic: "good4.jpg",
      product: "[베베당] 유기농 롱스틱 골고루 10봉 세트",
      ratio: 5,
      price: "11,950",
    },
    good_5: {
      link: "#",
      pic: "good4.jpg",
      product: "[베베당] 유기농 롱스틱 골고루 10봉 세트",
      ratio: 5,
      price: "11,950",
    },
  };
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
  // tour Swiper
  let tourData = {
    tour_total: 4,
    tour_1: {
      link: "#",
      pic: "tour1.jpg",
      alt: "tour1",
      category: "반짝특가",
      title:
        "[미동부/캐나다 10일] 밤 출발 에어프레미아 10일 [퀘벡숙박/3대야경/보스턴]",
      place: "웨스틴 리조트 괌",
      price: "350,300",
    },
    tour_2: {
      link: "#",
      pic: "tour2.jpg",
      alt: "tour2",
      category: "",
      title:
        "[미동부/캐나다 10일] 밤 출발 에어프레미아 10일 [퀘벡숙박/3대야경/보스턴]",
      place: "웨스틴 리조트 괌",
      price: "350,300",
    },
    tour_3: {
      link: "#",
      pic: "tour3.jpg",
      alt: "tour3",
      category: "반짝특가",
      title:
        "[미동부/캐나다 10일] 밤 출발 에어프레미아 10일 [퀘벡숙박/3대야경/보스턴]",
      place: "웨스틴 리조트 괌",
      price: "350,300",
    },
    tour_4: {
      link: "#",
      pic: "tour1.jpg",
      alt: "tour1",
      category: "반짝특가",
      title:
        "[미동부/캐나다 10일] 밤 출발 에어프레미아 10일 [퀘벡숙박/3대야경/보스턴]",
      place: "웨스틴 리조트 괌",
      price: "350,300",
    },
  };
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
  // Ticket Swiper
  let ticketData = {
    ticket_total: 6,
    ticket_1: {
      link: "#",
      pic: "musical1.gif",
      alt: "musical1",
      rank: 1,
      title: "뮤지컬〈영웅〉- 블루스퀘어",
      place: "블루스퀘어 신한카드홀",
      date: "2023.03.17 ~ 2023.05.21",
      sale: "단독판매",
    },
    ticket_2: {
      link: "#",
      pic: "musical2.gif",
      alt: "musical2",
      rank: 2,
      title: "뮤지컬〈영웅〉- 블루스퀘어",
      place: "블루스퀘어 신한카드홀",
      date: "2023.03.17 ~ 2023.05.21",
      sale: "단독판매",
    },
    ticket_3: {
      link: "#",
      pic: "musical3.gif",
      alt: "musical3",
      rank: 3,
      title: "뮤지컬〈영웅〉- 블루스퀘어",
      place: "블루스퀘어 신한카드홀",
      date: "2023.03.17 ~ 2023.05.21",
      sale: "단독판매",
    },
    ticket_4: {
      link: "#",
      pic: "musical4.gif",
      alt: "musical4",
      rank: 4,
      title: "뮤지컬〈영웅〉- 블루스퀘어",
      place: "블루스퀘어 신한카드홀",
      date: "2023.03.17 ~ 2023.05.21",
      sale: "단독판매",
    },
    ticket_5: {
      link: "#",
      pic: "musical1.gif",
      alt: "musical1",
      rank: 5,
      title: "뮤지컬〈영웅〉- 블루스퀘어",
      place: "블루스퀘어 신한카드홀",
      date: "2023.03.17 ~ 2023.05.21",
      sale: "단독판매",
    },
    ticket_6: {
      link: "#",
      pic: "musical2.gif",
      alt: "musical2",
      rank: 6,
      title: "뮤지컬〈영웅〉- 블루스퀘어",
      place: "블루스퀘어 신한카드홀",
      date: "2023.03.17 ~ 2023.05.21",
      sale: "단독판매",
    },
  };
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
  // live swiper

  let liveData = {
    live_total: 5,
    live_1: {
      link: "#",
      pic: "live1.jpg",
      alt: "라이브1",
      category: "방송예정",
      title:
        "2박 3일로 떠나는 후쿠오카 여행✈ 패키지VS자유여행 다 준비했어요 😆",
      date: "04월 27일 (목)",
      time: "16:00",
      desc: "[미미의밥상] 감자탕 4.7kg(국내산등뼈 100% 10인분)+라면사리",
      ratio: 22,
      price: "19,840",
    },
    live_2: {
      link: "#",
      pic: "live2.jpg",
      alt: "라이브2",
      category: "방송예정",
      title:
        "2박 3일로 떠나는 후쿠오카 여행✈ 패키지VS자유여행 다 준비했어요 😆",
      date: "04월 27일 (목)",
      time: "16:00",
      desc: "[미미의밥상] 감자탕 4.7kg(국내산등뼈 100% 10인분)+라면사리",
      ratio: 22,
      price: "19,840",
    },
    live_3: {
      link: "#",
      pic: "live3.jpg",
      alt: "라이브3",
      category: "방송예정",
      title:
        "2박 3일로 떠나는 후쿠오카 여행✈ 패키지VS자유여행 다 준비했어요 😆",
      date: "04월 27일 (목)",
      time: "16:00",
      desc: "[미미의밥상] 감자탕 4.7kg(국내산등뼈 100% 10인분)+라면사리",
      ratio: 22,
      price: "19,840",
    },
    live_4: {
      link: "#",
      pic: "live4.jpg",
      alt: "라이브4",
      category: "방송예정",
      title:
        "2박 3일로 떠나는 후쿠오카 여행✈ 패키지VS자유여행 다 준비했어요 😆",
      date: "04월 27일 (목)",
      time: "16:00",
      desc: "[미미의밥상] 감자탕 4.7kg(국내산등뼈 100% 10인분)+라면사리",
      ratio: 22,
      price: "19,840",
    },
    live_5: {
      link: "#",
      pic: "live1.jpg",
      alt: "라이브1",
      category: "방송예정",
      title:
        "2박 3일로 떠나는 후쿠오카 여행✈ 패키지VS자유여행 다 준비했어요 😆",
      date: "04월 27일 (목)",
      time: "16:00",
      desc: "[미미의밥상] 감자탕 4.7kg(국내산등뼈 100% 10인분)+라면사리",
      ratio: 22,
      price: "19,840",
    },
  };
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
  // book swiper

  let booksData = {
    books_total: 8,
    books_1: {
      link: "#",
      pic: "book1.jpg",
      alt: "book1",
      title: "New 대한민국 청약지도",
      price: "18,000",
    },
    books_2: {
      link: "#",
      pic: "book2.jpg",
      alt: "book2",
      title: "New 대한민국 청약지도",
      price: "18,000",
    },
    books_3: {
      link: "#",
      pic: "book3.jpg",
      alt: "book3",
      title: "New 대한민국 청약지도",
      price: "18,000",
    },
    books_4: {
      link: "#",
      pic: "book4.jpg",
      alt: "book4",
      title: "New 대한민국 청약지도",
      price: "18,000",
    },
    books_5: {
      link: "#",
      pic: "book5.jpg",
      alt: "book5",
      title: "New 대한민국 청약지도",
      price: "18,000",
    },
    books_6: {
      link: "#",
      pic: "book1.jpg",
      alt: "book1",
      title: "New 대한민국 청약지도",
      price: "18,000",
    },
    books_7: {
      link: "#",
      pic: "book2.jpg",
      alt: "book2",
      title: "New 대한민국 청약지도",
      price: "18,000",
    },
    books_8: {
      link: "#",
      pic: "book3.jpg",
      alt: "book3",
      title: "New 대한민국 청약지도",
      price: "18,000",
    },
  };
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
  //  event swiper

  let eventData = {
    event_total: 4,
    event_1: {
      link: "#",
      pic: "banner1.jpg",
      alt: "banner1",
    },
    event_2: {
      link: "#",
      pic: "banner2.jpg",
      alt: "banner2",
    },
    event_3: {
      link: "#",
      pic: "banner3.jpg",
      alt: "banner3",
    },
    event_4: {
      link: "#",
      pic: "banner4.jpg",
      alt: "banner4",
    },
  };
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
};
