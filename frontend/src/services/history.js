// Simple Object to hold searched word and url
// use localstorage to presist information

const historyEntry = {};

export function setHistory(word, value) {
    const date = new Date();
    historyEntry[word] = {word: word, url: value, time: date.toLocaleString(), event: getLastSearched()};
    try {
        window.localStorage.setItem("search_history", 
            JSON.stringify(historyEntry));
    } catch (e) {
        console.log("Error Localstorage: ", e);
    }
}

export function removeHistoryItem(item) {
    const currentHistory = getHistory();
    delete currentHistory[item];
    window.localStorage.setItem('search_history', 
        JSON.stringify(currentHistory));
}

export function getHistory() {
    try {
        const searches = window.localStorage.getItem("search_history");
        return searches ? JSON.parse(searches) : undefined;
    } catch (e) {
        console.log("Error Localstorage: ", e);
    }
}

export function getLastSearched() {
    try {
        const searches = window.localStorage.getItem("last_searched");
        return searches ? JSON.parse(searches) : undefined;
    } catch (e) {
        console.log("Error Localstorage: ", e);
    }
}