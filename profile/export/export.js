document.addEventListener("DOMContentLoaded", () => {
  const profileSelect = document.getElementById("profileSelect");
  const exportBtn = document.getElementById("exportBtn");
  const sendMailBtn = document.getElementById("sendMailBtn");
  const emailInput = document.getElementById("emailInput");

  const loadProfiles = () => {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key.startsWith("profile_")) {
        const profile = JSON.parse(localStorage.getItem(key));
        const option = document.createElement("option");
        option.value = key;
        option.textContent = profile.fields["Profile Name"];
        profileSelect.appendChild(option);
      }
    }
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

    const profileData = JSON.parse(localStorage.getItem(selectedProfileKey));
    if (profileData) {
      const { id, fields } = profileData;

      const blob = new Blob([JSON.stringify(fields, null, 2)], { type: "application/json" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      const profileName = fields["Profile Name"];
      link.download = `${profileName}.json`;

      link.click();
      URL.revokeObjectURL(link.href);
    } else {
      alert("Profile data not found.");
    }
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

    const profileData = JSON.parse(localStorage.getItem(selectedProfileKey));
    if (profileData) {
      const { fields } = profileData;

      const subject = `Profile: ${fields["Profile Name"]}`;
      const body = `Profile Data:\n\n${JSON.stringify(fields, null, 2)}`;

      const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

      window.location.href = mailtoLink;
    } else {
      alert("Profile data not found.");
    }
  });

  loadProfiles();
});
