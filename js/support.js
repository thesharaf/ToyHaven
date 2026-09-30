// This is the feedback and FAQ JavaScript.
const feedbackForm = document.getElementById("feedback-form");

// This runs when the form is submitted.
feedbackForm.addEventListener("submit", function (event) {
    // This stops form submission from reloading the page.
    event.preventDefault();

    // This selects the name field.
    const name = document.getElementById("name");
    // This selects the message field or message area.
    const message = document.getElementById("message");

    // This removes spaces from the beginning and end of the name.
    name.value = name.value.trim();
    // This removes extra spaces around the feedback.
    message.value = message.value.trim();

    // This stops here if the form is not valid.
    if (validateForm(feedbackForm, "feedback-message") == false) return;

    // This reads previously saved feedback.
    let feedback = readData("toyFeedback", []);
    // This adds the submitted feedback to the saved list.
    feedback.push({
        name: name.value,
        email: document.getElementById("feedback-email").value.trim(),
        message: message.value
    });
    // This saves the updated data in localStorage.
    saveData("toyFeedback", feedback);

    // This selects the area for the form message.
    const output = document.getElementById("feedback-message");
    output.innerText = "Thank you! Your feedback is saved in this browser.";
    output.classList.add("good");

    // This clears the form after feedback is saved.
    feedbackForm.reset();
});

// This selects all FAQ buttons.
const questions = document.querySelectorAll(".faq-button");

// This adds a click action to each FAQ button.
for (let i = 0; i < questions.length; i++) {
    // This opens or closes the selected FAQ answer.
    questions[i].addEventListener("click", function () {
        // This checks whether this control is currently open.
        let open = questions[i].getAttribute("aria-expanded") == "true";
        questions[i].setAttribute("aria-expanded", !open);
        // This shows or hides the FAQ answer.
        document.getElementById(questions[i].getAttribute("aria-controls")).hidden = open;
    });
}
