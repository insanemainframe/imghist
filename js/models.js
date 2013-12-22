function getImages(){
    chrome.storage.sync.get(['foo', 'bar'], print)
}
