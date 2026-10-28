// ========================================
// PIXORA - HOME PAGE JAVASCRIPT
// ========================================
// Run after the HTML page has loaded
document.addEventListener("DOMContentLoaded", function () {
    // ------------------------------------
    // 1. CATEGORY FILTERS
    // ------------------------------------
    const categoryButtons = document.querySelectorAll(".chip");
    const cards = document.querySelectorAll(".card");
    const searchForm = document.getElementById("searchForm");
    const searchInput = document.getElementById("searchInput");
    const resultCount = document.getElementById("resultCount");
    const emptyState = document.getElementById("emptyState");
    const grid = document.getElementById("ideaGrid");
    let activeCategory = "All";
    let term = "";
    function filterCards() {
        let count = 0;
        cards.forEach(function (card) {
            const categoryOk =
                activeCategory === "All" ||
                card.dataset.category === activeCategory;
            const text = (
                (card.dataset.search || "") +
                " " +
                card.innerText
            ).toLowerCase();
            const searchOk = text.includes(term.toLowerCase());
            card.hidden = !(categoryOk && searchOk);
            if (!card.hidden) {
                count++;
            }
        });
        if (resultCount) {
            resultCount.textContent =
                `${count} ${count === 1 ? "idea" : "ideas"}`;
        }
        if (emptyState) {
            emptyState.hidden = count !== 0;
        }
        if (grid) {
            grid.hidden = count === 0;
        }
    }
    categoryButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            categoryButtons.forEach(function (item) {
                item.classList.remove("selected");
            });
            button.classList.add("selected");
            activeCategory = button.dataset.category || "All";
            filterCards();
        });
    });
    // ------------------------------------
    // 2. SEARCH FUNCTIONALITY
    // ------------------------------------
    if (searchForm && searchInput) {
        searchForm.addEventListener("submit", function (event) {
            event.preventDefault();
            term = searchInput.value.trim();
            filterCards();
            const inspiration = document.querySelector(".inspiration");
            if (inspiration) {
                inspiration.scrollIntoView({
                    behavior: "smooth"
                });
            }
        });
        searchInput.addEventListener("input", function () {
            term = searchInput.value.trim();
            filterCards();
        });
    }
    // ------------------------------------
    // 3. SAVE POSTS FUNCTIONALITY
    // ------------------------------------
    const saveButtons = document.querySelectorAll(".card .save");
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
    saveButtons.forEach(function (button) {
        const card = button.closest(".card");
        if (!card) {
            return;
        }
        const titleElement = card.querySelector("h3");
        if (!titleElement) {
            return;
        }
        const title = titleElement.textContent.trim();
        function updateSaveButton() {
            const isSaved = savedPosts.includes(title);
            button.textContent = isSaved ? "♥ Saved" : "♡ Save";
            button.classList.toggle("saved", isSaved);
            button.setAttribute(
                "aria-pressed",
                String(isSaved)
            );
        }
        // Show saved status when the page opens
        updateSaveButton();
        button.addEventListener("click", function () {
            if (savedPosts.includes(title)) {
                savedPosts = savedPosts.filter(function (savedTitle) {
                    return savedTitle !== title;
                });
            } else {
                savedPosts.push(title);
            }
            try {
                localStorage.setItem(
                    "pixoraSavedPosts",
                    JSON.stringify(savedPosts)
                );
            } catch (error) {
                console.error("Unable to save post:", error);
            }
            updateSaveButton();
        });
    });
    // ------------------------------------
    // 4. WELCOME MESSAGE
    // -----------------------------------
    const username = sessionStorage.getItem("pixoraUser");
    const welcomeUser = document.getElementById("welcomeUser");
    if (welcomeUser && username) {
        welcomeUser.textContent = `Welcome, ${username}!`;
    }
    // ------------------------------------
    // 5. PROFILE AVATAR INITIAL
    // ------------------------------------
    const profileAvatar = document.getElementById("profileAvatar");
    if (profileAvatar && username) {
        profileAvatar.textContent = username.charAt(0).toUpperCase();
        profileAvatar.title = username;
        profileAvatar.setAttribute(
            "aria-label",
            `Profile: ${username}`
        );
    }
    // ------------------------------------
    // 6. CREATE POST DIALOG
    // ------------------------------------
    const dialog = document.getElementById("createDialog");
    const createButton = document.getElementById("createButton");
    const bannerCreate = document.getElementById("bannerCreate");
    const closeDialog = document.getElementById("closeDialog");
    const okDialog = document.getElementById("okDialog");
    function openDialog() {
        if (!dialog) {
            return;
        }
        if (typeof dialog.showModal === "function") {
            dialog.showModal();
        } else {
            alert(
                "Post creation is a front-end preview. " +
                "A backend can be connected later."
            );
        }
    }
    if (createButton) {
        createButton.addEventListener("click", openDialog);
    }
    if (bannerCreate) {
        bannerCreate.addEventListener("click", openDialog);
    }
    if (closeDialog && dialog) {
        closeDialog.addEventListener("click", function () {
            dialog.close();
        });
    }
    if (okDialog && dialog) {
        okDialog.addEventListener("click", function () {
            dialog.close();
        });
    }
    // ------------------------------------
    // 7. CURRENT YEAR IN FOOTER
    // ------------------------------------
    const yearElement = document.getElementById("year");
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
    // ------------------------------------
    // 8. INITIALIZE CATEGORY FILTERS
    // ------------------------------------
    filterCards();
});
