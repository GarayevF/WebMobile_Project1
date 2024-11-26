chrome.runtime.sendMessage(
  { action: "getLocalStorage", key: "currentId"},
  (response) => {
    console.log(response.value == undefined);
  }
);

const forms = document.querySelectorAll('form');

forms.forEach(form => {
    
    const button = document.createElement("button");
    button.textContent = "New Buton";
    button.style.margin = "10px";
    button.type = "button";
  
    
    button.addEventListener('click', () => {

        
             
      
    });
  
    
    form.insertBefore(button, form.firstChild);
  });




chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    
    if (message.action === "alertTest") {
        console.log(message.ferid);
      }

    if (message.action === "getH1") {

        // chrome.runtime.sendMessage({ action: "test1" }, (response) => {
        //     alert(response.data)
        // });

        chrome.runtime.sendMessage({ action: "startCollection" }, (response) => {
            if (response && response.status === "completed") {
                
              alert("Collected Data:", response.collectedTexts);
              
              // Gerekirse sayfaya veri ekleyebilirsiniz
            }
            sendResponse({ status: "ok", data: response })
          });





         
        // const fullName = document.querySelector(".ph5 > .mt2 > div:first-child > div:first-child > span:first-child h1")?.textContent || "No H1 found";
        
        // const description = document.querySelector(".ph5 > .mt2 > div:first-child > div:last-child")?.textContent || "No H1 found";
        
        // const experienceLis = Array.from(document.querySelector("#experience").nextElementSibling.nextElementSibling.querySelector("ul").children)
        // const educationLis = Array.from(document.querySelector("#education").nextElementSibling.nextElementSibling.querySelector("ul").children)
        // const licensesLis = (document.querySelector("#licenses_and_certifications")) ? Array.from(document.querySelector("#licenses_and_certifications")?.nextElementSibling.nextElementSibling.querySelector("ul").children) : null    
        // let name = ""
        // let test = ""

        // let details = {
        //     fullName : fullName,
        //     description : description,
        //     experience : [],
        //     education : [],
        //     licenses : [],
        //     skills : [],
        //     languages : []
        // }

        // experienceLis.forEach(li => {
        //     let companyName

        //     if(li.querySelectorAll(".AkLKBtjIVUOofkzfJtyfidxlZrKVzELxjIDjwXM").length > 0){

        //         companyName = li.querySelector("div:first-child > div:nth-child(2) > div:first-child span:first-child")?.textContent
        //         let jobs = Array.from(li.querySelector("div:first-child > div:nth-child(2) > div:nth-child(2) > ul").children)
            
        //         let jobNames = []

        //         jobs.forEach(job => {
        //             jobTitle = job.querySelector("div > div:nth-child(2) > div").querySelector("span:first-child").textContent
        //             jobNames.push(jobTitle)
        //         })

        //         details.experience.push(`${jobNames.join(", ")} at ${companyName}`)

        //     }else{
        //         companyName = li.querySelector("div:first-child > div:nth-child(2) > div:first-child span span[aria-hidden=true]").textContent
        //         let jobName = li.querySelector("div:first-child > div:nth-child(2) > div:first-child span:first-child")?.textContent
        //         details.experience.push(`${jobName} at ${companyName}`)
        //     }
            
        // });

        // educationLis.forEach(li => {

        //     let first = li.querySelector("div:first-child > div:nth-child(2) > div:first-child span span[aria-hidden=true]").textContent
        //     let second = li.querySelector("div:first-child > div:nth-child(2) > div:first-child span:first-child")?.textContent;
        
        //     details.education.push(`${first} at ${second}`)
        
        // })

        // if(licensesLis !== null)
        // licensesLis.forEach(li => {
        //     let first = li.querySelector("div:first-child > div:nth-child(2) > div:first-child span:first-child")?.textContent;
        //     details.licenses.push(first)
        // })

        // let url = document.querySelector("#skills").nextElementSibling.nextElementSibling.querySelector(".pvs-list__footer-wrapper a").href
        
        // // let skillLis = Array.from(document.querySelector("#skills").nextElementSibling.nextElementSibling.querySelector("ul").children)

        // // skillLis.forEach(li => {
        // //     skill = li.querySelector("div:first-child > div:nth-child(2) > div:first-child span:first-child")?.textContent;
        // //     details.skills.push(skill)
        // // })

        
        

        // // setTimeout(() => {
        // //     skillLis = Array.from(document.querySelector("main .AinqZszEaqmDcYpPBIjkVYrtmukhMyPEwICOZok").children)

        // //     skillLis.forEach(li => {
        // //         skill = li.querySelector("span[aria-hidden=true]").textContent
        // //         details.skills.push(skill)
        // //     })

        // //     setTimeout(() => {
        // //         sendResponse({ status: "ok", data: {fullName, description, details} });
        // //     }, 1000);
        // // }, 5000);
        
        // // chrome.tabs.sendMessage({ action: "newtab" }, (response) => {
            
        // //     alert(response);
            
        // // });
        
        
        sendResponse({ status: "ok" /*, data: {fullName, description, details} */ } );
        
        


        return true;
        
    }

    return true;
});