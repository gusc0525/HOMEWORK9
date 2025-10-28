//HOMEWORK7
console.log('Hello World!!');
//create variables 
const name = "Gus Cardenas Rosales"
let hasDownloaded = false;

//create alert when resume is downloaded 
document.addEventListener('DOMContentLoaded', function(){
    const downloadBtn = document.querySelector('.resume-btn');

    downloadBtn.addEventListener('click', function(){
        if(!hasDownloaded){
            alert("Your resume is downloaded successfully!");
            hasDownloaded = true;
        }
    });
});

//create greeting using java
function showGreeting(name){
    return "Hello my name is " + name + "! Welcome to my portfolio!";
}

document.addEventListener('DOMContentLoaded', function(){
    const greetingElement = document.getElementById('greeting');
    greetingElement.textContent = showGreeting(name);
});

//create ongoing projects variables  
function daysUntilDeadline(deadlineDate){
    const today = new Date();
    const deadline = new Date(deadlineDate);
    const diffTime = deadline - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
}

//display the remaining days 
const remainingdays = daysUntilDeadline("2025-11-01");
document.addEventListener('DOMContentLoaded', function(){
    document.getElementById("deadline").textContent = 
    "Days until project deadline: " + remainingdays;
});

//HOMEWORK8
//creating add a new skill button
document.getElementById("addSkillBtn").addEventListener("click", function(){
    //constants for function
    const skillInput = document.getElementById("skillInput");
    const skillValue = skillInput.value.trim();

    if(skillValue !== ""){
        const skillList = document.querySelector("#skills ul");
        const newSkill = document.createElement("li");
        newSkill.innerHTML = `<i><b>${skillValue}</b></i>`;
        skillList.appendChild(newSkill);
        skillInput.value = "";
    }else{
        alert("Please enter a skill!");
    }
});

//projects list + deadline & status
//creating constnats with info of projects 
const projectTitles = ["Portfolio Website", "MIPS Card Dealer", "Yahtzee Game Simulator"];
const projectDescriptions = [
    "A website that displays my overall assets using HTML, JS, and CSS.",
    "A MIPS assembly project that hands out a ranodm set of cards.",
    "A yahtzee game player using C langaunge and directories"
];

const projectDeadlines = ["2025-12-01", "2025-03-17", "2025-09-12"];

const projectContainer = document.getElementById("projectContainer");
projectContainer.innerHTML = "";

const currentDate = new Date();

//loop to check status of project
for(let i = 0; i< projectTitles.length; i++){
    const deadline = new Date(projectDeadlines[i]);
    let status = "";

    if (deadline > currentDate){
        status = "Ongoing";
    }else{
        status = "Completed";
    }

    const card = document.createElement("div");
    card.className = "card mb-3 p-3";
    card.innerHTML = `
    <h4>${projectTitles[i]}</h4>
    <p>${projectDescriptions[i]}</p>
    <p><b>Deadline:</b> ${projectDeadlines[i]}</p>
    <p><b>Status:</b> ${status}</p>
    `;
    projectContainer.appendChild(card);
}

//create a download counter on the resume button
let downloadCount = 0;
const downloadCountDisplay = document.getElementById("downloadCount");

document.querySelector(".resume-btn").addEventListener("click", function(){
    downloadCount++;
    downloadCountDisplay.textContent = `Downloads: ${downloadCount}`;
});

//creating tables for exepreince 
//constants to fill table
const experiences = [
    { role: "Title", company: "Company Name", duration: "TIME-TIME"},
    { role: "Title", company: "Company Name", duration: "TIME-TIME"}
    
];

const education = [
    { school: "Coconino High School", degree: "High School Diploma", duration: "2019-2023"},
    { school: "Northern Arizona University", degree: "B.S in Computer Science", duration: "2023-present"}
];

const expDiv = document.getElementById("experienceTable");
const expTable = document.createElement("table");
expTable.className = "table table-striped table-bordered text-center";
expTable.innerHTML += `
    <tr>
        <th>Role</th>
        <th>Company</th>
        <th>Duration</th>
    </tr>
`;

experiences.forEach(exp =>{
    expTable.innerHTML += `
    <tr>
        <td>${exp.role}</td>
        <td>${exp.company}</td>
        <td>${exp.duration}</td>
    </tr>
`;
});
expDiv.appendChild(expTable);

