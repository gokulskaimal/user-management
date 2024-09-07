document.addEventListener("DOMContentLoaded", () => {
    document.querySelector("form").addEventListener("submit", formValidate);
  });

  function formValidate(e) {
    e.preventDefault();
    
    var username = document.getElementById("username").value.trim();
    var email_id = document.getElementById("email_id").value.trim();
    var password = document.getElementById("password").value.trim();
    var confirmPassword = document.getElementById("confirmPassword").value.trim();
    
    if (username === ""||email_id==="" || password === "" || confirmPassword === "") {
      alert("All fields are required");
      return false;
    } else if (password !== confirmPassword) {
      alert("Passwords do not match");
      return false;
    }

    e.target.submit();
    return true;
  }