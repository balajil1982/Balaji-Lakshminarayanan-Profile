const API_URL = "https://balaji-ai-agent.onrender.com/ask";

const questionInput = document.getElementById("ai-question");
const askButton = document.getElementById("ask-ai-btn");
const answerBox = document.getElementById("ai-answer");
const loadingBox = document.getElementById("ai-loading");
const sourcesBox = document.getElementById("ai-sources");

// =====================================================
// ASK BALAJI AI
// =====================================================

async function askBalajiAI() {

```
const question = questionInput.value.trim();

if (!question) {

    answerBox.innerHTML = `
        <div class="answer-title">
            🤖 Balaji AI
        </div>

        <p>Please enter a question.</p>
    `;

    return;
}


askButton.disabled = true;

loadingBox.style.display = "block";

answerBox.innerHTML = "";

sourcesBox.innerHTML = "";


try {

    const response = await fetch(API_URL, {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            question: question
        })

    });


    if (!response.ok) {

        throw new Error(
            `API error: ${response.status}`
        );

    }


    const data = await response.json();


    answerBox.innerHTML = `

        <div class="answer-title">
            🤖 Balaji AI
        </div>

        <p>
            ${formatAnswer(data.answer)}
        </p>

    `;


    if (
        data.sources &&
        data.sources.length > 0
    ) {

        sourcesBox.innerHTML = `

            <strong>📚 Sources:</strong>
            ${data.sources.join(", ")}

        `;

    }


} catch (error) {

    console.error(error);


    answerBox.innerHTML = `

        <div class="answer-title">
            🤖 Balaji AI
        </div>

        <p>
            Sorry, I couldn't connect to the AI service.
            Please try again.
        </p>

    `;

} finally {

    askButton.disabled = false;

    loadingBox.style.display = "none";

}
```

}

// =====================================================
// FORMAT ANSWER
// =====================================================

function formatAnswer(text) {

```
if (!text) {
    return "No answer was returned.";
}

return text
    .replace(/\n\n/g, "<br><br>")
    .replace(/\n/g, "<br>");
```

}

// =====================================================
// ASK BUTTON
// =====================================================

askButton.addEventListener(
"click",
askBalajiAI
);

// =====================================================
// ENTER KEY
// =====================================================

questionInput.addEventListener(
"keydown",
function(event) {

```
    if (
        event.key === "Enter" &&
        !event.shiftKey
    ) {

        event.preventDefault();

        askBalajiAI();

    }

}
```

);

// =====================================================
// QUICK QUESTIONS
// =====================================================

const questionButtons =
document.querySelectorAll(".question-btn");

questionButtons.forEach(
function(button) {

```
    button.addEventListener(
        "click",
        function() {

            questionInput.value =
                button.textContent.trim();

            questionInput.focus();

            askBalajiAI();

        }
    );

}
```

);
