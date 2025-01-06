// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth',
    });
  });
});

// Swipe effect for upcoming events
document.addEventListener("DOMContentLoaded", () => {
  const eventsContainer = document.getElementById("events-container");
  const eventCards = Array.from(eventsContainer.children); // All event cards
  const prevBtn = document.getElementById("prev-btn");
  const nextBtn = document.getElementById("next-btn");
  const pagination = document.getElementById("pagination");

  const eventsPerPage = 3;
  let currentPage = 0;

  // Calculate total number of pages
  const totalPages = Math.ceil(eventCards.length / eventsPerPage);

  // Create pagination circles
  for (let i = 0; i < totalPages; i++) {
    const circle = document.createElement("div");
    circle.classList.add("pagination-circle");
    if (i === 0) circle.classList.add("active");
    circle.dataset.page = i;
    circle.addEventListener("click", () => goToPage(i));
    pagination.appendChild(circle);
  }

  // Show the current page of events
  function showPage(page) {
    // Calculate the range of events to display
    const startIndex = page * eventsPerPage;
    const endIndex = startIndex + eventsPerPage;

    // Update visibility of event cards
    eventCards.forEach((card, index) => {
      if (index >= startIndex && index < endIndex) {
        card.style.display = "block"; // Show cards for the current page
      } else {
        card.style.display = "none"; // Hide all other cards
      }
    });

    // Update active pagination circle
    document.querySelectorAll(".pagination-circle").forEach((circle, index) => {
      circle.classList.toggle("active", index === page);
    });

    // Enable/disable navigation buttons
    prevBtn.disabled = page === 0;
    nextBtn.disabled = page === totalPages - 1;
  }

  // Go to the next page
  function nextPage() {
    if (currentPage < totalPages - 1) {
      currentPage++;
      showPage(currentPage);
    }
  }

  // Go to the previous page
  function prevPage() {
    if (currentPage > 0) {
      currentPage--;
      showPage(currentPage);
    }
  }

  // Go to a specific page
  function goToPage(page) {
    currentPage = page;
    showPage(currentPage);
  }

  // Add event listeners to navigation buttons
  nextBtn.addEventListener("click", nextPage);
  prevBtn.addEventListener("click", prevPage);

  // Initialize the first page
  showPage(currentPage);
});
