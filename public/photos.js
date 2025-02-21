document.addEventListener("DOMContentLoaded", function () {
  const gallery = document.querySelector(".gallery");
  const galleryContainer = document.querySelector(".gallery-container");
  const items = document.querySelectorAll(".gallery-item");
  const controlsContainer = document.querySelector(".gallery-controls");
  let currentIndex = 2; // Posición inicial en el centro
  let startX = 0;
  let endX = 0;
  let autoSlideInterval;
  
  function updateGallery() {
      items.forEach((item, index) => {
          item.classList.remove("gallery-item-1", "gallery-item-2", "gallery-item-3", "gallery-item-4", "gallery-item-5");
          let newIndex = (index - currentIndex + items.length) % items.length + 1;
          item.classList.add(`gallery-item-${newIndex}`);
      });
  }

  function handleTouchStart(event) {
      startX = event.touches[0].clientX;
      clearInterval(autoSlideInterval); // Detiene el auto-slide temporalmente
  }

  function handleTouchEnd(event) {
      endX = event.changedTouches[0].clientX;
      if (startX > endX + 50) {
          currentIndex = (currentIndex + 1) % items.length;
      } else if (startX < endX - 50) {
          currentIndex = (currentIndex - 1 + items.length) % items.length;
      }
      updateGallery();
      startAutoSlide(); // Reinicia el auto-slide
  }

  function startAutoSlide() {
      clearInterval(autoSlideInterval);
      autoSlideInterval = setInterval(() => {
          currentIndex = (currentIndex + 1) % items.length;
          updateGallery();
      }, 1000); // Cambia de imagen cada segundo
  }

  galleryContainer.addEventListener("touchstart", handleTouchStart);
  galleryContainer.addEventListener("touchend", handleTouchEnd);

  updateGallery();
  startAutoSlide();
});
