const categoryButtons=document.querySelectorAll('.chip');
const cards=document.querySelectorAll('.card');
const searchForm=document.getElementById('searchForm');
const searchInput=document.getElementById('searchInput');
const resultCount=document.getElementById('resultCount');
const emptyState=document.getElementById('emptyState');
const grid=document.getElementById('ideaGrid');
let activeCategory='All';let term='';
function filterCards(){let count=0;
    cards.forEach(card=>{
        const categoryOk=activeCategory==='All'||card.dataset.category===activeCategory;
        const text=(card.dataset.search+' '+card.innerText).toLowerCase();
        const searchOk=text.includes(term.toLowerCase());
        card.hidden=!(categoryOk&&searchOk);
        if(!card.hidden)count++
    });
        resultCount.textContent=`${count} ${count===1?'idea':'ideas'}`;
        emptyState.hidden=count!==0;
        grid.hidden=count===0
}
categoryButtons.forEach(
    btn=>btn.addEventListener('click',()=>{
        categoryButtons.forEach(b=>b.classList.remove('selected'));
        btn.classList.add('selected');
        activeCategory=btn.dataset.category;
        filterCards()
     })
);
    searchForm.addEventListener('submit',e=>{
        e.preventDefault();
        term=searchInput.value.trim();
        filterCards();
        document.querySelector('.inspiration').scrollIntoView({behavior:'smooth'})
    });
    searchInput.addEventListener('input',()=>{
        term=searchInput.value.trim();
        filterCards()
    });
    document.querySelectorAll('.save').forEach(
        btn=>btn.addEventListener('click',()=>{
            const saved=btn.classList.toggle('saved');
            btn.textContent=saved?'♥ Saved':'♡ Save';
            btn.setAttribute('aria-pressed',String(saved))
        })
    );
    const dialog=document.getElementById('createDialog');
    function openDialog(){
        if(dialog.showModal)dialog.showModal();
        else alert('Post creation is a front-end preview. A backend can be connected later.')
    }
    document.getElementById('createButton').addEventListener('click',openDialog);
    document.getElementById('bannerCreate').addEventListener('click',openDialog);
    document.getElementById('closeDialog').addEventListener('click',()=>dialog.close());
    document.getElementById('okDialog').addEventListener('click',()=>dialog.close());
    document.getElementById('year').textContent=new Date().getFullYear();filterCards();
const username = sessionStorage.getItem("pixoraUser");
const welcomeUser = document.getElementById("welcomeUser");
if (welcomeUser && username) {
welcomeUser.textContent = `Welcome, ${username}!`;
}
// Display the signed-in user's initial
const pixoraUser = sessionStorage.getItem("pixoraUser");
const profileAvatar = document.getElementById("profileAvatar");
if (pixoraUser && profileAvatar) {
    profileAvatar.textContent = pixoraUser.charAt(0).toUpperCase();
    profileAvatar.title = pixoraUser;
}
// Display the signed-in user's profile initial
const pixoraUser = sessionStorage.getItem("pixoraUser");
const profileAvatar = document.getElementById("profileAvatar");

if (pixoraUser && profileAvatar) {
    profileAvatar.textContent = pixoraUser.charAt(0).toUpperCase();
    profileAvatar.title = pixoraUser;
    profileAvatar.setAttribute(
        "aria-label",
        `Profile: ${pixoraUser}`
    );
}
// Pixora Save Posts Feature
document.addEventListener("DOMContentLoaded", function () {
    const saveButtons = document.querySelectorAll(".save");

    let savedPosts = JSON.parse(localStorage.getItem("pixoraSavedPosts")) || [];

    saveButtons.forEach(function (button, index) {
        const card = button.closest(".inspiration-card, .trend-card, article");

        if (!card) return;

        const postId = card.dataset.postId || `pixora-post-${index}`;

        card.dataset.postId = postId;

        // Restore previously saved state
        if (savedPosts.includes(postId)) {
            button.textContent = "♥ Saved";
            button.classList.add("saved");
            button.setAttribute("aria-pressed", "true");
        } else {
            button.setAttribute("aria-pressed", "false");
        }

        // Save or unsave a post
        button.addEventListener("click", function () {
            if (savedPosts.includes(postId)) {
                savedPosts = savedPosts.filter(function (id) {
                    return id !== postId;
                });

                button.textContent = "♡ Save";
                button.classList.remove("saved");
                button.setAttribute("aria-pressed", "false");
            } else {
                savedPosts.push(postId);

                button.textContent = "♥ Saved";
                button.classList.add("saved");
                button.setAttribute("aria-pressed", "true");
            }

            localStorage.setItem(
                "pixoraSavedPosts",
                JSON.stringify(savedPosts)
            );
        });
    });
});
