document.querySelector("#test").addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs.length === 0) {
            console.error("No active tab found");
            return;
        }

        chrome.tabs.sendMessage(tabs[0].id, { action: "getH1" }, (response) => {
            
                console.log("Response:", response);
            
        });
    });
});