// GET THE CURRENT YEAR
const currentYear = new Date().getFullYear();

// POPULATE HTMLS ELEMENTS WITH CURRENT YEAR AND LAST MODIFIED DATE
document.getElementById("currentyear").textContent = currentYear;
document.getElementById("lastModified").textContent = "Last Modified: " + document.lastModified;