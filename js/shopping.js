/*
 * 작성자 : 김아영
 * 연락처 : kimaydev@gmail.com
 * 작성일 : 23-05-30
 * 기능 : 쇼핑몰 리스트 슬라이드 코드 리팩토링
 * 업데이트 : 각 쇼핑몰 리스트 목록 코드 fetch로 변경
 */
window.addEventListener("load", function () {
  // Shopping Swiper

  // 메뉴 클릭(실행) 시 쇼핑 목록 slide 내용 변경
  function parseShopping(_menu) {
    if (_menu === "쎈딜") {
      fetch("data/shoppingdata.json")
        .then((res) => {
          // return을 한 결과가 바로 다음의 then으로 넘어간다.
          return res.json();
        })
        .then((result) => {
          makeShoppingSlide(result);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (_menu === "베스트") {
      fetch("data/shoppingdata1.json")
        .then((res) => {
          return res.json();
        })
        .then((result) => {
          makeShoppingSlide(result);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (_menu === "오늘만특가") {
      fetch("data/shoppingdata2.json")
        .then((res) => res.json())
        .then((result) => makeShoppingSlide(result))
        .catch((err) => console.log(err));
    } else if (_menu === "어린이날") {
      fetch("data/어린이날.json")
        .then((res) => res.json())
        .then((result) => makeShoppingSlide(result))
        .catch((err) => console.log(err));
    }
  }
  parseShopping("쎈딜");

  // swiper는 슬라이더는 만들기 전에 삭제되어야 함
  let shoppingSwiper;

  function makeShoppingSlide(_data) {
    let swShoppingHtml = ``;
    for (let i = 0; i < _data.good_count; i++) {
      let obj = _data[`good_${i + 1}`];
      let cate = obj.ratio;
      let temp = `
      <div class="swiper-slide">
        <a href="${obj.link}" class="good">
          <img src="images/${obj.pic}" alt="${obj.product}" />
          <div class="good-info">
            <ul class="good-info-list">
              <li>
                <b> 
                `;
      if (cate) {
        temp += `
                  <span>${obj.ratio}%</span> 
                  `;
      }
      temp += `
                ${obj.price}원
                </b>
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

    // swiper 새로 생성 전에 swiper API를 이용하여 삭제한다.
    if (shoppingSwiper) {
      shoppingSwiper.destroy();
    }

    shoppingSwiper = new Swiper(".sw-shopping", {
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
  // 버튼 클릭 시 카테고리 변경
  const btns = document.querySelectorAll(".shopping .btns a");
  let cateName = ["쎈딜", "베스트", "오늘만특가", "어린이날"];
  for (let i = 0; i < cateName.length; i++) {
    btns[i].onclick = function (event) {
      event.preventDefault();
      // a 태그의 기본 동작인 href를 막는다.
      parseShopping(cateName[i]);
      for (let j = 0; j < btns.length; j++) {
        btns[j].classList.remove("btns-active");
      }
      // 버튼 포커스 class 적용
      this.classList.add("btns-active");
    };
  }
});
// 메서드 방식으로 로드함
