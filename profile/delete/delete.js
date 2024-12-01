document.addEventListener("DOMContentLoaded", () => {
    const profilesList = document.getElementById("profilesList");
  
    const displayProfiles = () => {
      profilesList.innerHTML = "";

      chrome.storage.local.get(null, function (items) {
        const keys = Object.keys(items);
      
        for (let i = 0; i < keys.length; i++) {
          const key = keys[i];
          if (key.startsWith("profile_")) {

            chrome.storage.local.get(key, (result) => {
              const profile = JSON.parse(result[key]);
              const profileName = profile.fields["Profile Name"];
      
              const profileDiv = document.createElement("div");
              profileDiv.classList.add("profile");
      
              const profileNameSpan = document.createElement("span");
              profileNameSpan.classList.add("profile-name");
              profileNameSpan.textContent = profileName;
      
              const deleteButton = document.createElement("button");
              deleteButton.classList.add("delete");
              deleteButton.textContent = "Delete";
              deleteButton.addEventListener("click", () => {
                if (confirm(`Are you sure you want to delete profile "${profileName}"?`)) {
                  chrome.storage.local.remove(key, () => {
                    alert(`Profile "${profileName}" has been deleted.`);
                    displayProfiles();
                  });
                  
                }
              });
      
              profileDiv.appendChild(profileNameSpan);
              profileDiv.appendChild(deleteButton);
      
              profilesList.appendChild(profileDiv);
              });

            
          }
        }

      })


      
    };
  
    displayProfiles();
  });
  