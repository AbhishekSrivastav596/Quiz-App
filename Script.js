let Operator1 = ['+', '-', '*', '/'];
    let formElem = document.getElementById("abhishek");
    let scoreElem = document.getElementById("score");
    let timerDisplay = document.getElementById("timerDisplay");
    let timerDuration = 60; 
    let timer;

    function shuffle(optionsArray) {
      for (let i = optionsArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [optionsArray[i], optionsArray[j]] = [optionsArray[j], optionsArray[i]];
      }
      return optionsArray;
    }

    let correct = [];

    function generateQuestions() {
      correct = []; // Reset the correct answers array
      formElem.innerHTML = ''; // Clear existing questions

      for (let i = 1; i < 5; i++) {
        let num1 = Math.floor(Math.random() * 10 + 1);
        let num2 = Math.floor(Math.random() * 10 + 1);
        let operator = Operator1[Math.floor(Math.random() * 4)];
        let div1 = document.createElement("div");
        div1.classList.add("question");
        div1.appendChild(document.createElement("br"));

        let ques = document.createElement("label");
        let calculate = Math.floor(eval(num1 + operator + num2));
        correct.push({question: `ques${i}`, answer: calculate, div: div1});
       
        ques.textContent = `Q${i}: Solve: ${num1} ${operator} ${num2}`;
        div1.appendChild(ques);
        div1.appendChild(document.createElement("br"));
        div1.appendChild(document.createElement("br"));

        let optionsArray = [
          calculate,
          calculate - Math.floor(Math.random() * 10 + 1),
          calculate + Math.floor(Math.random() * (5 - 0 + 1) + 0),
          calculate + Math.floor(Math.random() * (10 - 5 + 1) + 5)
        ];

        shuffle(optionsArray);

        for (let j = 0; j < 4; j++) {
          let input = document.createElement("input");
          input.type = "radio";
          input.name = `ques${i}`;
          input.value = optionsArray[j];
          
          let label = document.createElement("label");
          label.textContent = optionsArray[j];
          
          div1.appendChild(input);
          div1.appendChild(label);
          div1.appendChild(document.createElement("br"));
        }
     
        formElem.appendChild(div1);
      }
    }

    function startTimer(duration) {
      let timerSeconds = duration;
      timerDisplay.textContent = formatTime(timerSeconds);

      timer = setInterval(() => {
        timerSeconds--;
        if (timerSeconds <= 0) {
          clearInterval(timer);
          document.getElementById('submitbtn').click(); 
        }
        timerDisplay.textContent = formatTime(timerSeconds);
      }, 1000);
    }

    function formatTime(seconds) {
      const minutes = Math.floor(seconds / 60);
      const secs = seconds % 60;
      return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }

    document.getElementById('submitbtn').addEventListener('click', e => {
      e.preventDefault();
      clearInterval(timer);
      let score = 0;
      correct.forEach(q => {
        let selection = document.querySelector(`input[name="${q.question}"]:checked`);
        if (selection && Number(selection.value) === q.answer) {
          q.div.classList.remove('incorrect');
          q.div.classList.add('correct');
          score++;
        } else {
          q.div.classList.remove('correct');
          q.div.classList.add('incorrect');
        }
      });

      scoreElem.textContent = `Your score is ${score} out of ${correct.length}`;
    });

    document.getElementById('resetbtn').addEventListener('click', () => {
   
      clearInterval(timer);
      timerDisplay.textContent = formatTime(timerDuration);
      
 
      document.getElementById('abhishek').reset();


      document.querySelectorAll('.question').forEach(q => {
        q.classList.remove('correct', 'incorrect');
      });

  
      scoreElem.textContent = '';

      startTimer(timerDuration);
    });

   
    generateQuestions();
    startTimer(timerDuration);