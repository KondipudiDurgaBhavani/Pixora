const loginForm = document.getElementById("loginForm");
const message = document.getElementById("message");
loginForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const username = document.getElementById("username").value.trim();
    if (!username) {
        message.textContent = "Please enter your username or email.";
        message.style.color = "#8B1E3F";
        return;
    }
    message.textContent =
        "Welcome to Pixora! This is a demo login page.";
    message.style.color = "#722F37";
});
document.getElementById("guestLogin").addEventListener("click", function () {
    message.textContent =
        "Welcome to Pixora! Your social world is coming soon.";
    message.style.color = "#722F37";
});
document.getElementById("forgotPassword").addEventListener("click", function (event) {
    event.preventDefault();
    message.textContent =
        "Password recovery is not available in this demo yet.";
    message.style.color = "#722F37";
});
document.getElementById("createAccount").addEventListener("click", function (event) {
    event.preventDefault();
    message.textContent =
        "Account creation is coming soon to Pixora!";
    message.style.color = "#722F37";
});
