const loginForm = document.getElementById("loginForm");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const togglePasswordButton = document.getElementById("togglePassword");
const message = document.getElementById("message");
function showMessage(text, type) {
    message.textContent = text;
    message.className = `message visible ${type}`;
}
// Show or hide password
togglePasswordButton.addEventListener("click", function () {
    const isPasswordHidden = passwordInput.type === "password";

    passwordInput.type = isPasswordHidden ? "text" : "password";

    togglePasswordButton.setAttribute(
        "aria-label",
        isPasswordHidden ? "Hide password" : "Show password"
    );
});
const loginForm = document.getElementById("loginForm");
const usernameInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const message = document.getElementById("message");

loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const username = usernameInput.value.trim();
    const password = passwordInput.value;

    if (!username || !password) {
        message.textContent = "Please enter your username and password.";
        message.className = "message visible error";
        return;
    }

    sessionStorage.setItem("pixoraUser", username);

    window.location.href = "./home.html";
});
// Explore Pixora
document.getElementById("exploreButton").addEventListener("click", function () {
    showMessage(window.location.href = "./home.html");
});
// Forgot password
document.getElementById("forgotPassword").addEventListener("click", function () {
    showMessage(
        "Password recovery will be available after secure authentication is connected.",
        "error"
    );
});
// Create account
document.getElementById("createAccount").addEventListener("click", function () {
    showMessage(
        "Account creation will be available after registration is implemented.",
        "error"
    );
});
const passwordInput = document.getElementById("password");
const togglePassword = document.getElementById("togglePassword");
const eyeIcon = document.getElementById("eyeIcon");

togglePassword.addEventListener("click", function () {
    const isPasswordHidden = passwordInput.type === "password";

    passwordInput.type = isPasswordHidden ? "text" : "password";

    togglePassword.setAttribute(
        "aria-label",
        isPasswordHidden ? "Hide password" : "Show password"
    );

    togglePassword.setAttribute(
        "aria-pressed",
        String(isPasswordHidden)
    );

    // Eye icon changes when clicked
    eyeIcon.innerHTML = isPasswordHidden
        ? `
          <path d="M3 3l18 18"/>
          <path d="M10.6 10.6a2 2 0 0 0 2.8 2.8"/>
          <path d="M9.9 5.2A11 11 0 0 1 12 5c6.4 0 10 7 10 7a15 15 0 0 1-3 3.8"/>
          <path d="M6.2 6.2C3.5 8 2 12 2 12s3.6 7 10 7a10 10 0 0 0 4-.8"/>
        `
        : `
          <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12Z"/>
          <circle cx="12" cy="12" r="3"/>
        `;
});
