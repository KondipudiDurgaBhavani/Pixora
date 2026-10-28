document.addEventListener("DOMContentLoaded", function () {
    const savedGrid = document.getElementById("savedGrid");
    const savedCount = document.getElementById("savedCount");
    const emptyState = document.getElementById("emptyState");
    const STORAGE_KEY = "pixoraSavedPosts";
    function getSavedPosts() {
        try {
            const posts = JSON.parse(
                localStorage.getItem(STORAGE_KEY) || "[]"
            );
            return Array.isArray(posts) ? posts : [];
        } catch (error) {
            return [];
        }
    }
    function renderSavedPosts() {
        const savedPosts = getSavedPosts();
        savedGrid.innerHTML = "";
        savedCount.textContent =
            `${savedPosts.length} saved ${
                savedPosts.length === 1 ? "post" : "posts"
            }`;
        emptyState.hidden = savedPosts.length !== 0;
        savedGrid.hidden = savedPosts.length === 0;
        savedPosts.forEach(function (title) {
            // Find the original post on the Home Page
            const card = Array.from(
                document.querySelectorAll(".saved-card")
            ).find(function (item) {
                return item.dataset.title === title;
            });
            // The saved page is separate, so create a card
            // using details stored by the Home Page.
            const postData = getPostDetails(title);
            const article = document.createElement("article");
            article.className = "saved-card";
            article.dataset.title = title;
            const image = document.createElement("img");
            image.src = postData.image;
            image.alt = title;
            image.loading = "lazy";
            image.onerror = function () {
                image.style.display = "none";
            };
            const content = document.createElement("div");
            content.className = "saved-card-content";
            const category = document.createElement("span");
            category.className = "saved-category";
            category.textContent = postData.category;
            const heading = document.createElement("h2");
            heading.textContent = title;
            const description = document.createElement("p");
            description.textContent = postData.description;
            const removeButton = document.createElement("button");
            removeButton.className = "remove-btn";
            removeButton.type = "button";
            removeButton.textContent = "♥ Remove from Saved";
            removeButton.addEventListener("click", function () {
                const updatedPosts = getSavedPosts().filter(
                    function (savedTitle) {
                        return savedTitle !== title;
                    }
                );
                localStorage.setItem(
                    STORAGE_KEY,
                    JSON.stringify(updatedPosts)
                );
                renderSavedPosts();
            });
            content.appendChild(category);
            content.appendChild(heading);
            content.appendChild(description);
            content.appendChild(removeButton);
            article.appendChild(image);
            article.appendChild(content);
            savedGrid.appendChild(article);
        });
    }
    function getPostDetails(title) {
        // Use saved post details if available.
        try {
            const details = JSON.parse(
                localStorage.getItem("pixoraPostDetails") || "{}"
            );
            if (details[title]) {
                return details[title];
            }
        } catch (error) {
            console.error("Unable to read post details.", error);
        }
        return {
            image: "",
            category: "PIXORA",
            description: "An idea saved to your Pixora collection."
        };
    }
    renderSavedPosts();
});