document.addEventListener("DOMContentLoaded", () => {
  const profileSelect = document.getElementById("profileSelect");
  const exportBtn = document.getElementById("exportBtn");
  const sendMailBtn = document.getElementById("sendMailBtn");
  const emailInput = document.getElementById("emailInput");

  const loadProfiles = () => {

    chrome.storage.local.get(null, function (items) {
      const keys = Object.keys(items);
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        if (key.startsWith("profile_")) {
          
          chrome.storage.local.get(key, (result) => {
            const profile = JSON.parse(result[key]);
            const option = document.createElement("option");
            option.value = key;
            option.textContent = profile.fields["Profile Name"];
            profileSelect.appendChild(option);
          })

          
        }
      }
      })
  };

  profileSelect.addEventListener("change", () => {
    exportBtn.disabled = !profileSelect.value;
  });

  exportBtn.addEventListener("click", () => {
    const selectedProfileKey = profileSelect.value;
    if (!selectedProfileKey) {
      alert("Please select a profile to export.");
      return;
    }

    chrome.storage.local.get(selectedProfileKey, (result) => {
      const profileData = JSON.parse(result[selectedProfileKey]);

      if (profileData) {
        const { id, fields } = profileData;
  
        //* OpenAI. (2024). ChatGPT (Version GPT-3) [Large language model].  https://chatgpt.com/share/674c79a6-54f0-800f-89dd-cac8eda42e9f */
        const blob = new Blob([JSON.stringify(fields, null, 2)], { type: "application/json" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        const profileName = fields["Profile Name"];
        link.download = `${profileName}.json`;
  
        link.click();

        // Till this code. I get this snippet From Chatgpt, Used Prompt:  I have data as json how can I export and download it to my profile
        URL.revokeObjectURL(link.href);
      } else {
        alert("Profile data not found.");
      }
    })

    
    
  });

  sendMailBtn.addEventListener("click", () => {
    const email = emailInput.value.trim();
    if (!email) {
      alert("Please enter an email address.");
      return;
    }

    const selectedProfileKey = profileSelect.value;
    if (!selectedProfileKey) {
      alert("Please select a profile to export.");
      return;
    }

    chrome.storage.local.get(selectedProfileKey, (result) => {
      const profileData = JSON.parse(result[selectedProfileKey]);
      if (profileData) {
        const { fields } = profileData;
  
        const subject = `Profile: ${fields["Profile Name"]}`;
        const body = `Profile Data:\n\n${JSON.stringify(fields, null, 2)}`;
  
        ///* OpenAI. (2024). ChatGPT (Version GPT-3) [Large language model]. https://chatgpt.com/share/674c79a6-54f0-800f-89dd-cac8eda42e9f */
        const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        
        /* I get encodeURIComponent from Chatgpt. Used Prompts: do not use backend just use mailto since I will send the json data as string, encodeURIComponent what does it mean.*/
        window.location.href = mailtoLink;
      } else {
        alert("Profile data not found.");
      }
    })
    
  });

  loadProfiles();
});
