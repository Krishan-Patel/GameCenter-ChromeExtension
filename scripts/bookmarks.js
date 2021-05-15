let bookmarks_container = document.querySelector('.bookmarks')
// loads in bookmark data from chrome storage sync API and dynamically adds it to the page
window.addEventListener('load', () => { 
    chrome.storage.sync.get('bookmarks', (result) => { 
        if (result) {
        result.bookmarks.forEach(entry => {
            const link = document.createElement('a'); 
            const img = document.createElement('img'); 
            img.src = entry.img; 
            link.href = entry.url;
            link.appendChild(img); 
            bookmarks_container.appendChild(link)
        });
    }
    })
})