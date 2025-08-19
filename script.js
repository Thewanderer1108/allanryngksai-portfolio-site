// Load content.json dynamically
fetch("content.json")
  .then(response => response.json())
  .then(data => {
    // --- SKILLS ---
    const skillsContainer = document.getElementById("skills-chips");
    skillsContainer.innerHTML = data.skills
      .map(skill => `<span>${skill}</span>`)
      .join("");

    // --- EXPERIENCE ---
    const expContainer = document.getElementById("experience-timeline");
    expContainer.innerHTML = data.experience
      .map(
        job => `
        <div class="job">
          <h4>${job.role} — ${job.company}</h4>
          <p><em>${job.years}</em></p>
          <ul>
            ${job.highlights
              .map(highlight => `<li>${highlight}</li>`)
              .join("")}
          </ul>
        </div>
      `
      )
      .join("");

    // --- EDUCATION ---
    const eduContainer = document.getElementById("education-list");
    eduContainer.innerHTML = data.education
      .map(edu => `<li>${edu}</li>`)
      .join("");

    // --- PROJECTS ---
    const projContainer = document.getElementById("projects-grid");
    projContainer.innerHTML = data.projects
      .map(
        project => `
        <div class="project-card">
          <p>${project}</p>
        </div>
      `
      )
      .join("");
  })
  .catch(err => console.error("Error loading content.json:", err));