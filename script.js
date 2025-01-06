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
    const startIndex = page * eventsPerPage;
    const endIndex = startIndex + eventsPerPage;

    eventCards.forEach((card, index) => {
      if (index >= startIndex && index < endIndex) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
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

  showPage(currentPage);
});

// Swipe effect for Executive Board
document.addEventListener("DOMContentLoaded", () => {
  const boardContainer = document.getElementById("board-container");
  const boardCards = Array.from(boardContainer.children); // All board member cards
  const boardPrevBtn = document.getElementById("board-prev-btn");
  const boardNextBtn = document.getElementById("board-next-btn");
  const boardPagination = document.getElementById("board-pagination");

  const cardsPerPage = 3;
  const totalBoardPages = Math.ceil(boardCards.length / cardsPerPage);
  let currentBoardPage = 0;

  // Create pagination circles for board section
  for (let i = 0; i < totalBoardPages; i++) {
    const circle = document.createElement("div");
    circle.classList.add("pagination-circle");
    if (i === 0) circle.classList.add("active");
    circle.dataset.page = i;
    circle.addEventListener("click", () => goToBoardPage(i));
    boardPagination.appendChild(circle);
  }

  function showBoardPage(page) {
    const offset = -page * 100; // Slide by 100% of container width
    boardContainer.style.transform = `translateX(${offset}%)`;

    document.querySelectorAll("#board-pagination .pagination-circle").forEach((circle, index) => {
      circle.classList.toggle("active", index === page);
    });

    boardPrevBtn.disabled = page === 0;
    boardNextBtn.disabled = page === totalBoardPages - 1;
  }

  function nextBoardPage() {
    if (currentBoardPage < totalBoardPages - 1) {
      currentBoardPage++;
      showBoardPage(currentBoardPage);
    }
  }

  function prevBoardPage() {
    if (currentBoardPage > 0) {
      currentBoardPage--;
      showBoardPage(currentBoardPage);
    }
  }

  function goToBoardPage(page) {
    currentBoardPage = page;
    showBoardPage(currentBoardPage);
  }

  boardNextBtn.addEventListener("click", nextBoardPage);
  boardPrevBtn.addEventListener("click", prevBoardPage);

  showBoardPage(currentBoardPage);
});
