document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("create-form");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const studentData = {
      name: document.getElementById("name").value,
      id: document.getElementById("id").value,
      dept: document.getElementById("dept").value,
      email: document.getElementById("email").value,
      phone: document.getElementById("phone").value,
    };

    try {
      const response = await fetch("http://localhost:3000/students", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(studentData),
      });

      if (response.ok) {
        alert("Student added successfully!");
        form.reset();
        // fetchStudents(); // Refresh student list
      } else {
        alert("Failed to add student.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  });
});
