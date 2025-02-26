document.addEventListener("DOMContentLoaded", async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const studentId =
    urlParams.get("id") || window.location.pathname.split("/").pop();
  const studentDataContainer = document.querySelector(".details-container");

  try {
    // Fetch student data from the API
    const response = await fetch(`http://localhost:3000/students/${studentId}`);

    if (response.ok) {
      const student = await response.json();

      // Populate the data into the HTML
      document.querySelector(".name").textContent = student.name;
      document.querySelector(".id").textContent = `ID: ${student.id}`;
      document.querySelector(
        ".dept"
      ).textContent = `Department: ${student.dept}`;
      document.querySelector(".email").textContent = `Email: ${student.email}`;
      document.querySelector(".phone").textContent = `Phone: ${student.phone}`;
    } else {
      studentDataContainer.innerHTML = "<p>Student not found.</p>";
    }
  } catch (error) {
    console.error("Error fetching student data:", error);
    studentDataContainer.innerHTML =
      "<p>Error fetching data. Please try again later.</p>";
  }
});
