document.getElementById("syncBtn").addEventListener("click", () => {
    chrome.runtime.sendMessage({ action: "syncRatings" }, response => {
        console.log("Sync started!");
    });
});
