document.querySelector("#profileCreate").addEventListener("click", () => {

    window.location.href = chrome.runtime.getURL("profile/create/create.html");
    
})

// document.querySelector("#viewprofiles").addEventListener("click", () => {
//     chrome.storage.local.get(null, (items) => console.log(items))

//     chrome.storage.local.get(["currentId"], (result) => { console.log(result.currentId)})

//     chrome.storage.local.get(null, function (items) {
//         const keys = Object.keys(items);
//         console.log(keys)
//         console.log(keys[1])
//       })
    
// })

document.querySelector("#delete").addEventListener("click", () => {

    window.location.href = chrome.runtime.getURL("profile/delete/delete.html");
    
})

document.querySelector("#edit").addEventListener("click", () => {

    window.location.href = chrome.runtime.getURL("profile/edit/edit.html");
    
})

document.querySelector("#export").addEventListener("click", () => {

    window.location.href = chrome.runtime.getURL("profile/export/export.html");
    
})

document.querySelector("#import").addEventListener("click", () => {

    window.location.href = chrome.runtime.getURL("profile/import/import.html");
    
})

document.querySelector("#application").addEventListener("click", () => {

    window.location.href = chrome.runtime.getURL("profile/application/application.html");
    
})


const selectProfile = document.getElementById("selectProfile");
const profileFieldsContainer = document.getElementById("profileFields");


const loadProfiles = () => {
    selectProfile.innerHTML = '<option value="" disabled selected>Select a profile</option>';
    chrome.storage.local.get(["currentId"], (result) => {
    
      const currentId = result.currentId;
      for (let i = 1; i <= currentId; i++) {

          chrome.storage.local.get([`profile_${i}`], (res) => {
              const profileData = res[`profile_${i}`];
              if (profileData) {
                  const profile = JSON.parse(profileData);
                  const option = document.createElement("option");
                  option.value = profile.id;
                  option.textContent = profile.fields["Profile Name"] || `Profile ${profile.id}`;
                  selectProfile.appendChild(option);
              }
          })

          
      }
    })
    
};

const loadProfileFields = (profile) => {
    profileFieldsContainer.innerHTML = "";
    for (const [key, value] of Object.entries(profile.fields)) {
        const fieldContainer = document.createElement("div");
        fieldContainer.classList.add("form-group");

        const label = document.createElement("label");
        label.textContent = key;
        fieldContainer.appendChild(label);

        const input = document.createElement("input");
        input.type = "text";
        input.value = value;
        input.dataset.fieldName = key;
        fieldContainer.appendChild(input);

        profileFieldsContainer.appendChild(fieldContainer);
    }
};

chrome.storage.local.get(null, function (items) {
    const keys = Object.keys(items);
    if(keys.length > 0){
        loadProfiles();

        selectProfile.addEventListener("change", () => {
            const selectedValue = selectProfile.value;
            alert("profile switched")
            chrome.storage.local.set({ ["currentId"] : JSON.stringify(selectedValue) });
        })

    }else{
        document.querySelector(".form-group").style.display = "none"
        profileFieldsContainer.style.display = "none"
    }
})
