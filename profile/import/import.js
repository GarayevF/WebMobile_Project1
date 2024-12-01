document.addEventListener("DOMContentLoaded", () => {
    const importInput = document.getElementById("fileInput");
    const importBtn = document.getElementById("importButton");
    const fileNameDisplay = document.getElementById("fileName");
  
    importBtn.disabled = true;

  
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
  

      /* OpenAI. (2024). ChatGPT (Version GPT-3) [Large language model]. https://chatgpt.com/share/674c79a6-54f0-800f-89dd-cac8eda42e9f */
      // I get the code from ChatGpt, Used Prompt: also I want to know how to import from our device
      const reader = new FileReader();
  
      reader.onload = () => {
        try {
          const profileData = JSON.parse(reader.result);
  
          if (!profileData["Profile Name"]) {
            alert("Invalid profile format. 'Profile Name' is required.");
            return;
          }
          chrome.storage.local.get(null, function (items) {
            const isUnique = Object.keys(items).every((key) => {
              if (key.startsWith("profile_")) {
                chrome.storage.local.get(key, (result) => {
                  const existingProfile = JSON.parse(result[key]);
                  return existingProfile.fields["Profile Name"] !== profileData["Profile Name"];
                })
                
                
              }
              return true;
            });
    
            if (!isUnique) {
              alert("A profile with this name already exists. Please use a different name.");
              return;
            }
    
            chrome.storage.local.get(["currentId"], (result) => {
      

              let currentId = result.currentId ? parseInt(result.currentId) : 1;
      
              chrome.storage.local.set({ ["currentId"] : currentId + 1 });
              
              const id = currentId;
              const profile = {
                id: id,
                fields: profileData,
              };

              console.log(JSON.stringify(profile))
              alert(`profile_${id}`)
              
              chrome.storage.local.set({ [`profile_${id}`] : JSON.stringify(profile) });
      
              alert("Profile imported successfully!");
      
              importInput.value = "";
              fileNameDisplay.textContent = "";
              fileNameDisplay.style.visibility = "hidden";
              importBtn.disabled = true;
              
            })
            
          })
          
        } catch (error) {
          alert("Failed to import profile. Make sure the file is a valid JSON format.");
        }
      };
  
      reader.readAsText(file);
    });
  });
  