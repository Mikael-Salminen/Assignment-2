const container = document.getElementById("quizContainer");

// Mallin tälle fetch funktiolle sain tekoälyltä
fetch("https://raw.githubusercontent.com/Mikael-Salminen/Assignment-2/refs/heads/main/questions.json")
    .then(res => res.json())
    .then(data => {
        data.forEach((q, index) => {

        const questionDiv = document.createElement("div");
        questionDiv.classList.add("question");

        const questionIndex = document.createElement("h3");
        questionIndex.textContent = "Question " + (index + 1);
        questionDiv.appendChild(questionIndex);

        const questionText = document.createElement("p");
        questionText.textContent = q.question;
        questionDiv.appendChild(questionText);

        q.options.forEach((option, i) => {
            const label = document.createElement("label");

            const radio = document.createElement("input");
            radio.type = "radio";
            radio.name = "question" + index;
            radio.value = i;

            radio.dataset.correct = i === q.correct ? "true" : "false";

            label.appendChild(radio);
            label.appendChild(document.createTextNode(option));

            questionDiv.appendChild(label);
            questionDiv.appendChild(document.createElement("br"));
        });
        container.appendChild(questionDiv);
        });
    })
.catch(err => console.error(err));

document.getElementById("submit").addEventListener("click", () => {
    const questions = document.querySelectorAll(".question");
    let correct = 0, incorrect = 0;

    questions.forEach(q => {
        const selected = q.querySelector("input:checked");
        if (selected && selected.dataset.correct === "true")
            correct++;
        else
            incorrect++;
    });

    if (document.getElementById("results") == null) {
        const results = document.createElement("p");
        results.id = "results";
        results.style.backgroundColor = "lightcyan";
        results.style.padding = "15px";
        container.appendChild(results);
    }


    document.getElementById("results").innerHTML = `<strong>Result:</strong> You got ${correct} correct and ${incorrect} wrong out of ${questions.length}.`
});