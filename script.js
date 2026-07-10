let emptySearchCount = 0;

function toggleMenu() {
    // Close user dropdown
    document.getElementById("userContent")
            .classList.remove("show_user");

    // Toggle menu dropdown
    document.getElementById("menuContent")
            .classList.toggle("show");
}

function toggleUser() {

    // Close menu dropdown
    document.getElementById("menuContent")
            .classList.remove("show");

    // Toggle user dropdown
    document.getElementById("userContent")
            .classList.toggle("show_user");
}

function searchPage() {
    let text = document.getElementById("searchBox")
        .value
        .toLowerCase()
        .trim();

   if (text === "") {

    emptySearchCount++;

    let popup = document.getElementById("popupMessage");

    let message = "";

    if (emptySearchCount === 1) {
        message = "⚠ Please fill the search bar first.";
    }
    else if (emptySearchCount === 2) {
        message = "🔍 Search box is still empty.";
    }
    else if (emptySearchCount === 3) {
        message = "😅 You clicked Search again without typing anything.";
    }
    else if (emptySearchCount === 4) {
        message = "🤔 Maybe type something before searching.";
    }
    else {
        message = "🚫 Search cannot work with an empty box.";
    }

    popup.innerHTML = message;
    popup.style.display = "block";

     setTimeout(() => {
        popup.style.display = "none";
     }, 3000);

     return;
    }

      let path = window.location.pathname.toLowerCase();

if (text.includes("management") || text.includes("admin") || text.includes("login")) {

    // Already inside Admin pages
    if (path.includes("admin_home") || path.includes("admin_404")) {

        window.location.href = "admin.html";
    }

    // Any other page (index, complaint, dashboard, etc.)
    else {

        window.location.href = "admin_login.html";
    }
}

else if (text.includes("complaint")) {
    window.location.href = "complaint.html";
}

else if (text.includes("service")) {
    window.location.href = "#services";
}

else if (text.includes("announcement")) {
    window.location.href = "Announcement.html";
}

else if (text.includes("project")) {
    window.location.href = "Project.html";
}

else if (text.includes("home")) {
    window.location.href = "index.html";
}

else if (text.includes("dashboard")) {
    window.location.href = "dashboard.html";
}

else {

    // If already in admin pages, show admin 404
    if (path.includes("home")){
        window.location.href = "admin_home.html";
    }

    else if (path.includes("management")){
        window.location.href = "admin.html";
    }

    else if (path.includes("login")){
        window.location.href = "admin_login.html";
    }

    // Otherwise show normal 404
    else {
        window.location.href = "404.html";
    }
}

}

function toggleAccessibility() {

    document.getElementById("menuContent")
            .classList.remove("show");

    document.getElementById("userContent")
            .classList.remove("show_user");

    document.getElementById("accessibilityPanel")
            .classList.toggle("show-panel");
}

document.addEventListener("click", function(event) {

    const menu = document.querySelector(".menu");
    const user = document.querySelector(".user_id");
    const accessibility = document.querySelector(".accessibility-menu");

    if (menu && !menu.contains(event.target)) {
        document.getElementById("menuContent")
                .classList.remove("show");
    }

    if (user && !user.contains(event.target)) {
        document.getElementById("userContent")
                .classList.remove("show_user");
    }

    if (accessibility && !accessibility.contains(event.target)) {
        document.getElementById("accessibilityPanel")
                .classList.remove("show-panel");
    }

});

let currentFontSize = 16;

function increaseText(){

    if(currentFontSize < 24){
        currentFontSize += 2;
    }

    document.body.style.fontSize =
    currentFontSize + "px";
}

function decreaseText(){
    currentFontSize -= 2;

    if(currentFontSize < 12){
        currentFontSize = 12;
    }

    document.body.style.fontSize = currentFontSize + "px";
}

function toggleContrast(){

    if(document.body.classList.contains("dark-mode")){
        document.body.classList.remove("dark-mode");
    }

    document.body.classList.toggle("high-contrast");
}

function toggleDarkMode(){
    const isDark = document.body.classList.toggle("dark-mode");
    localStorage.setItem("darkMode", isDark ? "on" : "off");
}

window.onload = function () {


    if (localStorage.getItem("darkMode") === "on") {
        document.body.classList.add("dark-mode");
    }

    document.querySelectorAll(".status-select").forEach(function(select) {

        let form = select.closest("form");
        let button = form.querySelector(".update-btn");
        let currentStatus = button.dataset.current;

        button.disabled = (select.value === currentStatus);
    });
};

function toggleSpacing(){
    document.body.classList.toggle("text-spacing");
}

function resetAccessibility(){

    currentFontSize = 16;
    document.body.style.fontSize = "16px";

    document.body.classList.remove(
        "high-contrast",
        "dark-mode",
        "text-spacing"
    );

    // Reset localStorage state properly
    localStorage.setItem("darkMode", "off");
}

function counter(id, target, speed){

    let count = 0;

    let update = setInterval(() => {

        count++;

        document.getElementById(id).innerHTML = count;

        if(count == target){
            clearInterval(update);
        }

    }, speed);
}

counter("member", 16, 1);

function toggleButton(selectElement) {

    let form = selectElement.closest("form");

    let button = form.querySelector(".update-btn");

    let currentStatus = button.dataset.current;

    if (selectElement.value === currentStatus) {
        button.disabled = true;
    } else {
        button.disabled = false;
    }
}

const searchBox = document.getElementById("searchBox");

if (searchBox) {
    searchBox.addEventListener("keypress", function(event) {

       if (event.key === "Enter") {
    event.preventDefault();
    searchPage();
}

    });
}

    function updateDateTime() {
    let now = new Date();

    let date = now.toLocaleDateString();
    let time = now.toLocaleTimeString();

    document.getElementById("datetime").innerHTML = date + " | " + time;
 }

setInterval(updateDateTime, 1000);
updateDateTime();

let deleteForm = null;



function searchComplaint() {

    let text = document.getElementById("complaintSearch")
        .value
        .toLowerCase()
        .trim();

    if(text === ""){
             let popup = document.getElementById("searchPopup");

        popup.style.display = "block";

        setTimeout(() => {
            popup.style.display = "none";
        }, 3000);

        return;
    }

    let rows = document.querySelectorAll("table tr");

    for(let i = 1; i < rows.length; i++) {

        let rowText = rows[i].innerText.toLowerCase();

        if(rowText.includes(text)) {

            rows[i].scrollIntoView({
                behavior: "smooth",
                block: "center"
            });

            rows[i].style.outline = "3px solid green";

            setTimeout(() => {
                rows[i].style.outline = "";
            }, 3000);

            return;
        }
  
    }

    let msg = document.getElementById("searchMessage");

          msg.innerHTML = "Complaint not found";
          msg.style.display = "block";

          setTimeout(() => {
          msg.style.display = "none";
         }, 3000);
}

let complaintToDelete = null;

function showDeletePopup(id){

    complaintToDelete = id;

    document.getElementById("deleteModal").style.display = "flex";

}

function closeDeletePopup(){

    complaintToDelete = null;

    document.getElementById("deleteModal").style.display = "none";

}

function confirmDelete(){

    if(complaintToDelete === null) return;

    let complaints = JSON.parse(localStorage.getItem("complaints")) || [];

    complaints = complaints.filter(function(c){

        return c.id != complaintToDelete;

    });

    localStorage.setItem("complaints", JSON.stringify(complaints));

    closeDeletePopup();

    alert("Complaint deleted successfully.");

    location.reload();

}
