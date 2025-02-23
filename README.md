# Korpi
A linguistic search engine built on [korp](https://spraakbanken.gu.se/korp/) and [korpsearch](https://github.com/heatherleaf/korpsearch)

## Getting Started with Korpi
Coming Soon!

## For Developers
### Quickstart
0. Have python (virtual environment called .env), node, npm, fastapi installed on your system!
1. Clone this Repository
```
git clone https://git.chalmers.se/pomesh/korpi.git 
```
2. Open your favourite terminal (unix-based, backend code may not work on windows)
3. Change Directory into **backend** folder and run run_server.sh to build the backend corpora and run the fastapi server.
You may need to give executable permissions to this file.
```
cd backend
chmod +x run_server.sh
./run_server.sh
```
5. Open new terminal and navigate into **frontend**.
6. Install dependencies and start local server for front end. Make sure you have node and npm installed.
```
npm install
npm run dev
```
7. See documentation in [frontend readme](/frontend/README.md)

### Project Structure
This project is structured into **frontend** and **backend** subfolders.
The **frontend** utilises React and Bootstrap, with vite.
The **backend** uses code from [korpsearch](https://github.com/heatherleaf/korpsearch) by Peter Ljunglöf.
