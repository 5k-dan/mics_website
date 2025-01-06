document.addEventListener("DOMContentLoaded", () => {
  // Swipe effect for Executive Board
  const boardContainer = document.getElementById("board-container");
  const boardCards = Array.from(boardContainer.children); // All board cards
  const boardPrevBtn = document.getElementById("board-prev-btn");
  const boardNextBtn = document.getElementById("board-next-btn");
  const boardPagination = document.getElementById("board-pagination");
  let currentBoardIndex = 0;

  // Initialize pagination for the Executive Board
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

  updateBoardView(); // Initialize Executive Board view

  // Swipe effect for Upcoming Events
  const eventsContainer = document.getElementById("events-container");
  const eventCards = Array.from(eventsContainer.children); // All event cards
  const prevBtn = document.getElementById("prev-btn");
  const nextBtn = document.getElementById("next-btn");
  const pagination = document.getElementById("pagination");

  const eventsPerPage = 3; // Number of events visible per page
  let currentEventPage = 0;

  // Initialize pagination for events
  const totalEventPages = Math.ceil(eventCards.length / eventsPerPage);
  for (let i = 0; i < totalEventPages; i++) {
    const circle = document.createElement("div");
    circle.classList.add("pagination-circle");
    if (i === 0) circle.classList.add("active");
    circle.addEventListener("click", () => goToEventPage(i));
    pagination.appendChild(circle);
  }

  function updateEventView() {
    const startIndex = currentEventPage * eventsPerPage;
    const endIndex = startIndex + eventsPerPage;

    eventCards.forEach((card, index) => {
      card.style.display = index >= startIndex && index < endIndex ? "block" : "none";
    });

    document.querySelectorAll("#pagination .pagination-circle").forEach((circle, i) => {
      circle.classList.toggle("active", i === currentEventPage);
    });

    prevBtn.disabled = currentEventPage === 0;
    nextBtn.disabled = currentEventPage === totalEventPages - 1;
  }

  function goToEventPage(index) {
    currentEventPage = index;
    updateEventView();
  }

  prevBtn.addEventListener("click", () => {
    if (currentEventPage > 0) currentEventPage--;
    updateEventView();
  });

  nextBtn.addEventListener("click", () => {
    if (currentEventPage < totalEventPages - 1) currentEventPage++;
    updateEventView();
  });

  updateEventView(); // Initialize Upcoming Events view
});
