window.onload = pageLoad;
const htmlquizdata = [
    {
        "question": "ใน HTML การลิงก์ไปยังหน้าเว็บอื่นทำได้โดยใช้แท็ก?",
        "a":"<link>",
        "b":"<a>",
        "c":"<url>",
        "d":"<connect>",
        "correct":"a",
    },
    {
        "question": "HTML แท็กที่ใช้สำหรับการสร้างตารางคือ?",
        "a":"<table>",
        "b":"<grid>",
        "c":"<tabular>",
        "d":"<data>",
        "correct":"a",
    },
    {
        "question": "ธีม (Theme) หรือรูปแบบการจัดหน้าเว็บสามารถกำหนดได้ด้วย?",
        "a":"Stylesheets",
        "b":"Themes Tags",
        "c":"Layout Attributes",
        "d":"Page Styles",
        "correct":"a",
    },
    {
        "question": "แท็กที่ใช้สำหรับการกำหนดลิ้งค์ไปยังไฟล์ภาพคือ?",
        "a":"<image>",
        "b":"<img>",
        "c":"<picture>",
        "d":"<graphic>",
        "correct":"b",
    },
    {
        "question": "การสร้างกล่องที่มีการเลื่อนแนวนอนและแนวตั้งสามารถทำได้โดยใช้แท็ก?",
        "a":"<scrollbox>",
        "b":"<div scroll=both>",
        "c":"<marquee>",
        "d":"<scroll>",
        "correct":"c",
    }
];

const quiz = document.getElementById('htmlquiz');
const answerEls = document.querySelectorAll('.answer');


let currentQuiz = 0;
let score = 0;


function pageLoad(){
    LoadQuiz();
    document.getElementById("submit").onsubmit = submit();
}


function LoadQuiz() {

    deselectAnswers();
    
    const questionEl = document.getElementById('htmlquestion');
    const a_text = document.getElementById('a_text');
    const b_text = document.getElementById('b_text');
    const c_text = document.getElementById('c_text');
    const d_text = document.getElementById('d_text');
    const currentQuizData = (htmlquizdata)
    questionEl.innerText = currentQuizData[currentQuiz].question;
    a_text.innerText = currentQuizData[currentQuiz].a;
    b_text.innerText = currentQuizData[currentQuiz].b;
    c_text.innerText = currentQuizData[currentQuiz].c;
    d_text.innerText = currentQuizData[currentQuiz].d;

    var htmlquizscore = document.getElementById("HTMLResult");
    htmlquizscore.style.display = "none";
}

function deselectAnswers(){
    answerEls.forEach(answerEl => answerEl.checked = false);
}

function getselected(){
    let answerEls = document.querySelectorAll('.answer');

    let answer;

    answerEls.forEach(answerEl =>{
        if(answerEl.checked){
            answer = answerEl.id;
        }
    })
    return answer;
}

function submit(){

    var html_quiz_container = document.getElementById("htmlquiz");
    var htmlquizscore = document.getElementById("HTMLResult");
    const quiz = document.getElementById('htmlquiz');
    const submitBtn = document.getElementById('submit');

    if(submitBtn){submitBtn.addEventListener('click', () => {
        const answer = getselected()
        if(answer){
            if (answer === htmlquizdata[currentQuiz].correct){
                score++;
            }
    
            currentQuiz++;
    
            if(currentQuiz < htmlquizdata.length){
                LoadQuiz();
            }else{
                html_quiz_container.style.display = "none";
                htmlquizscore.style.display = "block";
                var X = document.getElementById("htmlquizscore");
                X.innerText = " คุณได้คะแนน "+ score +" จาก "+ htmlquizdata.length+" ข้อ";
                updatescoredb();

            }
        }
    })}
}
async function updatescoredb() {
    var x = document.getElementById("addData");
      let response = await fetch("/HTMLcoursedb", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: getCookie("name"),
          email: getCookie("email"),
          score: score,
        }),
      });
      let content = await response.json();
    }
function getCookie(name) {
	var value = "";
	try {
	  value = document.cookie
		.split("; ")
		.find((row) => row.startsWith(name))
		.split("=")[1];
	  return value;
	} catch (err) {
	  return false;
	}
}
