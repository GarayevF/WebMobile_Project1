document.addEventListener("DOMContentLoaded", () => {
  const selectProfile = document.getElementById("selectProfile");
  const profileFieldsContainer = document.getElementById("profileFields");
  const saveProfileBtn = document.getElementById("saveProfileBtn");

  const loadProfiles = () => {
      selectProfile.innerHTML = '<option value="" disabled selected>Select a profile</option>';
      const currentId = localStorage.getItem("currentId");
      for (let i = 1; i <= currentId; i++) {
          const profileData = localStorage.getItem(`profile_${i}`);
          if (profileData) {
              const profile = JSON.parse(profileData);
              const option = document.createElement("option");
              option.value = profile.id;
              option.textContent = profile.fields["Profile Name"] || `Profile ${profile.id}`;
              selectProfile.appendChild(option);
          }
      }
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

  const saveProfile = (profileId) => {
      const profileData = {};
      const inputs = profileFieldsContainer.querySelectorAll("input[type='text']");

      inputs.forEach((input) => {
          const fieldName = input.dataset.fieldName;
          const fieldValue = input.value.trim();
          if (fieldValue) {
              profileData[fieldName] = fieldValue;
          }
      });

      const profile = { id: profileId, fields: profileData };
      localStorage.setItem(`profile_${profileId}`, JSON.stringify(profile));
      alert("Profile saved successfully!");

      profileFieldsContainer.innerHTML = "";
      selectProfile.value = "";
      saveProfileBtn.classList.remove("visible");
      loadProfiles();
  };

  selectProfile.addEventListener("change", (event) => {
      const profileId = event.target.value;
      const profileData = localStorage.getItem(`profile_${profileId}`);
      if (profileData) {
          const profile = JSON.parse(profileData);
          loadProfileFields(profile);
          saveProfileBtn.classList.add("visible");
      }
  });

  saveProfileBtn.addEventListener("click", () => {
      const selectedProfileId = selectProfile.value;
      if (!selectedProfileId) {
          alert("Please select a profile to save changes.");
          return;
      }
      saveProfile(selectedProfileId);
  });

  loadProfiles();
});
