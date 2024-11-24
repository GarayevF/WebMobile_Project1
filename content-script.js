chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "sendUrl") {
        console.log("Received URL:", message.url);

        // chrome.tabs.create({ url: "https://www.linkedin.com/in/farid-garayev/", active: false }, (tab) => {
        //     
        //     console.log(`Tab opened with ID: ${tab.id}`);
        // }); 
        
        const processedData = `URL received: ${message.url}`;

        sendResponse({ status: "success", data: processedData });

        return true; 
    }
});