
import "./style.css";
import { getFavorites, addFavorite } from "./favorites.js";

const books = [
  {
    id: 1,
    title: "Atomic Habits",
    author: "James Clear",
    cover: "https://covers.openlibrary.org/b/isbn/9780735211292-M.jpg",
  },
  {
    id: 2,
    title: "The Alchemist",
    author: "Paulo Coelho",
    cover: "https://covers.openlibrary.org/b/isbn/9780061122415-M.jpg",
  },
  {
    id: 3,
    title: "Rich Dad Poor Dad",
    author: "Robert T. Kiyosaki",
    cover: "https://covers.openlibrary.org/b/isbn/9781612680194-M.jpg",
  },
  {
    id: 4,
    title: "Think and Grow Rich",
    author: "Napoleon Hill",
    cover: "https://covers.openlibrary.org/b/isbn/9781585424337-M.jpg",
  },
];

const bookList = document.getElementById("book-list");

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

    const cover = document.createElement("img");
    cover.src = book.cover;
    cover.alt = `Cover of ${book.title}`;
    cover.loading = "lazy";
    cover.className = "mb-4 h-56 w-full rounded-lg object-contain";

    const title = document.createElement("h3");
    title.textContent = book.title;
    title.className = "text-lg font-semibold text-[#26372D]";

    const author = document.createElement("p");
    author.textContent = `By ${book.author}`;
    author.className = "mb-4 mt-2 text-sm text-[#687665]";

    const button = document.createElement("button");
    button.type = "button";
    button.dataset.add = String(book.id);
    button.textContent = isFavorite
      ? "Added to Favorites ✓"
      : "Add to Favorites ♥";
    button.disabled = isFavorite;
    button.className =
      "w-full rounded-lg bg-[#293B2B] px-4 py-2 text-white hover:bg-[#3F6948] disabled:cursor-not-allowed disabled:opacity-60";

    card.append(cover, title, author, button);
    bookList.appendChild(card);
  });
}

// Listen for clicks on the book list.
if (bookList) {
  bookList.addEventListener("click", (event) => {
    const button = event.target.closest("[data-add]");

    // Ignore clicks that are not on an Add button.
    if (!button) return;

    const bookId = Number(button.dataset.add);
    const selectedBook = books.find((book) => book.id === bookId);

    if (!selectedBook) return;

    // Save the selected book and refresh the homepage.
    addFavorite(selectedBook);
    renderBooks();
  });
}

// Show the books when the homepage loads.
renderBooks();
