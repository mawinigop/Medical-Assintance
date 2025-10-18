document.querySelectorAll(".card-wrapper").forEach(wrapper => {
    if (wrapper.classList.contains("medical-form")) return;

    const list = wrapper.querySelector(".swiper-wrapper");
    const items = Array.from(wrapper.querySelectorAll(".card-item"));
    const pagination = wrapper.querySelector(".swiper-pagination");

    function getSlidesPerView() {
        if (window.innerWidth >= 1025) return 3;
        if (window.innerWidth >= 601) return 2;
        return 1;
    }

    let slidesPerView = getSlidesPerView();
    let index = slidesPerView;

    function setupClones() {
        list.innerHTML = "";
        const firstClones = items.slice(0, slidesPerView).map(i => i.cloneNode(true));
        const lastClones = items.slice(-slidesPerView).map(i => i.cloneNode(true));

        lastClones.forEach(c => list.appendChild(c));
        items.forEach(i => list.appendChild(i));
        firstClones.forEach(c => list.appendChild(c));
    }

    function createBullets() {
        pagination.innerHTML = "";
        for (let i = 0; i < items.length; i++) {
            const bullet = document.createElement("span");
            bullet.classList.add("bullet");
            if (i === 0) bullet.classList.add("active");
            bullet.addEventListener("click", () => {
                index = slidesPerView + i;
                updateSlide(true);
            });
            pagination.appendChild(bullet);
        }
    }

    function updateSlide(smooth = true) {
        const slideWidth = list.clientWidth / slidesPerView;
        list.style.transition = smooth ? "transform 0.4s ease" : "none";
        list.style.transform = `translateX(-${index * slideWidth}px)`;

        let realIndex = (index - slidesPerView) % items.length;
        if (realIndex < 0) realIndex += items.length;

        const bullets = pagination.querySelectorAll(".bullet");
        bullets.forEach((b, i) => b.classList.toggle("active", i === realIndex));
    }

    function handleTransitionEnd() {
        const total = items.length;
        const slideWidth = list.clientWidth / slidesPerView;

        if (index >= total + slidesPerView) {
            list.style.transition = "none";
            index = slidesPerView;
            list.style.transform = `translateX(-${index * slideWidth}px)`;
        }
    
        else if (index < slidesPerView) {
            list.style.transition = "none";
            index = total + slidesPerView - 1;
            list.style.transform = `translateX(-${index * slideWidth}px)`;
        }
    }

    setupClones();
    createBullets();
    updateSlide(false);
    list.addEventListener("transitionend", handleTransitionEnd);

    const nextBtn = wrapper.querySelector(".swiper-button-next");
    const prevBtn = wrapper.querySelector(".swiper-button-prev");

    nextBtn?.addEventListener("click", () => {
        index++;
        updateSlide(true);
    });

    prevBtn?.addEventListener("click", () => {
        index--;
        updateSlide(true);
    });

    window.addEventListener("resize", () => {
        slidesPerView = getSlidesPerView();
        setupClones();
        createBullets();
        index = slidesPerView;
        updateSlide(false);
    });

    let isDragging = false;
    let startX = 0;
    let moveX = 0;
    let dragged = false;

    list.addEventListener("mousedown", (e) => {
        isDragging = true;
        dragged = false;
        startX = e.pageX;
        list.style.cursor = "grabbing";
        list.style.transition = "none";
    });

    window.addEventListener("mousemove", (e) => {
        if (!isDragging) return;
        const currentX = e.pageX;
        moveX = currentX - startX;
        const slideWidth = list.clientWidth / slidesPerView;
        const offset = -index * slideWidth + moveX;
        list.style.transform = `translateX(${offset}px)`;
        if (Math.abs(moveX) > 10) dragged = true;
    });

    window.addEventListener("mouseup", () => {
        if (!isDragging) return;
        isDragging = false;
        list.style.cursor = "grab";

        const slideWidth = list.clientWidth / slidesPerView;
        if (Math.abs(moveX) > slideWidth / 4) {
            if (moveX < 0) index++;
            else index--;
        }
        updateSlide(true);
        moveX = 0;
    });

    list.addEventListener("touchstart", (e) => {
        isDragging = true;
        dragged = false;
        startX = e.touches[0].clientX;
        list.style.transition = "none";
    });

    list.addEventListener("touchmove", (e) => {
        if (!isDragging) return;
        const currentX = e.touches[0].clientX;
        moveX = currentX - startX;
        const slideWidth = list.clientWidth / slidesPerView;
        const offset = -index * slideWidth + moveX;
        list.style.transform = `translateX(${offset}px)`;
        if (Math.abs(moveX) > 10) dragged = true;
    });

    list.addEventListener("touchend", () => {
        if (!isDragging) return;
        isDragging = false;
        const slideWidth = list.clientWidth / slidesPerView;
        if (Math.abs(moveX) > slideWidth / 4) {
            if (moveX < 0) index++;
            else index--;
        }
        updateSlide(true);
        moveX = 0;
    });

    list.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", (e) => {
            if (dragged) {
                e.preventDefault();
                e.stopPropagation();
            }
        });
    });

    list.querySelectorAll("img, a").forEach(el => {
        el.addEventListener("dragstart", e => e.preventDefault());
    });
});
