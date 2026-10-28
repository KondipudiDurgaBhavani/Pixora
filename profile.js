document.addEventListener("DOMContentLoaded", function () {
    const username = sessionStorage.getItem("pixoraUser");
    const profileAvatar = document.getElementById("profileAvatar");
    const profileName = document.getElementById("profileName");
    const savedCount = document.getElementById("savedCount");
    const logoutButton = document.getElementById("logoutButton");
    // Display username and profile initial
    if (username) {
        if (profileAvatar) {
            profileAvatar.textContent =
                username.trim().charAt(0).toUpperCase() || "P";

            profileAvatar.title = username;
        }
        if (profileName) {
            profileName.textContent = username;
        }
    } else {
        if (profileAvatar) {
            profileAvatar.textContent = "P";
        }
        if (profileName) {
            profileName.textContent = "Welcome, Creator!";
        }
    }
    // Display saved posts count
    function updateSavedCount() {
        let savedPosts = [];
        try {
            savedPosts = JSON.parse(
                localStorage.getItem("pixoraSavedPosts") || "[]"
            );
            if (!Array.isArray(savedPosts)) {
                savedPosts = [];
            }
        } catch (error) {
            savedPosts = [];
        }
        if (savedCount) {
            savedCount.textContent = savedPosts.length;
        }
    }
    updateSavedCount();
    // Logout
    if (logoutButton) {
        logoutButton.addEventListener("click", function () {
            const confirmLogout = window.confirm(
                "Are you sure you want to log out of Pixora?"
            );
            if (confirmLogout) {
                sessionStorage.removeItem("pixoraUser");
                window.location.href = "./index.html";
            }
        });
    }
});