# Korpi frontend
See README.md in root directory for more information on building and running.

# Explanation of Files and Folders
## node_modules
All files and libraries needed by node (i.e. React, Bootstrap). Leave this folder alone. Change package.json if needed.
Added:
- 
- Axios library for server requests.
- react-router-dom for client side routing.

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