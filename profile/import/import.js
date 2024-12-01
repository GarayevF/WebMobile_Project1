document.addEventListener("DOMContentLoaded", () => {
    const importInput = document.getElementById("fileInput");
    const importBtn = document.getElementById("importButton");
    const fileNameDisplay = document.getElementById("fileName");
  
    importBtn.disabled = true;
  
    const getNextProfileId = () => {
      let currentId = localStorage.getItem("currentId") ? parseInt(localStorage.getItem("currentId")) : 1;
      localStorage.setItem("currentId", currentId + 1);
      return currentId;
    };
  
    importInput.addEventListener("change", () => {
      const file = importInput.files[0];
      if (file && file.name.split('.').pop().toLowerCase() === 'json') {
        importBtn.disabled = false;
        fileNameDisplay.textContent = `Selected File: ${file.name}`;
        fileNameDisplay.style.visibility = "visible";
      } else {
        importBtn.disabled = true;
        fileNameDisplay.textContent = "";
        fileNameDisplay.style.visibility = "hidden";
      }
    });
  
    importBtn.addEventListener("click", () => {
      const file = importInput.files[0];
  
      if (!file) {
        alert("Please select a file to import.");
        return;
      }
  
      const reader = new FileReader();
  
      reader.onload = () => {
        try {
          const profileData = JSON.parse(reader.result);
  
          if (!profileData["Profile Name"]) {
            alert("Invalid profile format. 'Profile Name' is required.");
            return;
          }
          
          const requiredFields = ["FullName", "Email", "Experience", "Education", "Skills"];
          for (const field of requiredFields) {
            if (!profileData[field]) {
              alert(`Missing required field: ${field}`);
              return;
            }
          }
  
          const isUnique = Object.keys(localStorage).every((key) => {
            if (key.startsWith("profile_")) {
              const existingProfile = JSON.parse(localStorage.getItem(key));
              return existingProfile.fields["Profile Name"] !== profileData["Profile Name"];
            }
            return true;
          });
  
          if (!isUnique) {
            alert("A profile with this name already exists. Please use a different name.");
            return;
          }
  
          const id = getNextProfileId();
          const profile = {
            id: id,
            fields: profileData,
          };
  
          localStorage.setItem(`profile_${id}`, JSON.stringify(profile));
          alert("Profile imported successfully!");
  
          importInput.value = "";
          fileNameDisplay.textContent = "";
          fileNameDisplay.style.visibility = "hidden";
          importBtn.disabled = true;
        } catch (error) {
          alert("Failed to import profile. Make sure the file is a valid JSON format.");
        }
      };
  
      reader.readAsText(file);
    });
  });
  