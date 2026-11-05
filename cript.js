
console.log("JAVASCRIPT BERHASIL TERHUBUNG!");

document.addEventListener("DOMContentLoaded", function () {

    const popupOverlay = document.getElementById("popupOverlay");
    const popupClose = document.getElementById("popupClose");
    const slider = document.querySelector(".popup-slider");

    const images = document.querySelectorAll(".popup-image");
    const dots = document.querySelectorAll(".dot");

    // Periksa elemen pop-up
    if (!popupOverlay || !popupClose || !slider ||
        images.length === 0 || dots.length !== images.length) {
        console.error("Elemen pop-up tidak ditemukan!");
        return;
    }

    let currentSlide = 0;
    let slideInterval;
    let startX = 0;
    let isDragging = false;

    // MENAMPILKAN POSTER
    function showSlide(index) {

        currentSlide = (index + images.length) % images.length;

        images.forEach(image => image.classList.remove("active"));
        dots.forEach(dot => dot.classList.remove("active"));

        images[currentSlide].classList.add("active");
        dots[currentSlide].classList.add("active");
    }

    // SLIDER OTOMATIS
    function startSlider() {

        clearInterval(slideInterval);

        slideInterval = setInterval(function () {
            showSlide(currentSlide + 1);
        }, 4000);

    }

    // KLIK TITIK NAVIGASI
    dots.forEach((dot, index) => {

        dot.addEventListener("click", function () {
            showSlide(index);
            startSlider();
        });

    });

    // GESER MANUAL DENGAN MOUSE ATAU JARI
    slider.addEventListener("pointerdown", function (event) {

        startX = event.clientX;
        isDragging = true;

        slider.setPointerCapture(event.pointerId);

    });

    slider.addEventListener("pointerup", function (event) {

        if (!isDragging) return;

        const endX = event.clientX;
        const distance = endX - startX;

        isDragging = false;

        if (Math.abs(distance) > 40) {

            if (distance < 0) {
                // Geser ke kiri
                showSlide(currentSlide + 1);
            } else {
                // Geser ke kanan
                showSlide(currentSlide - 1);
            }

            startSlider();
        }

    });

    slider.addEventListener("pointercancel", function () {
        isDragging = false;
    });

    // MENUTUP POP-UP
    function closePopup() {

        popupOverlay.style.display = "none";
        clearInterval(slideInterval);

    }

    popupClose.addEventListener("click", closePopup);

    popupOverlay.addEventListener("click", function (event) {

        if (event.target === popupOverlay) {
            closePopup();
        }

    });

    document.addEventListener("keydown", function (event) {

        if (event.key === "Escape") {
            closePopup();
        }

    });

    // MULAI POP-UP
    showSlide(0);
    startSlider();

});
