const bgMusic = document.getElementById("bgMusic");
const correctSound = document.getElementById("correctSound");
const wrongSound = document.getElementById("wrongSound");

bgMusic.volume = 0.3;
correctSound.volume = 1;
wrongSound.volume = 1;

const questions = [

{
question:"What does HTML stand for?",
options:["Hyper Text Markup Language","High Text Machine Language","Home Tool Markup Language","Hyper Tool Multi Language"],
answer:"Hyper Text Markup Language",
fact:"HTML creates the structure of webpages.",
image:""
},

{
question:"Which language styles websites?",
options:["Python","CSS","Java","C++"],
answer:"CSS",
fact:"CSS controls website colors and layouts.",
image:""
},

{
question:"Which planet is called Red Planet?",
options:["Earth","Mars","Jupiter","Venus"],
answer:"Mars",
fact:"Mars looks red due to iron oxide dust.",
image:"https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?q=80&w=1200&auto=format&fit=crop"
},

{
question:"Who invented telephone?",
options:["Tesla","Newton","Bell","Edison"],
answer:"Bell",
fact:"Alexander Graham Bell invented telephone.",
image:""
},

{
question:"Which animal is fastest?",
options:["Lion","Horse","Cheetah","Tiger"],
answer:"Cheetah",
fact:"Cheetah can run over 100 km/h.",
image:""
},

{
question:"Which gas humans breathe?",
options:["Oxygen","Nitrogen","Hydrogen","Helium"],
answer:"Oxygen",
fact:"Humans need oxygen to survive.",
image:""
},

{
question:"What is capital of India?",
options:["Delhi","Mumbai","Lucknow","Kolkata"],
answer:"Delhi",
fact:"New Delhi is the capital of India.",
image:""
},

{
question:"Which ocean is largest?",
options:["Atlantic","Indian","Pacific","Arctic"],
answer:"Pacific",
fact:"Pacific Ocean is largest ocean on Earth.",
image:""
},

{
question:"Who painted Mona Lisa?",
options:["Picasso","Da Vinci","Van Gogh","Tesla"],
answer:"Da Vinci",
fact:"Leonardo da Vinci painted Mona Lisa.",
image:""
},

{
question:"Which planet has rings?",
options:["Mars","Earth","Saturn","Venus"],
answer:"Saturn",
fact:"Saturn has beautiful rings.",
image:""
},

{
question:"Which is smallest prime number?",
options:["0","1","2","3"],
answer:"2",
fact:"2 is only even prime number.",
image:""
},

{
question:"Who discovered gravity?",
options:["Einstein","Newton","Tesla","Galileo"],
answer:"Newton",
fact:"Newton explained gravity.",
image:""
},

{
question:"Which metal is liquid?",
options:["Gold","Mercury","Silver","Iron"],
answer:"Mercury",
fact:"Mercury is liquid at room temperature.",
image:""
},

{
question:"Which country invented pizza?",
options:["France","India","Italy","Japan"],
answer:"Italy",
fact:"Pizza originated in Italy.",
image:""
},

{
question:"Which is hardest natural substance?",
options:["Iron","Diamond","Gold","Silver"],
answer:"Diamond",
fact:"Diamond is hardest natural substance.",
image:""
}

];

function shuffleArray(array){

    for(let i=array.length-1;i>0;i--){

        let j=Math.floor(Math.random()*(i+1));

        [array[i],array[j]]=[array[j],array[i]];
    }

    return array;
}

shuffleArray(questions);

const startBtn = document.getElementById("startBtn");
const nextBtn = document.getElementById("nextBtn");

const startScreen = document.getElementById("startScreen");
const quizScreen = document.getElementById("quizScreen");
const resultScreen = document.getElementById("resultScreen");

const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const questionImage = document.getElementById("questionImage");

const timerElement = document.getElementById("timer");

const finalScore = document.getElementById("finalScore");
const resultText = document.getElementById("resultText");

const factsContainer = document.getElementById("factsContainer");
const didYouKnow = document.getElementById("didYouKnow");

