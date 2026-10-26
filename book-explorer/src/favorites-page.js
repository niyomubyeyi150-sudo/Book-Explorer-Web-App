
import { getFavorites, removeFavorite } from "./favorites.js";

const favoritesList = document.getElementById("favorites-list");
const favoritesEmpty = document.getElementById("favorites-empty");

// Display all saved favorite books.
function renderFavorites() {
  const favorites = getFavorites();

  favoritesList.replaceChildren();

  favoritesEmpty.classList.toggle("hidden", favorites.length > 0);

  favorites.forEach((book) => {
    const card = document.createElement("article");
    card.className =
      "rounded-2xl border border-[#E5E3D9] bg-white p-4 shadow-sm";

    const cover = document.createElement("img");
    cover.src = book.cover;
    cover.alt = `Cover of ${book.title}`;
    cover.loading = "lazy";
    cover.className = "mb-4 h-56 w-full rounded-lg object-contain";

    const title = document.createElement("h2");
    title.textContent = book.title;
    title.className = "text-lg font-semibold text-[#26372D]";

    const author = document.createElement("p");
    author.textContent = `By ${book.author}`;
    author.className = "mb-4 mt-2 text-sm text-[#687665]";

    const button = document.createElement("button");
    button.type = "button";
    button.dataset.remove = String(book.id);
    button.textContent = "Remove from Favorites";
    button.className =
      "w-full rounded-lg border border-red-600 px-4 py-2 text-red-600 hover:bg-red-50";

    card.append(cover, title, author, button);
    favoritesList.appendChild(card);
  });
}

// Listen for clicks on Remove buttons.
favoritesList.addEventListener("click", (event) => {
  const button = event.target.closest("[data-remove]");

  if (!button) return;

  removeFavorite(Number(button.dataset.remove));

  // Refresh the page's favorites list.
  renderFavorites();
});

// Display saved books when the page opens.
renderFavorites();
