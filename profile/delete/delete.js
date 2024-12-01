document.addEventListener("DOMContentLoaded", () => {
    const profilesList = document.getElementById("profilesList");
  
    const displayProfiles = () => {
      profilesList.innerHTML = "";
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith("profile_")) {
          const profile = JSON.parse(localStorage.getItem(key));
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
              localStorage.removeItem(key);
              alert(`Profile "${profileName}" has been deleted.`);
              displayProfiles();
            }
          });
  
          profileDiv.appendChild(profileNameSpan);
          profileDiv.appendChild(deleteButton);
  
          profilesList.appendChild(profileDiv);
        }
      }
    };
  
    displayProfiles();
  });
  