// Simple Object to hold searched word and url
// use localstorage to presist information

const historyEntry = {};

export function setHistory(word, value) {
    historyEntry[word] = value;
    console.log(historyEntry);
    try {
        window.localStorage.setItem("search_history", 
            JSON.stringify(historyEntry));
    } catch (e) {
        console.log("Error Localstorage: ", e);
    }
}

export function getHistory() {
    try {
        const searches = window.localStorage.getItem("search_history");
        return searches ? JSON.parse(searches) : undefined;
    } catch (e) {
        console.log("Error Localstorage: ", e);
    }
}