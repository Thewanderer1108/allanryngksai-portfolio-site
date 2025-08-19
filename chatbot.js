let resumeData = {};

// Load facts.json so chatbot can use it
fetch("facts.json")
  .then(res => res.json())
  .then(data => {
    resumeData = data;
  });

// Chatbot UI handlers
const chatToggle = document.getElementById("chat-toggle");
const chatWidget = document.getElementById("chat-widget");
const chatClose = document.getElementById("chat-close");
const chatBody = document.getElementById("chat-body");
const chatInput = document.getElementById("chat-question");
const chatSend = document.getElementById("chat-send");

chatToggle.addEventListener("click", () => {
  chatWidget.classList.toggle("hidden");
});
chatClose.addEventListener("click", () => {
  chatWidget.classList.add("hidden");
});

chatSend.addEventListener("click", () => {
  handleQuestion();
});
chatInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") handleQuestion();
});

// Add messages to chat window
function addMessage(sender, text) {
  let msg = document.createElement("div");
  msg.className = sender;
  msg.textContent = text;
  chatBody.appendChild(msg);
  chatBody.scrollTop = chatBody.scrollHeight;
}

// Handle question
function handleQuestion() {
  const question = chatInput.value.trim();
  if (!question) return;

  addMessage("user", question);
  chatInput.value = "";

  // Show typing indicator
  const typingMsg = document.createElement("div");
  typingMsg.className = "bot typing";
  typingMsg.textContent = "Allan is typing...";
  chatBody.appendChild(typingMsg);
  chatBody.scrollTop = chatBody.scrollHeight;

  setTimeout(() => {
    // Remove typing message
    typingMsg.remove();

    // Generate answer
    const answer = findAnswer(question.toLowerCase());
    addMessage("bot", answer);
  }, 1000); // 1s delay for realism
}

// Find answer based on facts.json
function findAnswer(question) {
  // Summary / About
  if (question.includes("about") || question.includes("summary")) {
    return resumeData.summary;
  }

  // Skills
  if (question.includes("skills") || question.includes("technologies")) {
    return "My key skills include: " + resumeData.skills.join(", ");
  }

  // Experience
  if (question.includes("experience") || question.includes("work history")) {
    return resumeData.experience.map(
      job => `${job.role} at ${job.company} (${job.dates})`
    ).join(" | ");
  }

  // Projects
  if (question.includes("projects") || question.includes("portfolio")) {
    return resumeData.projects.map(
      p => `${p.title}: ${p.description}`
    ).join(" | ");
  }

  // Education
  if (question.includes("education") || question.includes("degree")) {
    return resumeData.education.map(
      e => `${e.degree} from ${e.institution} (${e.year})`
    ).join(" | ");
  }

  // Certifications
  if (question.includes("certifications") || question.includes("certified")) {
    return resumeData.certifications.map(
      c => `${c.name} (${c.issuer})`
    ).join(" | ");
  }

  // Contact
  if (question.includes("contact") || question.includes("email") || question.includes("linkedin")) {
    return "You can reach me at: " + resumeData.contact.map(
      c => `${c.label}: ${c.url}`
    ).join(" | ");
  }

  return "I’m not sure about that. Try asking about my skills, experience, projects, education, or contact info!";
}
// Make chat widget draggable
dragElement(document.getElementById("chat-widget"));

function dragElement(elmnt) {
  let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  const header = elmnt.querySelector(".chat-header");
  if (header) {
    header.onmousedown = dragMouseDown;
  } else {
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e.preventDefault();
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e.preventDefault();
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}