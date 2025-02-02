chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "storeRatings") {
        console.log("Received ratings:", message.data);
        chrome.storage.local.set({ ratings: message.data }, () => {
            console.log("Ratings stored successfully.");
        });
    } else if (message.action === "syncRatings") {
        chrome.storage.local.get("ratings", (data) => {
            console.log("Syncing ratings:", data.ratings);
            sendRatingsToMusicboard(data.ratings);
        });
    }
});

function sendRatingsToMusicboard(ratings) {
    if (!ratings || ratings.length === 0) {
        console.error("No ratings found to sync.");
        return;
    }
    
    fetch("https://musicboard.app/api/sync", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ ratings })
    })
    .then(response => response.json())
    .then(data => console.log("Sync successful:", data))
    .catch(error => console.error("Error syncing ratings:", error));
}
