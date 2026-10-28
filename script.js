// Get HTML elements
const loginForm = document.getElementById("loginForm");
const usernameInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const togglePasswordButton = document.getElementById("togglePassword");
const eyeIcon = document.getElementById("eyeIcon");
const message = document.getElementById("message");
const exploreButton = document.getElementById("exploreButton");
const forgotPasswordButton = document.getElementById("forgotPassword");
const createAccountButton = document.getElementById("createAccount");

// Display messages
function showMessage(text, type) {
    if (!message) return;

    message.textContent = text;
    message.className = `message visible ${type}`;
}

// Show or hide password
if (togglePasswordButton && passwordInput) {
    togglePasswordButton.addEventListener("click", function () {
        const isPasswordHidden = passwordInput.type === "password";

        passwordInput.type = isPasswordHidden ? "text" : "password";

        togglePasswordButton.setAttribute(
            "aria-label",
            isPasswordHidden ? "Hide password" : "Show password"
        );

        togglePasswordButton.setAttribute(
            "aria-pressed",
            String(isPasswordHidden)
        );

        if (eyeIcon) {
            eyeIcon.innerHTML = isPasswordHidden
                ? `
                    <path d="M3 3l18 18"/>
                    <path d="M10.6 10.6a2 2 0 0 0 2.8 2.8"/>
                    <path d="M9.9 5.2A11 11 0 0 1 12 5c6.4 0 10 7 10 7s-3.6 7-10 7a10 10 0 0 1-4-.8"/>
                  `
                : `
                    <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12Z"/>
                    <circle cx="12" cy="12" r="3"/>
                  `;
        }
    });
}

// Sign In
if (loginForm) {
    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const username = usernameInput.value.trim();
        const password = passwordInput.value;

        if (!username || !password) {
            showMessage(
                "Please enter your username and password.",
                "error"
            );
            return;
        }

        // Demo login only; no real authentication
        sessionStorage.setItem("pixoraUser", username);

        window.location.href = "./home.html";
    });
}

// Explore Pixora
if (exploreButton) {
    exploreButton.addEventListener("click", function () {
        window.location.href = "./home.html";
    });
}

// Forgot password
if (forgotPasswordButton) {
    forgotPasswordButton.addEventListener("click", function () {
        showMessage(
            "Password recovery will be available after secure authentication is connected.",
            "error"
        );
    });
}

// Create account
if (createAccountButton) {
    createAccountButton.addEventListener("click", function () {
        showMessage(
            "Account creation will be available after registration is implemented.",
            "error"
        );
    });
}

console.log("Pixora script loaded successfully!");
