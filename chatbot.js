async function loadFacts() {
  const response = await fetch("facts.json");
  return response.json();
}

function findAnswer(question, knowledgeBase) {
  question = question.toLowerCase();

  // Loop through categories (work, education, skills, personal, etc.)
  for (const category in knowledgeBase) {
    const subtopics = knowledgeBase[category];

    for (const sub in subtopics) {
      const item = subtopics[sub];

      // Check if any keyword matches the user’s question
      if (item.keywords.some(keyword => question.includes(keyword))) {
        return item.answer;
      }
    }
  }

  return "I’m not sure about that. Try asking about my skills, education, or work experience!";
}

async function initChatbot() {
  const knowledgeBase = await loadFacts();

  const chatToggle = document.getElementById("chat-toggle");
  const chatWidget = document.getElementById("chat-widget");
  const chatBody = document.getElementById("chat-body");
  const chatSend = document.getElementById("chat-send");
  const chatInput = document.getElementById("chat-input");

  chatToggle.addEventListener("click", () => {
    chatWidget.classList.toggle("hidden");
  });

  chatSend.addEventListener("click", () => {
    handleUserInput();
  });

  chatInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      handleUserInput();
    }
  });

  function handleUserInput() {
    const userText = chatInput.value.trim();
    if (!userText) return;

    appendMessage(userText, "user");
    chatInput.value = "";

    setTimeout(() => {
      const answer = findAnswer(userText, knowledgeBase);
      appendMessage(answer, "bot");
    }, 500);
  }

  function appendMessage(text, sender) {
    const msg = document.createElement("div");
    msg.classList.add(sender);
    msg.innerText = text;
    chatBody.appendChild(msg);
    chatBody.scrollTop = chatBody.scrollHeight;
  }
}

initChatbot();