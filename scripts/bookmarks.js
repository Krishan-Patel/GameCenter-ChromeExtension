let bookmarks_container = document.querySelector('.bookmarks')
window.addEventListener('load', () => { 
    chrome.storage.local.get('bookmarks', (result) => { 
        result.bookmarks.forEach(entry => {
            const link = document.createElement('a'); 
            const img = document.createElement('img'); 
            img.src = entry.img; 
            link.href = entry.url;
            link.appendChild(img); 
            bookmarks_container.appendChild(link)
        });
    })
})