// select all elements
const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const qImg = document.getElementById("qImg");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const counter = document.getElementById("counter");
const timeGauge = document.getElementById("timeGauge");
const progress = document.getElementById("progress");
const scoreDiv = document.getElementById("scoreContainer");

// create our questions
let questions = [
    {
        question : 'Was bedeutet "im Dunkeln tappen"?',
        imgSrc : "https://media.discordapp.net/attachments/790263827546898453/851415703315546132/blindfolded2.png",
        choiceA : "kein Licht anhaben",
        choiceB : "keine Ahnung haben",
        choiceC : "Pech haben",
        correct : "B"
    },{
        question : 'Was bedeutet "Ein Mann, ein Wort!"?',
        imgSrc : "img/css.png",
        choiceA : "Mit Worten kann man viel erreichen",
        choiceB : "Ein Mann ist sehr stark",
        choiceC : "Ein Ehrenwort",
        correct : "C"
    },{
        question : 'Was bedeutet "Im falschem Film sein"?',
        imgSrc : "img/js.png",
        choiceA : "Das alles gut läuft",
        choiceB : "Das man fehl am Platz ist",
        choiceC : "Das alles falsch läuft",
        correct : "C"
    },{
        question: 'Was bedeutet "Daum aufs Auge drücken"?',
        img: "",
        choiceA : "Jemanden zu etwas zwingen",
        choiceB :"Jemanden die Sicht versperren",
        choiceC :"Jemanden schlagen",
        correct:"A"
    },{
        question: 'Was bedeutet "Mit Ach und Krach"?',
        img: "",
        choiceA: "Etwas sehr laut machen",
        choiceB: "Etwas gerade noch so machen",
        choiceC: "Etwas mit sehr viel Aufmerksamkeit machen",
        correct: "B"
    },{
        question: 'Was bedeutet "wie Faust aufs Auge passen"?',
        img: "",
        choiceA: "Etwas passt perfekt",
        choiceB: "Etwas passt gar nicht",
        choiceC: "Jemanden Schlagen",
        correct: "A"
    },{
        question: 'Was bedeutet "ins Gras beißen"?',
        img: "",
        choiceA: 'Zum Veganer werden',
        choiceB: "Drogen abhängig werden",
        choiceC: "Sterben",
        correct: "C"
    },{
        question: 'Was bedeutet "Das A und O"?',
        img: "",
        choiceA: "Etwas essentzielles",
        choiceB: "Der Anfang und das Ende",
        choiceC: "Die Rüstung eines Ritters",
        correct: "A"
    },{
        question: 'Was bedeutet "Einen Pfennig zweimal umdrehen"?',
        img: "",
        choiceA: "Vorsichtig sein",
        choiceB: "Geizig sein",
        choiceC: "Kleine Dinge ehren",
        correct: "B"
    },{
        question: 'Was bedeutet "Jemanden zum Sündenbock machen"?',
        img: "",
        choiceA: "Jemanden anschreien",
        choiceB: "Jemanden betrügen",
        choiceC: "Jemanden beschuldigen",
        correct: "C"
    }

];

// create some variables

const lastQuestion = questions.length - 1;
let runningQuestion = 0;
let count = 0;
const questionTime = 15; 
const gaugeWidth = 150; // 150px
const gaugeUnit = gaugeWidth / questionTime;
let TIMER;
let score = 0;

// render a question
function renderQuestion(){
    let q = questions[runningQuestion];

    question.innerHTML = "<p>"+ q.question +"</p>";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
}

start.addEventListener("click",startQuiz);

// start quiz
function startQuiz(){
    start.style.display = "none";
    renderQuestion();
    quiz.style.display = "block";
    renderProgress();
    renderCounter();
    TIMER = setInterval(renderCounter,1000); // 1000ms = 1s
}

// render progress
function renderProgress(){
    for(let qIndex = 0; qIndex <= lastQuestion; qIndex++){
        progress.innerHTML += "<div class='prog' id="+ qIndex +"></div>";
    }
}

// counter render

function renderCounter(){
    if(count <= questionTime){
        counter.innerHTML = count;
        timeGauge.style.width = count * gaugeUnit + "px";
        count++
    }else{
        count = 0;
        // change progress color to red
        answerIsWrong();
        if(runningQuestion < lastQuestion){
            runningQuestion++;
            renderQuestion();
        }else{
            // end the quiz and show the score
            clearInterval(TIMER);
            scoreRender();
        }
    }
}

// checkAnwer

function checkAnswer(answer){
    if( answer == questions[runningQuestion].correct){
        // answer is correct
        score++;
        // change progress color to green
        answerIsCorrect();
    }else{
        // answer is wrong
        // change progress color to red
        answerIsWrong();
    }
    count = 0;
    if(runningQuestion < lastQuestion){
        runningQuestion++;
        renderQuestion();
    }else{
        // end the quiz and show the score
        clearInterval(TIMER);
        scoreRender();
    }
}

// answer is correct
function answerIsCorrect(){
    document.getElementById(runningQuestion).style.backgroundColor = "#0f0";
}

// answer is Wrong
function answerIsWrong(){
    document.getElementById(runningQuestion).style.backgroundColor = "#f00";
}

// score render
function scoreRender(){
    scoreDiv.style.display= "block"

    // calculate the amount of question percent answered by the user
    const scorePerCent = Math.round(100 * score/questions.length);

    // choose the image based on the scorePerCent
    let img = (scorePerCent >= 80) ? "img/5.png" :
              (scorePerCent >= 60) ? "img/4.png" :
              (scorePerCent >= 40) ? "img/3.png" :
              (scorePerCent >= 20) ? "img/2.png" :
              "img/1.png";

    scoreDiv.innerHTML = "<img src="+ img +">";
    scoreDiv.innerHTML += '<p>'+ scorePerCent +'% <p>';
}
