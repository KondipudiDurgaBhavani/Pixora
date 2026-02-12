function login() {
  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;

  if (user === "" || pass === "") {
    alert("Please fill all fields");
  } else {
    alert("Login successful (Demo only)");
  }
}
