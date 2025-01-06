document.addEventListener("DOMContentLoaded", () => {
  // Swipe effect for Executive Board
  const boardContainer = document.getElementById("board-container");
  const boardCards = Array.from(boardContainer.children); // All board cards
  const boardPrevBtn = document.getElementById("board-prev-btn");
  const boardNextBtn = document.getElementById("board-next-btn");
  const boardPagination = document.getElementById("board-pagination");
  let currentBoardIndex = 0;

  // Initialize pagination for board
  boardCards.forEach((_, i) => {
    const circle = document.createElement("div");
    circle.classList.add("pagination-circle");
    if (i === 0) circle.classList.add("active");
    circle.addEventListener("click", () => goToBoardPage(i));
    boardPagination.appendChild(circle);
  });

  function updateBoardView() {
    boardContainer.style.transform = `translateX(-${currentBoardIndex * 100}%)`;
    document.querySelectorAll(".pagination-circle").forEach((circle, i) => {
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

  updateBoardView();

  // Swipe effect for Upcoming Events
  const eventsContainer = document.getElementById("events-container");
  const eventCards = Array.from(eventsContainer.children); // All event cards
  const eventsPerPage = 3;
  let currentEventPage = 0;

  document.getElementById("prev-btn").addEventListener("click", () => {
    if (currentEventPage > 0) currentEventPage--;
    updateEventView();
  });

  document.getElementById("next-btn").addEventListener("click", () => {
    if ((currentEventPage + 1) * eventsPerPage < eventCards.length) currentEventPage++;
    updateEventView();
  });

  function updateEventView() {
    eventCards.forEach((card, index) => {
      card.style.display =
        index >= currentEventPage * eventsPerPage &&
        index < (currentEventPage + 1) * eventsPerPage
          ? "block"
          : "none";
    });
    document.getElementById("prev-btn").disabled = currentEventPage === 0;
    document.getElementById("next-btn").disabled =
      (currentEventPage + 1) * eventsPerPage >= eventCards.length;
  }

  updateEventView();
});
