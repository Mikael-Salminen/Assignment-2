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

            label.appendChild(radio);
            label.appendChild(document.createTextNode(option));

            questionDiv.appendChild(label);
            questionDiv.appendChild(document.createElement("br"));
        });
        container.appendChild(questionDiv);
        });
    })
.catch(err => console.error(err));