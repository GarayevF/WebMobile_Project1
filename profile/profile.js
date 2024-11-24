document.addEventListener("DOMContentLoaded", () => {
    const manualFieldsContainer = document.getElementById("manualFields");
    const addFieldBtn = document.getElementById("addFieldBtn");
    const createProfileBtn = document.getElementById("createProfileBtn");
  
    addFieldBtn.addEventListener("click", () => {
      const fieldContainer = document.createElement("div");
      fieldContainer.classList.add("form-group");
  
      const labelInput = document.createElement("input");
      labelInput.type = "text";
      labelInput.placeholder = "Enter Label Name";
  
      const textarea = document.createElement("textarea");
      textarea.placeholder = "Enter Field Value";
  
      const buttonContainer = document.createElement("div");
      buttonContainer.classList.add("button-container");
  
      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete";
      deleteBtn.classList.add("delete-btn");
  
      buttonContainer.appendChild(deleteBtn);
      fieldContainer.appendChild(labelInput);
      fieldContainer.appendChild(textarea);
      fieldContainer.appendChild(buttonContainer);
  
      manualFieldsContainer.appendChild(fieldContainer);
  
      deleteBtn.addEventListener("click", () => {
        manualFieldsContainer.removeChild(fieldContainer);
      });
    });
  
    createProfileBtn.addEventListener("click", () => {
      let currentId = localStorage.getItem('currentId') ? parseInt(localStorage.getItem('currentId')) : 1;
  
      const profileData = {};
      profileData['Profile Name'] = document.getElementById('name').value.trim();
      profileData['FullName'] = document.getElementById('fullname').value.trim();
      profileData['Email'] = document.getElementById('email').value.trim();
      profileData['Experience'] = document.getElementById('experience').value.trim();
      profileData['Education'] = document.getElementById('education').value.trim();
      profileData['Skills'] = document.getElementById('skills').value.trim();
  
      for (let key in profileData) {
        if (!profileData[key]) {
          delete profileData[key];
        }
      }
  
      const profile = {
        id: currentId + 1,
        fields: profileData
      };
  
      const formGroups = manualFieldsContainer.querySelectorAll('.form-group');
      formGroups.forEach((formGroup) => {
        const labelInput = formGroup.querySelector('input');
        const textarea = formGroup.querySelector('textarea');
        
        if (labelInput && textarea) {
          const labelName = labelInput.value.trim();
          const fieldValue = textarea.value.trim();
  
          if (labelName && fieldValue) {
            profile.fields[labelName] = fieldValue;
          }
        }
      });
  
      localStorage.setItem(`profile_${currentId + 1}`, JSON.stringify(profile));
      currentId++;
      localStorage.setItem('currentId', currentId);
    });
  });
  