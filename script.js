document.addEventListener("DOMContentLoaded", () => {
    const eventsContainer = document.getElementById("events-container");
    const eventCards = Array.from(eventsContainer.children); // All event cards
    const prevBtn = document.getElementById("prev-btn");
    const nextBtn = document.getElementById("next-btn");
    const pagination = document.getElementById("pagination");

    const eventsPerPage = 3;
    const totalPages = Math.ceil(eventCards.length / eventsPerPage);
    let currentPage = 0;

    // Set container width dynamically based on number of event cards
    eventsContainer.style.width = `${100 * totalPages}%`;

    // Create pagination circles
    for (let i = 0; i < totalPages; i++) {
        const circle = document.createElement("div");
        circle.classList.add("pagination-circle");
        if (i === 0) circle.classList.add("active");
        circle.dataset.page = i;
        circle.addEventListener("click", () => goToPage(i));
        pagination.appendChild(circle);
    }

    // Show the current page with sliding effect
    function showPage(page) {
        const offset = -page * 100; // Slide by 100% of the container width
        eventsContainer.style.transform = `translateX(${offset}%)`;
        eventsContainer.style.transition = "transform 0.5s ease";

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
