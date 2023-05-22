window.addEventListener("load", function () {
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
  eventXhttp.open("GET", "data/eventdata.json");
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
});
