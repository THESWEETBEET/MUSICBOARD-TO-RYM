chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "storeRatings") {
        console.log("Received ratings:", message.data);
        chrome.storage.local.set({ ratings: message.data });
    }
});

function fetchRatingsFromRYM() {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            files: ["content.js"]
        });
    });
}
