const ratings = [];
document.querySelectorAll('.rating_entry').forEach(entry => {
    const album = entry.querySelector('.album_name').textContent.trim();
    const artist = entry.querySelector('.artist_name').textContent.trim();
    const rating = entry.querySelector('.rating_stars').getAttribute('data-rating');
    ratings.push({ album, artist, rating });
});
chrome.runtime.sendMessage({ action: "storeRatings", data: ratings });

