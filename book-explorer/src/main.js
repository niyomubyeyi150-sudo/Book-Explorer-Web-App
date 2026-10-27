import "./style.css";
import { getFavorites, addFavorite } from "./favorites.js";
import { fetchBooks } from "./fetchBooks.js";

// Store the books returned by the API.
let books = [];

const bookList = document.getElementById("book-list");
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const booksStatus = document.getElementById("books-status");

// Display feedback messages to the user.
function showStatus(message, type = "info") {
  if (!booksStatus) return;

  booksStatus.textContent = message;
  booksStatus.classList.remove("hidden", "text-red-600");

  if (type === "error") {
    booksStatus.classList.add("text-red-600");
  }
}

// Create and display a card for each book.
function renderBooks() {
  if (!bookList) return;

  const favorites = getFavorites();
  bookList.replaceChildren();

  books.forEach((book) => {
    const isFavorite = favorites.some(
      (favorite) => favorite.id === book.id
    );

    const card = document.createElement("article");
    card.className =
      "rounded-2xl border border-[#E5E3D9] bg-white p-4 shadow-sm";

    // Display the cover when the API provides a cover ID.
    if (book.cover) {
      const cover = document.createElement("img");
      cover.src = book.cover;
      cover.alt = `Cover of ${book.title}`;
      cover.loading = "lazy";
      cover.className =
        "mb-4 h-56 w-full rounded-lg object-contain";

      card.appendChild(cover);
    } else {
      // Some books do not have a cover image.
      const placeholder = document.createElement("div");
      placeholder.className =
        "mb-4 flex h-56 items-center justify-center rounded-lg bg-[#F7F5EF] text-center text-sm text-[#687665]";
      placeholder.textContent = "Cover not available";

      card.appendChild(placeholder);
    }

    const title = document.createElement("h3");
    title.textContent = book.title;
    title.className =
      "text-lg font-semibold text-[#26372D]";

    const author = document.createElement("p");
    author.textContent = `By ${book.author}`;
    author.className = "mt-2 text-sm text-[#687665]";

    const year = document.createElement("p");
    year.textContent = book.year
      ? `First published: ${book.year}`
      : "Publication year unavailable";
    year.className = "mb-4 mt-2 text-sm text-[#687665]";

    const button = document.createElement("button");
    button.type = "button";
    button.dataset.add = book.id;
    button.textContent = isFavorite
      ? "Added to Favorites ✓"
      : "Add to Favorites ♥";
    button.disabled = isFavorite;
    button.className =
      "w-full rounded-lg bg-[#293B2B] px-4 py-2 text-white hover:bg-[#3F6948] disabled:cursor-not-allowed disabled:opacity-60";

    card.append(title, author, year, button);
    bookList.appendChild(card);
  });
}

// Retrieve books from the Open Library API.
async function loadBooks(searchTerm = "fiction") {
  if (!bookList) return;

  // Show loading feedback before making the request.
  bookList.replaceChildren();
  showStatus("Loading books...","loading");

  try {
   console.time("Books API loading time");
   const results = await fetchBooks(searchTerm);
   console.timeEnd("Books API loading time");

    // Convert API results into the format used by our book cards.
    books = results.map((book) => ({
      id: book.key,
      title: book.title || "Untitled",
      author: book.author_name?.join(", ") || "Unknown author",
      year: book.first_publish_year || null,
      cover: book.cover_i
        ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
        : null,
    }));

    if (books.length === 0) {
      showStatus("No results found. Try another book title.");
      return;
    }

    // Remove the loading message and display the books.
    booksStatus?.classList.add("hidden");
    renderBooks();
  } catch (error) {
    console.error("Could not load books:", error);
    books = [];
    bookList.replaceChildren();
    showStatus(
      "Unable to load books. Check your internet connection and try again.",
      "error"
    );
  }
}

// Search when the user clicks the button.
if (searchButton && searchInput) {
  searchButton.addEventListener("click", () => {
    const searchTerm = searchInput.value.trim();

    if (!searchTerm) {
      showStatus("Please enter a book title to search.");
      searchInput.focus();
      return;
    }

    loadBooks(searchTerm);
  });

  // Also allow the user to search by pressing Enter.
  searchInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      searchButton.click();
    }
  });
}

// Listen for clicks on Add to Favorites buttons.
if (bookList) {
  bookList.addEventListener("click", (event) => {
    const button = event.target.closest("[data-add]");

    if (!button) return;

    const bookId = button.dataset.add;
    const selectedBook = books.find(
      (book) => book.id === bookId
    );

    if (!selectedBook) return;

    addFavorite(selectedBook);
    renderBooks();
  });
}

// Load books when the homepage opens.
loadBooks();

// Sets up the responsive mobile navigation menu.
function setupMobileMenu() {
  const menuToggle = document.getElementById("menu-toggle");
  const mobileMenu = document.getElementById("mobile-menu");
  const menuIcon = document.getElementById("menu-icon");

  if (!menuToggle || !mobileMenu || !menuIcon) return;

  menuToggle.addEventListener("click", () => {
    const isClosed = mobileMenu.classList.contains("hidden");

    mobileMenu.classList.toggle("hidden");
    mobileMenu.classList.toggle("flex");

    menuIcon.textContent = isClosed ? "×" : "☰";

    menuToggle.setAttribute("aria-expanded", String(isClosed));
    menuToggle.setAttribute(
      "aria-label",
      isClosed ? "Close navigation menu" : "Open navigation menu"
    );
  });

  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.add("hidden");
      mobileMenu.classList.remove("flex");
      menuIcon.textContent = "☰";
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation menu");
    });
  });
}

setupMobileMenu();
