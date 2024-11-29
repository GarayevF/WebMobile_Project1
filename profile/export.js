function exportProfileByName(profileName) {
    if (!profileName || profileName.trim() === "") {
      alert("Please enter a valid profile name.");
      return;
    }
  
    let profileToExport = null;
  
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key.startsWith("profile_")) {
        const profile = JSON.parse(localStorage.getItem(key));
        if (profile.fields["Profile Name"] === profileName.trim()) {
          profileToExport = profile;
          break;
        }
      }
    }
  
    if (!profileToExport) {
      alert(`Profile with the name "${profileName}" not found.`);
      return;
    }
  
    const jsonData = JSON.stringify(profileToExport, null, 2);
    const blob = new Blob([jsonData], { type: "application/json" });
    const url = URL.createObjectURL(blob);
  
    const a = document.createElement("a");
    a.href = url;
    a.download = `${profileName}_profile.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  
    URL.revokeObjectURL(url);
    alert(`Profile "${profileName}" has been exported successfully!`);
  }
  