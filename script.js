const API_URL = "https://balaji-ai-agent.onrender.com/ask";

document.addEventListener("DOMContentLoaded", function () {

```
const questionInput = document.getElementById("ai-question");
const askButton = document.getElementById("ask-ai-btn");
const answerBox = document.getElementById("ai-answer");
const loadingBox = document.getElementById("ai-loading");
const sourcesBox = document.getElementById("ai-sources");

// =====================================================
// ASK BALAJI AI
// =====================================================

async function askBalajiAI() {

    const question = questionInput.value.trim();

    if (!question) {

        answerBox.innerHTML = `
            <div class="answer-title">
                🤖 Balaji AI
            </div>

            <p>
                Please enter a question.
            </p>
        `;

        questionInput.focus();

        return;
    }


    // Disable button
    askButton.disabled = true;


    // Show loading
    loadingBox.style.display = "flex";


    // Clear previous answer
    answerBox.innerHTML = `
        <div class="answer-title">
            🤖 Balaji AI
        </div>

        <p>
            Thinking...
        </p>
    `;


    sourcesBox.innerHTML = "";


    try {

        const response = await fetch(API_URL, {

            method: "POST",

            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },

            body: JSON.stringify({
                question: question
            })

        });


        if (!response.ok) {

            throw new Error(
                "API returned status " + response.status
            );

        }


        const data = await response.json();


        // =================================================
        // DISPLAY ANSWER
        // =================================================

        answerBox.innerHTML = `
            <div class="answer-title">
                🤖 Balaji AI
            </div>

            <p>
                ${formatAnswer(data.answer)}
            </p>
        `;


        // =================================================
        // DISPLAY SOURCES
        // =================================================

        if (
            data.sources &&
            Array.isArray(data.sources) &&
            data.sources.length > 0
        ) {

            sourcesBox.innerHTML = `
                <div class="source-title">
                    📚 Sources
                </div>

                <div class="source-list">
                    ${data.sources
                        .map(source => `<span>${escapeHTML(source)}</span>`)
                        .join("")
                    }
                </div>
            `;

        }


    } catch (error) {

        console.error(
            "Balaji AI connection error:",
            error
        );


        answerBox.innerHTML = `
            <div class="answer-title">
                🤖 Balaji AI
            </div>

            <p class="error-message">
                Sorry, I couldn't connect to the AI service.
                Please try again.
            </p>

            <small>
                The AI backend may be waking up.
                Please wait a few seconds and try again.
            </small>
        `;

    } finally {

        askButton.disabled = false;

        loadingBox.style.display = "none";

    }

}


// =====================================================
// FORMAT ANSWER
// =====================================================

function formatAnswer(text) {

    if (!text) {
        return "No answer was returned.";
    }


    return escapeHTML(text)
        .replace(/\n\n/g, "<br><br>")
        .replace(/\n/g, "<br>");

}


// =====================================================
// HTML ESCAPE
// =====================================================

function escapeHTML(text) {

    const div = document.createElement("div");

    div.textContent = text;

    return div.innerHTML;

}


// =====================================================
// MAIN ASK BUTTON
// =====================================================

if (askButton) {

    askButton.addEventListener(
        "click",
        askBalajiAI
    );

}


// =====================================================
// ENTER KEY
// =====================================================

if (questionInput) {

    questionInput.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Enter" &&
                !event.shiftKey
            ) {

                event.preventDefault();

                askBalajiAI();

            }

        }
    );

}


// =====================================================
// CLICKABLE SUGGESTED QUESTIONS
// =====================================================

const suggestedQuestions =
    document.querySelectorAll(".ai-question");


suggestedQuestions.forEach(function (button) {

    button.addEventListener(
        "click",
        function () {

            const selectedQuestion =
                this.textContent.trim();


            // Put question into textbox
            questionInput.value =
                selectedQuestion;


            // Scroll to textbox
            questionInput.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });


            // Focus textbox
            questionInput.focus();


            // Automatically ask AI
            askBalajiAI();

        }
    );

});
```

});
