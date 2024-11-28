document.querySelector("#profileCreate").addEventListener("click", () => {
    chrome.storage.local.get(null, (items) => console.log(items))

    chrome.storage.local.get(["currentId"], (result) => { console.log(result.currentId)})

    //window.location.href = chrome.runtime.getURL("profile/profile.html");
    
})

document.querySelector("#test").addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs.length === 0) {
            console.error("No active tab found");
            return;
        }

        chrome.tabs.sendMessage(tabs[0].id, { action: "getH1" }, (response) => {
            
            console.log(response);
            
        });
    });
    

      
});