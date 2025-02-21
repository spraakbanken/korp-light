# Korpi
A linguistic search engine built on [korp](https://spraakbanken.gu.se/korp/) and [korpsearch](https://github.com/heatherleaf/korpsearch)

## Getting Started with Korpi
Coming Soon!

## For Developers
### Quickstart
0. Have python (and virtual environment), node, npm, fastapi installed in your system!
1. Clone this Repository
```
git clone 
```
2. Open your favourite terminal (unix-based, backend code may not work on windows)
3. Change Directory into **backend** folder and run build_py_files.sh to build the backend corpora.
You may need to give executable permissions to this file.
```
cd backend
chmod +x build_py_files.sh
./build_py_files.sh
```
5. Change directory into **frontend**.
6. Install dependencies and start local server. Make sure you have node and npm installed.
```
npm install
npm run dev
```
7. See documentation in [frontend readme](/frontend/README.md)

### Project Structure
This project is structured into **frontend** and **backend** subfolders.
The **frontend** utilises React and Bootstrap, with vite.
The **backend** uses code from [korpsearch](https://github.com/heatherleaf/korpsearch) by Peter Ljunglöf.