//table for education
const eduDiv = document.getElementById("educationTable");
const eduTable = document.createElement("table");
eduTable.className = "table table-striped table-bordered text-center";
eduTable.innerHTML += `
    <tr>
        <th>Institution</th>
        <th>Degree</th>
        <th>Duration</th>
    </tr>
`;

education.forEach(edu =>{
    eduTable.innerHTML += `
    <tr>
        <td>${edu.school}</td>
        <td>${edu.degree}</td>
        <td>${edu.duration}</td>
    </tr>
`;
});
eduDiv.appendChild(eduTable);

//HOMEWORK9
//creating function for edit and removing skills 
$(document).ready(function(){
    let skills = [];

    function updateSkillsList(){
        const skillList = $("#skills ul");
        skillList.empty();

        skills.forEach((skill, index) => {
            const listItem = $(`
                <li>
                    <span class="skill-text">${skill}</span>
                    <button class="edit-skill btn btn-warning btn-sm ms-2">Edit</button>
                    <button class="delete-skill btn btn-danger btn-sm ms-1">X</button>
                    </li>
                    `).hide().fadeIn(400);
                    skillList.append(listItem);
        });
    }
    //adding a skill
    $("#addSkillBtn").off("click").on("click", function(){
        const skillValue = $("#skillInput").val().trim();
        if (skillValue == ""){
            alert("Please enter a skill!");
            return;
        }
        if (skills.includes(skillValue)){
            alert("That skill alreadys exists!");
            return;
        }
        skills.push(skillValue);
        updateSkillsList();
        $("#skillInput").val("");
    });
    $("#skills").on("click", ".edit-skill", function(){
    const index = $(this).closest("li").index();
    const newSkill = prompt("Edit your skill:", skills[index]);
    if (newSkill && newSkill.trim() !== "") {
        skills[index] = newSkill.trim();
        updateSkillsList();
    }
});

    $("#skills").on("click", ".delete-skill", function(){
        const index = $(this).closest("li").index();
        $(this).closest("li").slideUp(300, function() {
            skills.splice(index, 1);
            updateSkillsList();
        });
    });
});

//creating navigation menu
$(document).ready(function(){
    const navItems = ["Skills", "Projects", "Education"];
    const navMenu = $("#navMenu");

    navItems.forEach(item => {
        const link = $(`<li><a href="#${item.toLowerCase()}" class="nav-link">${item}</a></li>`);
        navMenu.append(link);
    });
    $(".nav-link").on("click", function(e){
        e.preventDefault();
        const target = $(this).attr("href");
        $("html, body").animate({
            scrollTop: $(target).offset().top
    }, 800);
    });
});

//create function to sort functions based on due date
$(document).ready(function() {
    const projects = [
        {
            title: "Portfolio Website",
            description: "My personal website built using JS, CSS, and HTML.",
            deadline: new Date("2025-11-25"),
            imageURL: "https://via/placeholder.com/200"
        },
        {
            title: "MIPS card dealer",
            description: "MIPS assembly random card generator",
            deadline: new Date("2025-03-17"),
            imageURL: "https://via/placeholder.com/200"
        },
        {
            title: "Yahtzee Game",
            description: "Dice game using C",
            deadline: new Date("2025-08-28"),
            imageURL: "https://via/placeholder.com/200"
        }
    ];
function renderProjects(){
    const container = $("#projectContainer");
    container.empty();
    projects.forEach(p =>{
        const card = $(`
            <div class="card p-3 mb-3">
            <img src="${p.imageURL}" alt="${p.title}" class="img-fluid rounded mb-2">
            <h4>${p.title}</h4>
            <p>${p.description}</p>
            <p><b>Deadline:</b> ${p.deadline.toDateString()}</p>
            </div>
            `);
            container.append(card);
    });
}

renderProjects();

//adding the sorting buttons
$("#sortAsc").on("click", function() {
    projects.sort((a, b) => a.deadline - b.deadline);
    renderProjects();
});

$("#sortDesc").on("click", function() {
    projects.sort((a, b) => b.deadline - a.deadline);
    renderProjects();
});
});

//adding keyboard events
$(document).ready(function() {
    $("#skillInput").on("keydown", function(e) {
        if (e.key == "Enter"){
            $("#addSkillBtn").click();
        } else if(e.key == "Escape"){
            $(this).val("");
        }
    });
});