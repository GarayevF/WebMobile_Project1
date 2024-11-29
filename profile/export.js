function exportData() {
    const data = {};
    for (let key in localStorage) {
        if (localStorage.hasOwnProperty(key)) {
            data[key] = localStorage[key];
        }
    }

    const dataStr = JSON.stringify(data, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "form-filler-data.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}
document.getElementById("export-data").addEventListener("click", exportData);