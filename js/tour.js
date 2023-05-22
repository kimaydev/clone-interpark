/*
 * 작성자 : 김아영
 * 연락처 : kimaydev@gmail.com
 * 작성일 : 23-05-22
 * 기능 : tour 리스트 슬라이드 코드
 * 업데이트 : 각 tour 리스트 목록 출력 함수화 작업
 */
window.addEventListener("load", function () {
  // tour Swiper

  // tour 데이터 파싱 및 슬라이드 제작
  function parseTour(_cate) {
    const tourXhttp = new XMLHttpRequest();
    tourXhttp.onreadystatechange = function (event) {
      const req = event.target;
      if (req.readyState === XMLHttpRequest.DONE) {
        let data = JSON.parse(req.response);
        makeTourSlide(data);
      }
    };
    if (_cate === "망설이면 품절") {
      tourXhttp.open("GET", "tourdata.json");
    } else if (_cate === "패키지") {
      tourXhttp.open("GET", "tourdata1.json");
    } else if (_cate === "숙소") {
      tourXhttp.open("GET", "tourdata2.json");
    } else if (_cate === "해외숙소") {
      tourXhttp.open("GET", "tourdata3.json");
    }
    tourXhttp.send();
  }

  parseTour("망설이면 품절");
  let tourSwiper;

  function makeTourSlide(_data) {
    let swTourHtml = ``;
    for (let i = 0; i < _data.tour_total; i++) {
      let obj = _data[`tour_${i + 1}`];
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
    if (tourSwiper) {
      tourSwiper.destroy();
    }
    tourSwiper = new Swiper(".sw-tour", {
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

  let btns = document.querySelectorAll(".tour .btns a");
  btns[0].onclick = function (event) {
    event.preventDefault();
    parseTour("망설이면 품절");
  };
  btns[1].onclick = function (event) {
    event.preventDefault();
    parseTour("패키지");
  };
  btns[2].onclick = function (event) {
    event.preventDefault();
    parseTour("숙소");
  };
  btns[3].onclick = function (event) {
    event.preventDefault();
    parseTour("해외숙소");
  };
});
