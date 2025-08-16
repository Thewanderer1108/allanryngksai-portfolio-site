// Load resume data from facts.json
async function loadData() {
  try {
    const res = await fetch("facts.json");
    const data = await res.json();

    // About
    document.getElementById("about-text").textContent = data.summary;

    // Skills
    const skillsDiv = document.getElementById("skills-chips");
    data.skills.forEach(skill => {
      let span = document.createElement("span");
      span.textContent = skill;
      skillsDiv.appendChild(span);
    });

    // Experience
    const expDiv = document.getElementById("experience-timeline");
    data.experience.forEach(job => {
      let div = document.createElement("div");
      div.className = "job";
      div.innerHTML = `
        <h4>${job.role} — ${job.company}</h4>
        <p><em>${job.dates}</em></p>
        <p>${job.description}</p>
      `;
      expDiv.appendChild(div);
    });

    // Projects
    const projDiv = document.getElementById("projects-grid");
    data.projects.forEach(proj => {
      let card = document.createElement("div");
      card.className = "project-card";
      card.innerHTML = `
        <h4>${proj.title}</h4>
        <p>${proj.description}</p>
      `;
      projDiv.appendChild(card);
    });

    // Education & Certifications
    const eduDiv = document.getElementById("edu-cert-grid");
    data.education.forEach(edu => {
      let div = document.createElement("div");
      div.className = "project-card";
      div.innerHTML = `
        <h4>${edu.institution}</h4>
        <p>${edu.degree} (${edu.year})</p>
      `;
      eduDiv.appendChild(div);
    });
    data.certifications.forEach(cert => {
      let div = document.createElement("div");
      div.className = "project-card";
      div.innerHTML = `
        <h4>${cert.name}</h4>
        <p>${cert.issuer}</p>
      `;
      eduDiv.appendChild(div);
    });

    // Contact
    const contactDiv = document.getElementById("contact-links");
    data.contact.forEach(link => {
      let a = document.createElement("a");
      a.href = link.url;
      a.target = "_blank";
      a.textContent = link.label;
      contactDiv.appendChild(a);
    });

  } catch (err) {
    console.error("Error loading resume data:", err);
  }
}

// Smooth scroll for nav links
document.querySelectorAll("nav a").forEach(link => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth"
    });
  });
});

// Run
loadData();