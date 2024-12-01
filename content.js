let crntId = null;



chrome.storage.local.get(null, function (items) {
  const keys = Object.keys(items);
  console.log(keys)
})

chrome.storage.local.get(["currentId"], (result) => {
  crntId = result.currentId;

  const forms = document.querySelectorAll("form");

  forms.forEach((form) => {
    let isApplicationForm = false;
    const keywords = [
      "firstname",
      "first-name",
      "lastname",
      "last-name",
      "fullname",
      "name",
      "surname",
      "cv",
      "job",
      "apply",
      "resume",
      "position",
      "career",
    ];

    const inputs = form.querySelectorAll('input[type="text"][name], input[type="tel"][name], input[type="email"][name], input[type="date"][name], textarea[name]');

    inputs.forEach((input) => {
      if (
        keywords.some(
          (keyword) =>
            input.name.toLowerCase().includes(keyword) ||
            input.id.toLowerCase().includes(keyword)
        )
      ) {
        isApplicationForm = true;
      }
    });

    if (isApplicationForm) {
      
      if (crntId !== null && crntId !== undefined) {
        const button = document.createElement("button");
        button.textContent = "Autofill";
        button.style.margin = "10px";
        button.type = "button";

        button.addEventListener("click", () => {
          chrome.storage.local.get([`profile_${crntId}`], (res) => {
            const profile = JSON.parse(res[`profile_${crntId}`]);
            console.log(profile);

            const fields = profile.fields;

            let flag = true;
            const nameKeywords = ["firstname", "first-name", "name"];
            inputs.forEach((input) => {
              if (
                nameKeywords.some(
                  (keyword) =>
                    input.name.toLowerCase().includes(keyword) ||
                    input.id.toLowerCase().includes(keyword)
                )
              ) {
                if (flag == true) {
                  let ad = fields["FullName"].split()[0];
                  input.value = ad;
                  flag = false;
                }
              }
            });

            if (fields["FullName"].split().length > 1) {
              flag = true;
              const surnameKeywords = [
                "surname",
                "second-name",
                "lastname",
                "last-name",
              ];
              inputs.forEach((input) => {
                if (
                  surnameKeywords.some(
                    (keyword) =>
                      input.name.toLowerCase().includes(keyword) ||
                      input.id.toLowerCase().includes(keyword)
                  )
                ) {
                  if (flag == true) {
                    let soyad = fields["FullName"].split()[1];
                    input.value = soyad;
                    flag = false;
                  }
                }
              });
            }

            inputs.forEach((input) => {
              Object.keys(fields).forEach((key) => {
                if (
                  (input.name &&
                    input.name.toLowerCase().includes(key.toLowerCase())) ||
                  (input.id &&
                    input.id.toLowerCase().includes(key.toLowerCase())) ||
                  (input.placeholder &&
                    input.placeholder.toLowerCase().includes(key.toLowerCase()))
                ) {
                  input.value = fields[key];
                }
              });
            });
          });
        });

        // form.insertBefore(button, form.firstChild);
        form.appendChild(button);
      }

      const button2 = document.createElement("button");
      button2.textContent = "Save For Future Submissions";
      button2.style.margin = "10px";
      button2.type = "button";

      button2.addEventListener("click", () => {
        const formData = {};

        inputs.forEach((element) => {
          const name = element.name; 
          const value = element.value;

          if (value.trim() !== "") {
            formData[name] = value; 
          }
        });

        
        let profileName = prompt("Please enter name for profile");

        formData['Profile Name'] = profileName

        chrome.storage.local.get(["currentId"], (result) => {
      

          let currentId = result.currentId ? parseInt(result.currentId) : 0;
  
          currentId++;
          
          chrome.storage.local.set({[`profile_${currentId}`] : JSON.stringify({id: currentId, fields : formData})}, function () {
            console.log(`"${profileName}" Saved.`)
              alert(`"${profileName}" Saved.`);
          });
        })

        

      });

      // form.insertBefore(button, form.firstChild);
      form.appendChild(button2);
    }
  });
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "alertTest") {
    console.log(message.ferid);
  }

  if (message.action === "getLinkedin") {
    
    const fullName = document.querySelector(".ph5 > .mt2 > div:first-child > div:first-child > span:first-child h1")?.textContent || "No H1 found";

    const description = document.querySelector(".ph5 > .mt2 > div:first-child > div:last-child")?.textContent || "No H1 found";

    const experienceLis = (document.querySelector("#experience")) ? Array.from(document.querySelector("#experience").nextElementSibling.nextElementSibling.querySelector("ul").children) : null
    const educationLis = (document.querySelector("#education")) ? Array.from(document.querySelector("#education").nextElementSibling.nextElementSibling.querySelector("ul").children) : null
    const licensesLis = (document.querySelector("#licenses_and_certifications")) ? Array.from(document.querySelector("#licenses_and_certifications")?.nextElementSibling.nextElementSibling.querySelector("ul").children) : null
    let name = ""
    let test = ""

    let details = {
        fullName : fullName,
        description : description,
        experience : [],
        education : [],
        licenses : [],
        skills : [],
    }

    if(experienceLis !== null)
    experienceLis.forEach(li => {
        let companyName

        if(li.querySelectorAll(".AkLKBtjIVUOofkzfJtyfidxlZrKVzELxjIDjwXM").length > 0){

            companyName = li.querySelector("div:first-child > div:nth-child(2) > div:first-child span:first-child")?.textContent
            let jobs = Array.from(li.querySelector("div:first-child > div:nth-child(2) > div:nth-child(2) > ul").children)

            let jobNames = []

            jobs.forEach(job => {
                jobTitle = job.querySelector("div > div:nth-child(2) > div").querySelector("span:first-child").textContent
                jobNames.push(jobTitle)
            })

            details.experience.push(`${jobNames.join(", ")} at ${companyName}`)

        }else{
            companyName = li.querySelector("div:first-child > div:nth-child(2) > div:first-child span span[aria-hidden=true]").textContent
            let jobName = li.querySelector("div:first-child > div:nth-child(2) > div:first-child span:first-child")?.textContent
            details.experience.push(`${jobName} at ${companyName}`)
        }

    });

    if(educationLis !== null)
    educationLis.forEach(li => {

        let first = li.querySelector("div:first-child > div:nth-child(2) > div:first-child span span[aria-hidden=true]").textContent
        let second = li.querySelector("div:first-child > div:nth-child(2) > div:first-child span:first-child")?.textContent;

        details.education.push(`${first} at ${second}`)

    })

    if(licensesLis !== null)
    licensesLis.forEach(li => {
        let first = li.querySelector("div:first-child > div:nth-child(2) > div:first-child span:first-child")?.textContent;
        details.licenses.push(first)
    })

    let skillLis = (document.querySelector("#skills")) ? Array.from(document.querySelector("#skills").nextElementSibling.nextElementSibling.querySelector("ul").children) : null

    if(skillLis !== null)
    skillLis.forEach(li => {
        skill = li.querySelector("div:first-child > div:nth-child(2) > div:first-child span:first-child")?.textContent;
        details.skills.push(skill)
    })

    // setTimeout(() => {
    //     skillLis = Array.from(document.querySelector("main .AinqZszEaqmDcYpPBIjkVYrtmukhMyPEwICOZok").children)

    //     skillLis.forEach(li => {
    //         skill = li.querySelector("span[aria-hidden=true]").textContent
    //         details.skills.push(skill)
    //     })

    //     setTimeout(() => {
    //         sendResponse({ status: "ok", data: {fullName, description, details} });
    //     }, 1000);
    // }, 5000);

    // chrome.tabs.sendMessage({ action: "newtab" }, (response) => {

    //     alert(response);

    // });

    sendResponse({
      status: "ok" , data: {fullName, description, details} ,
    });

    return true;
  }

  return true;
});
