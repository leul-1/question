  let questions = [
            { q: "Which type of bond is formed by the transfer of electrons?", options: ["Covalent", "Metallic", "Ionic", "Hydrogen"], answer: "Ionic" },
            { q: "What type of bond exists in water (H₂O)?", options: ["Ionic", "Nonpolar covalent", "Polar covalent", "Metallic"], answer: "Polar covalent" },
            { q: "Which has a triple bond?", options: ["O₂", "N₂", "CO₂", "H₂O"], answer: "N₂" },
            { q: "Which molecule exhibits resonance?", options: ["NH₃", "H₂O", "NO₃⁻", "CH₄"], answer: "NO₃⁻" },
            { q: "Which element has the highest electronegativity?", options: ["Oxygen", "Fluorine", "Nitrogen", "Chlorine"], answer: "Fluorine" },
            { q: "What is the shape of methane (CH₄)?", options: ["Trigonal planar", "Bent", "Tetrahedral", "Linear"], answer: "Tetrahedral" },
            { q: "What is the bond angle in NH₃?", options: ["109.5°", "104.5°", "120°", "107°"], answer: "107°" },
            { q: "What type of intermolecular force exists in water?", options: ["London dispersion", "Dipole-dipole", "Hydrogen bonding", "Ionic"], answer: "Hydrogen bonding" },
            { q: "Which has sp² hybridization?", options: ["CH₄", "CO₂", "C₂H₄", "NH₃"], answer: "C₂H₄" },
            { q: "Which molecule has a linear shape?", options: ["H₂O", "CH₄", "CO₂", "NH₃"], answer: "CO₂" },
            { q: "Which molecule is nonpolar?", options: ["H₂O", "NH₃", "CO₂", "HCl"], answer: "CO₂" },
            { q: "What type of bond exists in Fe?", options: ["Covalent", "Ionic", "Metallic", "Hydrogen"], answer: "Metallic" },
            { q: "Which molecule contains a coordinate covalent bond?", options: ["NH₃", "H₂O", "NH₄⁺", "CH₄"], answer: "NH₄⁺" },
            { q: "What is the hybridization of carbon in CO₂?", options: ["sp", "sp²", "sp³", "sp³d"], answer: "sp" },
            { q: "What increases bond strength?", options: ["Increasing bond length", "Decreasing bond order", "Increasing bond order", "Reducing electron density"], answer: "Increasing bond order" },
            { q: "What type of bonding holds DNA strands together?", options: ["Ionic", "Covalent", "Hydrogen", "Metallic"], answer: "Hydrogen" },
            { q: "Which noble gas forms stable compounds like XeF₄?", options: ["Ne", "Ar", "Kr", "Xe"], answer: "Xe" },
            { q: "What is the formal charge of oxygen in O₃?", options: ["0", "-1", "+1", "-2"], answer: "-1" },
            { q: "Which element can form an expanded octet?", options: ["B", "O", "S", "Be"], answer: "S" },
            { q: "Which molecule has a dipole moment?", options: ["CO₂", "CH₄", "NH₃", "BF₃"], answer: "NH₃" }
        ];

        let username = "";
        let currentQuestion = 0;
        let score = 0;
        let timer;
        let timeLeft = 300;  // 5 minutes = 300 seconds

        function startQuiz() {
            username = document.getElementById("username").value;
            if (!username) {
                alert("Please enter your name!");
                return;
            }
            document.getElementById("register-box").style.display = "none";
            document.getElementById("quiz-box").style.display = "block";
            loadQuestion();
        }

        function loadQuestion() {
            let q = questions[currentQuestion];
            document.getElementById("question").innerText = q.q;
            let optionsHtml = "";
            q.options.forEach(option => {
                optionsHtml += `<button class="btn btn-outline-primary d-block my-2" onclick="checkAnswer('${option}')">${option}</button>`;
            });
            document.getElementById("options").innerHTML = optionsHtml;
            document.getElementById("feedback").innerText = "";

            // Start the timer
            timeLeft = 300;  // reset timer to 5 minutes
            startTimer();
        }

        function startTimer() {
            clearInterval(timer);
            timer = setInterval(function () {
                if (timeLeft <= 0) {
                    clearInterval(timer);
                    nextQuestion();
                    return;
                }
                document.getElementById("timer").innerText = `Time remaining: ${Math.floor(timeLeft / 60)}:${timeLeft % 60 < 10 ? '0' : ''}${timeLeft % 60}`;
                timeLeft--;
            }, 1000);
        }

        function checkAnswer(selected) {
            let correct = questions[currentQuestion].answer;
            if (selected === correct) {
                score++;
                document.getElementById("feedback").innerHTML = "<span class='text-success'>Correct!</span>";
            } else {
                document.getElementById("feedback").innerHTML = `<span class='text-danger'>Wrong! The correct answer is ${correct}.</span>`;
            }
        }

        function nextQuestion() {
            if (currentQuestion < questions.length - 1) {
                currentQuestion++;
                loadQuestion();
            } else {
                saveResult();
            }
        }

       function saveResult() {
    fetch("http://localhost/project/s.php", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `name=${username}&score=${score}`
    })
    .then(response => response.text())
    .then(data => {
        document.getElementById("quiz-box").innerHTML = `<h3>${username}, your final score is ${score}/${questions.length}!</h3><p>${data}</p>`;
    });
}
