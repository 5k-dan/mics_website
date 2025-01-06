// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth',
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  // Swipe effect for upcoming events
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
    const startIndex = page * eventsPerPage;
    const endIndex = startIndex + eventsPerPage;

    eventCards.forEach((card, index) => {
      card.style.display = index >= startIndex && index < endIndex ? "block" : "none";
    });

    document.querySelectorAll(".pagination-circle").forEach((circle, index) => {
      circle.classList.toggle("active", index === page);
    });

    prevBtn.disabled = page === 0;
    nextBtn.disabled = page === totalPages - 1;
  }

  function nextPage() {
    if (currentPage < totalPages - 1) {
      currentPage++;
      showPage(currentPage);
    }
  }

  function prevPage() {
    if (currentPage > 0) {
      currentPage--;
      showPage(currentPage);
    }
  }

  function goToPage(page) {
    currentPage = page;
    showPage(currentPage);
  }

  nextBtn.addEventListener("click", nextPage);
  prevBtn.addEventListener("click", prevPage);

  showPage(currentPage); // Initialize the first page

  // Swipe effect for Executive Board
  const boardContainer = document.getElementById("board-container");
  const boardCards = Array.from(boardContainer.children); // All board cards
  const boardPrevBtn = document.getElementById("board-prev-btn");
  const boardNextBtn = document.getElementById("board-next-btn");
  const boardPagination = document.getElementById("board-pagination");
  let currentBoardIndex = 0;

  // Initialize pagination
  boardCards.forEach((_, i) => {
    const circle = document.createElement("div");
    circle.classList.add("pagination-circle");
    if (i === 0) circle.classList.add("active");
    circle.addEventListener("click", () => goToBoardPage(i));
    boardPagination.appendChild(circle);
  });

  function updateBoardView() {
    boardContainer.style.transform = `translateX(-${currentBoardIndex * 100}%)`;
    document.querySelectorAll("#board-pagination .pagination-circle").forEach((circle, i) => {
      circle.classList.toggle("active", i === currentBoardIndex);
    });
    boardPrevBtn.disabled = currentBoardIndex === 0;
    boardNextBtn.disabled = currentBoardIndex === boardCards.length - 1;
  }

  function goToBoardPage(index) {
    currentBoardIndex = index;
    updateBoardView();
  }

  boardPrevBtn.addEventListener("click", () => {
    if (currentBoardIndex > 0) currentBoardIndex--;
    updateBoardView();
  });

  boardNextBtn.addEventListener("click", () => {
    if (currentBoardIndex < boardCards.length - 1) currentBoardIndex++;
    updateBoardView();
  });

  updateBoardView(); // Initialize the first card
});