let currentQuestion = 0;
let score = 0;
let timer;
let timeLeft = 40;
let wrongFacts = [];

startBtn.addEventListener("click",()=>{

    const playerName =
    document.getElementById("playerName").value;

    if(playerName===""){

        alert("Enter your name");
        return;
    }

    document.getElementById("playerDisplay").innerText =
    playerName;

    startScreen.style.display="none";

    quizScreen.style.display="block";

    bgMusic.play();

    loadQuestion();
});

function loadQuestion(){

    resetState();

    let q = questions[currentQuestion];

    document.getElementById("questionCount").innerText =
    `Question ${currentQuestion+1} / ${questions.length}`;

    questionElement.innerText = q.question;

    if(q.image!==""){

        questionImage.style.display="block";

        questionImage.src=q.image;

    }else{

        questionImage.style.display="none";
    }

    shuffleArray(q.options);

    q.options.forEach(option=>{

        const button =
        document.createElement("button");

        button.innerText=option;

        button.classList.add("option-btn");

        button.addEventListener("click",()=>{

            selectAnswer(button,q.answer,q.fact);

        });

        optionsElement.appendChild(button);

    });

    startTimer();
}

function resetState(){

    clearInterval(timer);

    optionsElement.innerHTML="";

    nextBtn.style.display="none";

    timeLeft=40;

    timerElement.innerText=timeLeft;
}

function startTimer(){

    timer=setInterval(()=>{

        timeLeft--;

        timerElement.innerText=timeLeft;

        if(timeLeft<=0){

            clearInterval(timer);

            nextBtn.style.display="inline-block";
        }

    },1000);
}

function selectAnswer(button,answer,fact){

    clearInterval(timer);

    const buttons =
    document.querySelectorAll(".option-btn");

    buttons.forEach(btn=>{

        btn.disabled=true;

        if(btn.innerText===answer){

            btn.classList.add("correct");
        }

    });

    if(button.innerText===answer){

        button.classList.add("correct");

        correctSound.currentTime = 0;
        correctSound.play();

        score++;

    }else{

        button.classList.add("wrong");

        wrongSound.currentTime = 0;
        wrongSound.play();

        wrongFacts.push(fact);
    }

    nextBtn.style.display="inline-block";
}

nextBtn.addEventListener("click",()=>{

    currentQuestion++;

    if(currentQuestion<questions.length){

        loadQuestion();

    }else{

        showResult();
    }
});

function showResult(){

    quizScreen.style.display="none";

    resultScreen.style.display="block";

    finalScore.innerText=
    `${score} / ${questions.length}`;

    resultText.innerText=
    `Amazing Try 🔥`;

    document.getElementById("lastScore").innerText =
    score;

    if(wrongFacts.length===0){

        didYouKnow.style.display="none";

    }else{

        didYouKnow.style.display="block";

        wrongFacts.forEach(fact=>{

            const div =
            document.createElement("div");

            div.classList.add("fact");

            div.innerText=fact;

            factsContainer.appendChild(div);

        });

    }

    let highScore =
    localStorage.getItem("highScore") || 0;

    let highPlayer =
    localStorage.getItem("highPlayer") || "None";

    if(score > highScore){

        localStorage.setItem("highScore",score);

        localStorage.setItem(
            "highPlayer",
            document.getElementById("playerDisplay").innerText
        );

        highScore = score;

        highPlayer =
        document.getElementById("playerDisplay").innerText;
    }

    document.getElementById("highScoreText").innerText =
    `🏆 High Score : ${highPlayer} (${highScore})`;
}

/* POPUP */

const popup =
document.getElementById("popup");

const overlay =
document.getElementById("overlay");

document.getElementById("helpBtn")
.addEventListener("click",()=>{

    popup.classList.add("active");
    overlay.classList.add("active");

});

document.getElementById("closePopup")
.addEventListener("click",()=>{

    popup.classList.remove("active");
    overlay.classList.remove("active");

});