// Default context values
let _settings = {   
    "resultsPerPage": 20,
    "sampleSize": 1,
    "contextSize": 10,
    "theme": "light",
    "selectedView": "wide",
    "api": 0,
}

export function setLocalSettings(val) {
    try {
        window.localStorage.setItem('settings', JSON.stringify(val));
    } catch (e) {
        console.log('Error localStorage settings: ', e);
    }
}

export function getLocalSettings() {
    try {
        const val = window.localStorage.getItem('settings')
        return val ? JSON.parse(val) : _settings;
    } catch (e) {
        console.log('Error localStorage settings: ', e);
    }
}
