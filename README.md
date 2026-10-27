# BookHaven — Book Explorer Web App

A responsive, interactive book discovery application built with HTML, Tailwind CSS, and JavaScript. BookHaven allows users to explore books from the Open Library API, search by title, and save their favorite books for later.

## About the Project

BookHaven was developed as the final mini capstone for **Responsive & Interactive Web App Development**. The project brings together responsive web design, DOM manipulation, JavaScript modules, asynchronous API integration, browser storage, and GitHub collaboration workflows.

The goal is to create a user-friendly experience that helps readers discover books across desktop, tablet, and mobile devices.

## Features

- **Responsive design:** Adapts to mobile, tablet, and desktop screens.
- **Book discovery:** Fetches real book information from the Open Library API.
- **Search functionality:** Allows users to search for books by title.
- **Book covers:** Displays available book cover images.
- **Favorites:** Allows users to save books to their favorites.
- **Persistent storage:** Uses `localStorage` to retain saved favorites after refreshing the browser.
- **Loading and error feedback:** Displays messages while books load and when requests fail or no results are found.
- **Multiple pages:** Includes Home, Favorites, and About pages.
- **Mobile navigation:** Provides a responsive navigation menu for smaller screens.

## Technologies Used

- HTML5
- Tailwind CSS v4
- JavaScript (ES6+)
- Vite
- Open Library Search API
- Browser `fetch()`, `async/await`, and DOM events
- JavaScript ES6 modules
- `localStorage`
- Git and GitHub

## API Used

BookHaven uses the Open Library Search API to retrieve book information.

**API endpoint:**  
https://openlibrary.org/search.json

The application uses the API response to display information such as book titles, authors, publication years, and available cover images.

## Getting Started

### Prerequisites

Make sure you have installed:

- [Node.js](https://nodejs.org/)
- npm, which is included with Node.js
- Git, if you want to clone the repository

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/niyomubyeyi150-sudo/Book-Explorer-Web-App.git
   ```

2. Navigate to the project folder:

   ```bash
   cd Book-Explorer-Web-App
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open the local URL shown in your terminal, usually:

   ```text
   http://localhost:5173/
   ```

To create a production build, run:

```bash
npm run build
```

## Project Structure

The project includes the following main files and pages:

```text
Book-Explorer-Web-App/
├── index.html          # Homepage and book search interface
├── favorites.html      # Saved favorite books
├── about.html          # About the application
├── src/
│   ├── main.js         # Homepage rendering, search, and interactions
│   ├── fetchBooks.js   # API requests for book data
│   ├── favorites.js    # Favorite-book management and persistence
│   └── style.css       # Tailwind CSS import and styling
├── package.json        # Project scripts and dependencies
├── vite.config.js      # Vite and Tailwind configuration
└── README.md           # Project documentation
```

## Learning Outcomes

Through this project, I practiced:

- Building responsive layouts with HTML and Tailwind CSS.
- Using JavaScript to respond to user interactions and update the DOM.
- Fetching data from a public API with `fetch()`, `async/await`, and error handling.
- Organizing functionality into reusable JavaScript modules.
- Saving and retrieving user data with `localStorage`.
- Managing project changes using Git and GitHub branches.
- Practicing collaboration workflows through pull requests, issues, and task tracking.

## GitHub Collaboration

During the project, GitHub workflows were used to organize and manage development work, including:

- Feature branches for individual improvements.
- Pull requests for integrating changes.
- Issues for tracking bugs and improvements.
- GitHub Projects for organizing development tasks.

## Future Improvements

- Add book categories and sorting options.
- Improve search filters.
- Add pagination or a load-more feature.
- Improve accessibility and automated testing.
- Display more detailed information for each book.

GitHub: [@niyomubyeyi150-sudo](https://github.com/niyomubyeyi150-sudo/Book-Explorer-Web-App.git)
livelink:[vercel.com link](https://book-explorer-web-app.vercel.app/)


