# Gutendex - Book Discovery App

A modern and responsive web application for discovering and exploring classic literature from Project Gutenberg. The application uses the Gutendex API to search for books, browse books by category, view detailed information, and save favorite books locally.

🌐 **Live Demo:** https://yurii1025.github.io/Gutendex/

## Features

### 📚 Book Search

Search for books by title, author, or keyword using the Gutendex API. Search results are displayed in a responsive book grid.

### 🏷️ Browse by Category

Explore books by different topics and categories, including:

* Fiction
* Mystery
* Thriller
* Romance
* Fantasy
* Morality
* Society
* Power
* Justice
* Adventure
* Tragedy
* War
* Philosophy

Categories are available through the navigation menu and are loaded dynamically from the Gutendex API.

### 📖 Book Details

Open any book to view additional information, including:

* Book title
* Author
* Cover image
* Download count
* Available languages
* Link to read the book online

### ❤️ Favorites

Save books to your personal favorites list.

Favorites are stored in the browser's `localStorage`, so the selected books remain available after refreshing or reopening the application.

### 📱 Responsive Navigation

The application includes a responsive navigation system with:

* Desktop navigation
* Category dropdown menu
* Mobile sidebar menu
* Search functionality
* Active route highlighting

### ⚡ Pagination

Search and category results support navigation between pages using the `next` and `previous` URLs provided by the Gutendex API.

### ⏳ Loading & Error States

The application provides visual feedback while data is loading and displays error messages when an API request fails.

## Tech Stack

### Frontend

* **React 19** - UI library for building interactive components
* **React Router 7** - Client-side routing and navigation
* **Vite 7** - Fast development server and production build tool
* **CSS Modules** - Component-scoped styling
* **Gutendex API** - REST API providing access to Project Gutenberg books

### Development Tools

* **ESLint** - JavaScript and React code quality checking
* **GitHub Pages** - Static hosting and deployment
* **gh-pages** - Deployment package for publishing the production build

The project dependencies and npm scripts are defined in `package.json`.

## Project Structure

```text
Gutendex/
├── public/
│
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── Header.module.css
│   │   ├── BookCard.jsx
│   │   ├── BookCard.module.css
│   │   ├── BookList.jsx
│   │   ├── BookList.module.css
│   │   ├── Loader.jsx
│   │   └── Loader.module.css
│   │
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Home.module.css
│   │   ├── Category.jsx
│   │   ├── BookDetails.jsx
│   │   ├── BookDetails.module.css
│   │   ├── Favorites.jsx
│   │   └── Favorites.module.css
│   │
│   ├── assets/
│   │   └── book.png
│   │
│   ├── App.jsx
│   ├── App.css
│   ├── main.jsx
│   └── index.css
│
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
├── eslint.config.js
└── README.md
```

## Application Architecture

The application is organized around reusable React components and route-based pages.

### Components

**`Header`**

Provides the main application navigation, search form, category dropdown, and responsive mobile sidebar.

It also handles navigation state and automatically closes the category menu when the route changes.

**`BookCard`**

Reusable component responsible for displaying an individual book preview with its cover, title, and author.

It also supports removing a book from favorites when used on the Favorites page.

**`BookList`**

Reusable grid container that renders a collection of books using `BookCard` components.

**`Loader`**

Displays an animated loading indicator while book data is being requested from the API.

### Pages

**`Home`**

The main page of the application. It handles book searching, API requests, loading/error states, and pagination.

**`Category`**

Displays books filtered by a selected topic using a dynamic route parameter. Category results also support pagination.

**`BookDetails`**

Displays detailed information about a selected book and provides actions for adding or removing the book from favorites and opening the book online.

**`Favorites`**

Displays all books saved by the user. If no books have been saved, an empty-state message is shown.

## Routing

The application uses React Router with the following routes:

| Route             | Description                 |
| ----------------- | --------------------------- |
| `/`               | Home page and book search   |
| `/favorites`      | Saved favorite books        |
| `/category/:name` | Books filtered by category  |
| `/book/:id`       | Details for a specific book |

The router uses `/Gutendex/` as its basename to support deployment on GitHub Pages.

## Data Source

Book data is provided by the **Gutendex API**, a free API for accessing metadata from Project Gutenberg.

The application uses API endpoints for:

* Searching books
* Filtering books by topic
* Retrieving individual book details
* Pagination through API-provided `next` and `previous` URLs

Examples of requests used by the application:

```text
https://gutendex.com/books?search={query}
```

```text
https://gutendex.com/books?topic={category}
```

```text
https://gutendex.com/books/{id}
```

## State Management

The application uses React state and React Router's `Outlet` context instead of an external state management library.

The root `App` component manages:

* Current search term
* Favorites
* Adding books to favorites
* Removing books from favorites

Favorites are initialized from `localStorage` and synchronized whenever the favorites list changes.

This approach keeps the application lightweight while allowing shared state to be accessed by child routes.

## Getting Started

### Prerequisites

Make sure you have the following installed:

* **Node.js** (LTS version recommended)
* **npm**

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/Yurii1025/Gutendex.git
cd Gutendex
```

2. **Install dependencies**

```bash
npm install
```

3. **Start the development server**

```bash
npm run dev
```

The application will be available at:

```text
http://localhost:5173
```

## Available Scripts

| Script            | Description                                 |
| ----------------- | ------------------------------------------- |
| `npm run dev`     | Start the Vite development server           |
| `npm run build`   | Build the application for production        |
| `npm run preview` | Preview the production build locally        |
| `npm run lint`    | Run ESLint and check the codebase           |
| `npm run deploy`  | Deploy the production build to GitHub Pages |

These scripts correspond to the current project configuration.

## Deployment

The application is configured for deployment to GitHub Pages.

Vite uses `/Gutendex/` as the production base path:

```js
export default defineConfig({
  plugins: [react()],
  base: '/Gutendex/',
});
```

The React Router configuration uses the same `/Gutendex/` basename to ensure that client-side routes work correctly after deployment.

To create a production build:

```bash
npm run build
```

To deploy the `dist` directory to GitHub Pages:

```bash
npm run deploy
```

## Responsive Design

The application is designed to work across different screen sizes.

The desktop navigation provides quick access to:

* Home
* Favorites
* Categories
* Search

On smaller screens, the navigation switches to a mobile sidebar with a dedicated menu button and overlay.

## Error Handling

API requests include loading and error states.

While a request is in progress, the `Loader` component is displayed. If the request fails, the application displays an error message instead of leaving the user with an empty interface.

## Future Improvements

Possible improvements for future versions include:

* 🔎 Debounced search
* 🔢 Improved pagination controls
* 📚 Sorting and advanced filtering
* 🌙 Dark mode
* 🔖 Persistent URL-based search queries
* 🧪 Automated unit and integration tests
* ⚠️ More detailed API error handling
* 📖 Additional book metadata
* ♻️ Centralized API service layer
* 🎨 Further UI and accessibility improvements

## License

This project is intended as a learning and portfolio project.

Book metadata and content are provided through the Gutendex API and Project Gutenberg.
