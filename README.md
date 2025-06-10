# Korpi

A linguistic search engine built on [korp](https://spraakbanken.gu.se/korp/) and [korpsearch](https://github.com/heatherleaf/korpsearch)

> [!NOTE]
> This is a partial copy of <https://git.chalmers.se/pomesh/korpi> (does not contain the folder `backend`).
> The original repo is a bachelor thesis at Chalmers written by Ludwig Alexandersson, Erik Dreifeldt, Pomesh Kumar, Lisa Wadenbrant, Ida Åberg.
> The bachelor thesis is called **Korpi - Developing a User-Friendly and Useful Frontend for a Corpus Search Engine**.

A demo of this repo is running at <https://korpi.netlify.app>.

You can find screenshots of the app running in a browser in the [screenshots](screenshots/) directory.

# Korpi frontend
See README.md in root directory for more information on building and running.

# Explanation of Files and Folders
## node_modules
All files and libraries needed by node (i.e. React, Bootstrap). Leave this folder alone. Change package.json if needed.
Added:
### Dependency Summaries

- **@dnd-kit/core**: Core library for building accessible drag-and-drop experiences in React with full control over sensors and events.
- **@dnd-kit/sortable**: Provides utilities for making sortable lists using the `@dnd-kit/core` system.
- **@dnd-kit/utilities**: Helper functions and utilities to support drag-and-drop logic, especially for collision detection and transformations.

- **@floating-ui/react**: Powerful positioning library for tooltips, popovers, and dropdowns in React, supporting dynamic placement and flipping.

- **@tanstack/react-query**: Server-state management library for React that simplifies data fetching, caching, and syncing with APIs.

- **axios**: Promise-based HTTP client for making API requests from the browser or Node.js.

- **bootstrap**: Popular CSS framework that offers prebuilt UI components and responsive grid layout styles.

- **chart.js**: Simple yet flexible JavaScript charting library for creating responsive, interactive visualizations.

- **lucide-react**: Collection of clean, consistent, and customizable open-source SVG icons for React, based on Lucide icons.

- **react**: Core library for building user interfaces with a component-based architecture and declarative rendering.

- **react-bootstrap**: React components built using Bootstrap styles and behaviors without relying on jQuery.

- **react-bootstrap-icons**: React wrapper for Bootstrap Icons, allowing easy integration of SVG-based icons in React apps.

- **react-chartjs-2**: React wrapper for Chart.js that provides declarative chart components compatible with React.

- **react-dom**: Package that provides DOM-specific methods to render React components in the browser.

- **react-icons**: Flexible icon library for React supporting many popular icon packs like FontAwesome, Material Icons, and more.

- **react-router-dom**: Declarative routing library for React apps, enabling dynamic navigation and nested routes.

- **shepherd.js**: Guide and tour library for web applications, used to walk users through features step by step.


## public
See if we need this towards deployment. Static assets.
## src

### assets
Images, movies, themes

### components
Each component is put in its own folder. The folder has the name of the component. It may also contain a stylesheet.
Each component should be self-contained as much as possible.

### pages
A page is a collection of components. For example the landing page will consist of a navbar and search component.
Each page is placed in its own folder, the name of the folder is the same as that of the page. When you have written a page, add it to routes.js (see pages/routes.js). 
Add a button to landing page that takes you to your page! See ResultsPage.jsx for example. Remember to wrap a Button around Link.

### services
Contains javascript code for interfacing with backend. All our api calls are placed in api.js. The that need to GET request from api can import the file. 
server_config.js contains the URL for the two APIs we will use.
