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
// Demo login only — does not authenticate real accounts
loginForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const username = usernameInput.value.trim();
    const password = passwordInput.value;
    if (!username || !password) {
        showMessage("Please enter your username and password.", "error");
        return;
    }
    showMessage(
        "Welcome to Pixora! This is a demo login. Real account authentication is not connected yet.",
        "success"
    );
});
// Explore Pixora
document.getElementById("exploreButton").addEventListener("click", function () {
    showMessage(
        "Welcome to Pixora! Your Home Feed is the next feature to build.",
        "success"
    );
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
