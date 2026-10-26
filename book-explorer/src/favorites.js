
const STORAGE_KEY = "bookhaven-favorites";

// Get saved favorites from localStorage.
export function getFavorites() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

// Add a book to Favorites.
export function addFavorite(book) {
  const favorites = getFavorites();

  // Do not save the same book twice.
  if (favorites.some((favorite) => favorite.id === book.id)) {
    return favorites;
  }

  const updatedFavorites = [...favorites, book];

  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedFavorites));

  return updatedFavorites;
}

// Remove a book from Favorites using its ID.
export function removeFavorite(bookId) {
  const updatedFavorites = getFavorites().filter(
    (book) => book.id !== bookId
  );

  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedFavorites));

  return updatedFavorites;
}
