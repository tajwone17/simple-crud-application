document.addEventListener("DOMContentLoaded", async () => {
  const studentTableBody = document.querySelector("#student-table tbody");

  // Fetch all students from the API
  const response = await fetch("http://localhost:3000/students");
  const students = await response.json();
  const id = students.id;
  // Populate the table with student data
  students.forEach((student) => {
    const row = document.createElement("tr");

    // Create cells for student data
    const idCell = document.createElement("td");
    idCell.textContent = student.id;
    row.appendChild(idCell);

    const actionCell = document.createElement("td");
    actionCell.innerHTML = `
        <a href="view.html?id=${student.id}"><button class="listBtn">View</button></a>
        <a href="update.html?id=${student.id}"><button class="listBtn">Edit</button></a>
        <button class="listBtn deleteBtn" data-id="${student.id}">Delete</button>
      `;
    row.appendChild(actionCell);

    studentTableBody.appendChild(row);
  });

  // Add event listeners for the delete buttons
  const deleteButtons = document.querySelectorAll(".deleteBtn");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", async (e) => {
      const studentId = e.target.dataset.id;

      // Confirm deletion
      const confirmed = confirm(
        "Are you sure you want to delete this student?"
      );
      if (confirmed) {
        const response = await fetch(
          `http://localhost:3000/students/${studentId}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          alert("Student deleted successfully!");
          e.target.closest("tr").remove(); // Remove the row from the table
        } else {
          alert("Failed to delete student.");
        }
      }
    });
  });
});
