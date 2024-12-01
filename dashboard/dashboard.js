const applications = [];
const statuses = ["Pending", "Interview Scheduled", "Rejected", "Accepted"];

function generateUniqueId() {
  return new Date().getTime();
}

function saveApplicationsToLocalStorage() {
  localStorage.setItem("applications", JSON.stringify(applications));
}

function loadApplicationsFromLocalStorage() {
  const storedApplications = localStorage.getItem("applications");
  if (storedApplications) {
    applications.length = 0;
    applications.push(...JSON.parse(storedApplications));
  }
}

function populateTable() {
  const tbody = document.getElementById("applications-table").querySelector("tbody");
  tbody.innerHTML = "";

  applications.forEach((app, index) => {
    const row = document.createElement("tr");

    const companyCell = document.createElement("td");
    companyCell.textContent = app.company;
    row.appendChild(companyCell);

    const jobTitleCell = document.createElement("td");
    jobTitleCell.textContent = app.jobTitle;
    row.appendChild(jobTitleCell);

    const dateCell = document.createElement("td");
    dateCell.textContent = app.dateApplied;
    row.appendChild(dateCell);

    const statusCell = document.createElement("td");
    const statusSelect = document.createElement("select");

    statuses.forEach((status) => {
      const option = document.createElement("option");
      option.value = status;
      option.textContent = status;
      option.selected = status === app.status;
      statusSelect.appendChild(option);
    });

    statusSelect.addEventListener("change", (e) => {
      applications[index].status = e.target.value;
      saveApplicationsToLocalStorage();
    });

    statusCell.appendChild(statusSelect);
    row.appendChild(statusCell);

    const deleteCell = document.createElement("td");
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("delete-btn");
    deleteButton.addEventListener("click", () => {
      deleteApplication(index);
    });

    deleteCell.appendChild(deleteButton);
    row.appendChild(deleteCell);

    tbody.appendChild(row);
  });
}

function deleteApplication(index) {
  applications.splice(index, 1);
  saveApplicationsToLocalStorage();
  populateTable();
}

document.getElementById("create-application-btn").addEventListener("click", () => {
  const company = document.getElementById("company-input").value.trim();
  const jobTitle = document.getElementById("job-title-input").value.trim();
  const dateApplied = document.getElementById("date-applied-input").value;
  const status = document.getElementById("status-select").value;

  if (!company || !jobTitle || !dateApplied) {
    alert("Please fill in all fields.");
    return;
  }

  const newApplication = {
    id: generateUniqueId(),
    company,
    jobTitle,
    dateApplied,
    status,
  };

  applications.push(newApplication);
  saveApplicationsToLocalStorage();
  populateTable();

  document.getElementById("company-input").value = "";
  document.getElementById("job-title-input").value = "";
  document.getElementById("date-applied-input").value = "";
  document.getElementById("status-select").value = "Pending";
});

document.addEventListener("DOMContentLoaded", () => {
  loadApplicationsFromLocalStorage();
  populateTable();
});
