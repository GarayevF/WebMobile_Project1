
chrome.runtime.onMessage.addListener(async(message, sender, sendResponse) => {

  
  if (message.action === "getLocalStorage") {
    
    chrome.storage.local.get([message.key], (result) => {
      sendResponse({ data: result });
    });
    
  }

    if (message.action === "newtab") {

        sendResponse({ status: "ok", data: "salamkd" });
        
        chrome.tabs.create({ url: "" }, function (tab) {
        

            chrome.scripting.executeScript(
                {
                  target: { tabId: tab.id },
                  func: getData
                },
                () => {
                  
                  chrome.tabs.onUpdated.removeListener(listener);
                }
              );
            // chrome.tabs.onUpdated.addListener(function listener(tabId, changeInfo) {
            //   if (tabId === tab.id && changeInfo.status === "complete") {
                
            //     chrome.scripting.executeScript(
            //       {
            //         target: { tabId: tab.id },
            //         func: function(){
            //             alert("salam")
            //         }
            //       },
            //       () => {
            //         alert("salam")
            //         chrome.tabs.onUpdated.removeListener(listener);
            //       }
            //     );
            //   }
            // });
    
    
          });


    }

    if (message.action === "closeTab") {
        chrome.tabs.remove(sender.tab.id); 
      }

    if (message.action === "startCollection") {
      collectedTexts = [];
      let url = message.url
      const text = await fetchTextFromTab(url);
      collectedTexts.push({ url, text });
      sendResponse({ status: "completed", collectedTexts });
      return true;
    }
 });

 function getData() {
    setTimeout(() => {
        let skillLis = Array.from(document.querySelector("main .AinqZszEaqmDcYpPBIjkVYrtmukhMyPEwICOZok").children)
        let skills = []
        skillLis.forEach(li => {
            let skill = li.querySelector("span[aria-hidden=true]").textContent
            skills.push(skill)
        })
        chrome.runtime.sendMessage({ action: "closeTab" });
    }, 3000);
    
    
    
  }


  async function fetchTextFromTab(url) {
    return new Promise((resolve) => {
      chrome.tabs.create({ url, active: true }, (tab) => {
        const tabId = tab.id;
        
        chrome.scripting.executeScript(
          {
            target: { tabId },
            func: () => {
              
              return document.body.scrollHeight
              
              
            },
          },
          (results) => {
            if (results && results[0].result) {
              resolve(results[0].result);
            }
            
            //chrome.tabs.remove(tabId); // Tabı kapat
          }
        );
      });
      
    });
  }

  

  // function fetchTextFromTab(url) {
  //   return new Promise((resolve) => {
  //     chrome.tabs.create({ url, active: true }, (tab) => {
  //       const tabId = tab.id;
        
  //       chrome.tabs.onUpdated.addListener(function listener(updatedTabId, changeInfo) {
  //         if (updatedTabId === tabId && changeInfo.status === "complete") {
  //           
  //           chrome.scripting.executeScript(
  //             {
  //               target: { tabId },
  //               func: () => {
  //                 return document.querySelector("main").innerHTML
  //               },
  //             },
  //             (results) => {
  //               chrome.tabs.onUpdated.removeListener(listener);
  //               resolve(results && results[0].result ? results[0].result : "No content");
  //             }
  //           );
  //         }
  //       });
  //     });
  //   });
  // }

