document.addEventListener("DOMContentLoaded", async () => {
  // Extract the student ID from the URL (e.g., /students/edit/123456)
  const urlParams = new URLSearchParams(window.location.search);
  const studentId =
    urlParams.get("id") || window.location.pathname.split("/").pop();

  // Select the form and form elements
  const form = document.getElementById("update-form");
  const nameInput = document.getElementById("name");
  const idInput = document.getElementById("id");
  const deptInput = document.getElementById("dept");
  const emailInput = document.getElementById("email");
  const phoneInput = document.getElementById("phone");

  // Fetch the student data from the API based on the ID
  try {
    const response = await fetch(`http://localhost:3000/students/${studentId}`);
    if (response.ok) {
      const student = await response.json();

      // Pre-fill the form fields with the student's existing data
      nameInput.value = student.name;
      idInput.value = student.id;
      deptInput.value = student.dept;
      emailInput.value = student.email;
      phoneInput.value = student.phone;
    } else {
      alert("Student not found.");
    }
  } catch (error) {
    console.error("Error fetching student data:", error);
    alert("Error fetching student data.");
  }

  // Handle form submission
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Create the updated student data object from the form inputs
    const updatedStudentData = {
      name: nameInput.value,
      id: idInput.value,
      dept: deptInput.value,
      email: emailInput.value,
      phone: phoneInput.value,
    };

    try {
      // Send the updated data to the server to update the student details
      const response = await fetch(
        `http://localhost:3000/students/${studentId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedStudentData),
        }
      );

      if (response.ok) {
        alert("Student details updated successfully!");
      } else {
        alert("Failed to update student details.");
      }
    } catch (error) {
      console.error("Error updating student data:", error);
      alert("Error updating student details.");
    }
  });
});
