// Select the hamburger button, nav links, and close button
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const closeButton = document.querySelector('.close-btn');

// Function to reset the buttons based on the screen size
function resetButtons() {
    if (window.innerWidth > 768) {
        navLinks.classList.remove('nav-active'); // Ensure nav links are hidden
        closeButton.style.display = 'none'; // Hide close button
        hamburger.style.display = 'none'; // Hide hamburger button on desktop
    } else {
        hamburger.style.display = 'block'; // Show hamburger button on mobile
    }
}

// Add click event listener to the hamburger button
hamburger.addEventListener('click', () => {
    navLinks.classList.add('nav-active'); // Show the nav links
    closeButton.style.display = 'block'; // Show the close button
    hamburger.style.display = 'none'; // Hide the hamburger button
});

// Add click event listener to the close button
closeButton.addEventListener('click', () => {
    navLinks.classList.remove('nav-active'); // Hide the nav links
    closeButton.style.display = 'none'; // Hide the close button
    hamburger.style.display = 'block'; // Show the hamburger button again if in mobile view
});

// Add event listener for window resize
window.addEventListener('resize', resetButtons);

// Initial call to set the correct button visibility on page load
resetButtons();

document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll(".filter-menu button");
    const items = document.querySelectorAll(".discography-grid .item");
  
    buttons.forEach(button => {
      button.addEventListener("click", () => {
        // Remove active class from all buttons
        buttons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");
  
        // Get filter category
        const filter = button.getAttribute("data-filter");
  
        // Show/hide items
        items.forEach(item => {
          const category = item.getAttribute("data-category");
          if (filter === "all" || filter === category) {
            item.style.display = "block";
          } else {
            item.style.display = "none";
          }
        });
      });
    });
  });

  const track = document.querySelector('.carousel-track');
  const slides = Array.from(track.children);
  const nextButton = document.querySelector('.next');
  const prevButton = document.querySelector('.prev');
  const dots = Array.from(document.querySelectorAll('.dot'));
  
  let currentIndex = 0;
  
  // Clone the first slide and append it to the end
  const firstSlide = slides[0].cloneNode(true);
  track.appendChild(firstSlide);
  slides.push(firstSlide); // Update slides array to include the cloned slide
  
  function updateCarousel() {
      const slideWidth = slides[currentIndex].getBoundingClientRect().width;
      track.style.transform = 'translateX(-' + (slideWidth * currentIndex) + 'px)';
  
      // Update dots
      dots.forEach(dot => dot.classList.remove('active'));
      dots[currentIndex % (slides.length - 1)].classList.add('active'); // Adjust for the cloned slide
  }
  
  nextButton.addEventListener('click', () => {
      currentIndex++;
      if (currentIndex >= slides.length) {
          // Jump to the first actual slide after the transition
          track.style.transition = 'none'; // Disable transition for immediate jump
          currentIndex = 1; // Set to the first actual slide
          track.style.transform = 'translateX(0)'; // Reset position immediately
          setTimeout(() => {
              track.style.transition = 'transform 0.5s ease'; // Enable transition for next movements
          }, 0); // Allow the reset to take effect before re-enabling transition
      } else {
          track.style.transition = 'transform 0.5s ease'; // Enable transition
      }
      updateCarousel();
  });
  
  prevButton.addEventListener('click', () => {
      currentIndex--;
      if (currentIndex < 0) {
          // Jump to the last actual slide
          track.style.transition = 'none'; // Disable transition for immediate jump
          currentIndex = slides.length - 2; // Set to the last actual slide
          track.style.transform = 'translateX(-' + (currentIndex * slides[0].getBoundingClientRect().width) + 'px)'; // Move to last slide immediately
          setTimeout(() => {
              track.style.transition = 'transform 0.5s ease'; // Enable transition for next movements
          }, 0); // Allow the reset to take effect before re-enabling transition
      } else {
          track.style.transition = 'transform 0.5s ease'; // Enable transition
      }
      updateCarousel();
  });
  
  dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
          currentIndex = index;
          updateCarousel();
      });
  });
  