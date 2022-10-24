
// Select Elements ....
let categoryShow = document.querySelector('.category-show');
let questionNumShow = document.querySelector('.question-num-show');
let bulets = document.querySelector('.bulets');
let countDownShow = document.querySelector('.count-down-show');
let submitBtn = document.querySelector('.submit');
let titleShow = document.querySelector('.title-show');
let questionSec = document.querySelector('.question-sec');
let resultSec = document.querySelector('.result-sec');
let oopsShow = document.querySelector('.result-sec h2');
let resultShow = document.querySelector('.result-sec h3');
let appreciateShow = document.querySelector('.result-sec h4');


let rightAnswerNumber = 0;
let currentQuestion = 0;
let countDown;
let choosenAnswer ;
fetch('quizApp.json').then((resolve)=>{
  let result = resolve.json();
  return result;
}).then((res)=>{
  console.log(res);
  let resCount = res.length;

  getQuestion(res[currentQuestion],resCount)

  createBulets(res[currentQuestion],resCount)

  addcountDown(1,resCount)

  handleBulets(resCount);

  submitBtn.onclick = ()=>{
    let rightAnswer = res[currentQuestion].right_answer;
    
    currentQuestion++;

    // checkAnswer(rightAnswer,resCount)

    questionSec.innerHTML = '';

    getQuestion(res[currentQuestion],resCount)

    handleBulets(resCount)

    
    if(choosenAnswer == rightAnswer){
      rightAnswerNumber++;
      console.log('ss')
    }
    
    showResult(resCount);
  }
})


// Get Question Data From Json File ......
function getQuestion(obj,count) {
  if(currentQuestion<count){
    let question = document.createElement('div');
    question.className = 'question';
    // get The Question Title from Json + Add It to Element ....
    let questionTitle = document.createElement("div");
    questionTitle.className = "question-title";

    let titleShow = document.createElement("div");
    titleShow.textContent = `${currentQuestion+1}- ${obj.title}`;

    questionTitle.appendChild(titleShow);
    // create answers div .....
    let answers = document.createElement('div');
    answers.className = 'answers';
    // create answers children div .....
    for (let i = 1; i <= 4; i++) {
      //  create answer element .....
      let answer = document.createElement('div');
      answer.className = 'answer';

      //  create answer radioInput element .....
      let radioInput = document.createElement('input');
      radioInput.type="radio";
      radioInput.required=true;
      radioInput.name="answers";
      radioInput.id=`answer-${i}`
      radioInput.dataset.answer = obj[`answer_${i}`];
      radioInput.onchange = (e)=>{
        choosenAnswer = radioInput.dataset.answer;
      }

      //  create answer label element .....
      let label = document.createElement('label');
      label.htmlFor = `answer-${i}`;
      label.textContent = obj[`answer_${i}`];

      answer.append(radioInput,label);
      answers.appendChild(answer);
    }
    question.append(questionTitle,answers)
    questionSec.appendChild(question)
    
  }
  
}

// Add Num Of Question + Add Category To elments + Create Bulets 
function createBulets(obj,count){
  if(currentQuestion < count){
    // Add Category To elments
    categoryShow.innerHTML = obj.category;
    // Set Num Of Question
    questionNumShow.innerHTML = count;
    // Create Bulets
    for(let i=0 ; i<count ; i++){
      let bulet = document.createElement('span');
      // Add Active Class To bulet In current Question
      if(i == currentQuestion){
        bulet.classList.add('active');
      }
      bulets.appendChild(bulet);
    }
  }
}

function handleBulets(count) {
  if(currentQuestion < count){
    for (let i = 0; i <= currentQuestion; i++) {
      bulets.children[i].classList.add('active');
    }
  }
}
// Add CountDown To Element ......
function addcountDown(duration,count) {
  if (currentQuestion < count) {
    duration = duration * count * 60;
    let minutes, seconds;
    countdownInterval = setInterval(function () {
      minutes = parseInt(duration / 60);
      seconds = parseInt(duration % 60);

      minutes = minutes < 10 ? `0${minutes}` : minutes;
      seconds = seconds < 10 ? `0${seconds}` : seconds;

      countDownShow.innerHTML = `${minutes}:${seconds}`;

      if (--duration < 0) {
        clearInterval(countdownInterval);
        currentQuestion = count - 1;
        submitBtn.click();
      }
    }, 1000);
  }
}

// 
function showResult(count){
  if(currentQuestion == count){
    questionSec.remove();
    submitBtn.remove();
    resultSec.classList.add('active');
    resultShow.innerHTML = `${rightAnswerNumber} from : ${count} question`;

    let resPrecentage = (rightAnswerNumber / count) * 100;
    let appreciates = ['very bad','bad','good','excelent','perfect'];
    if (resPrecentage <= 40) {
      appreciateShow.innerHTML = appreciates[0];
      oopsShow.innerHTML = 'oops... &#128546;';
    }else if(resPrecentage < 50){
      appreciateShow.innerHTML = appreciates[1];
      oopsShow.innerHTML = 'oops... &#128546;';
    }else if(resPrecentage <= 75){
      appreciateShow.innerHTML = appreciates[2];
    }else if(resPrecentage <= 85){
      appreciateShow.innerHTML = appreciates[3];
    }else{
      appreciateShow.innerHTML = appreciates[4];
    }
    clearInterval(countdownInterval);
  }
}