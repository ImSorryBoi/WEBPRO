window.onload = pageLoad;
const jsquizdata = [
    {
        "question": "การใช้งาน try, catch, และ finally เป็นส่วนหนึ่งของอะไร ",
        "a":"Loop",
        "b":"Conditional statements",
        "c":"Error handling",
        "d":"Function declaration",
        "correct":"c",
    },
    {
        "question": "ใช้ Promise เพื่อจัดการกับการทำงานแบบ asynchronous ทำหน้าที่อย่างไร ",
        "a":"รับค่าทุกๆ 1 วินาที",
        "b":"รอให้งานเสร็จสิ้นแล้วทำงานต่อ",
        "c":"ทำงานพร้อมกันกับโปรแกรมหลัก",
        "d":"จัดการกับการทำงานที่ใช้เวลานาน",
        "correct":"b",
    },
    {
        "question": "ฟังก์ชัน arrow function ต่างจากฟังก์ชันปกติอย่างไร",
        "a":"Arrow function ไม่สามารถรับพารามิเตอร์ได้",
        "b":"Arrow function ไม่มีคำสั่ง return",
        "c":"Arrow function ไม่มีคำว่า function ในการประกาศ",
        "d":"Arrow function ไม่มีตัวแปรภายใน",
        "correct":"c",
    },
    {
        "question": "คำสั่ง Object.keys(myObject) จะได้ผลลัพธ์อย่างไร",
        "a":"รายการคำสั่งทั้งหมดใน Object",
        "b":"ชื่อของ method ทั้งหมดใน Object",
        "c":"ค่าทั้งหมดใน Object",
        "d":"ชื่อ property ทั้งหมดใน Object",
        "correct":"d",
    },
    {
        "question": "ฟังก์ชันที่ถูกประกาศภายในฟังก์ชันอีกตัวเรียกว่า",
        "a":"Nested function",
        "b":"Anonymous function",
        "c":"Callback function",
        "d":"Arrow function",
        "correct":"a",
    }
];

const quiz = document.getElementById('jsquiz');
const answerEls = document.querySelectorAll('.answer');


let currentQuiz = 0;
let score = 0;


function pageLoad(){
    LoadQuiz();
    document.getElementById("submit").onsubmit = submit();
}


function LoadQuiz() {

    deselectAnswers();
    
    const questionEl = document.getElementById('jsquestion');
    const a_text = document.getElementById('a_text');
    const b_text = document.getElementById('b_text');
    const c_text = document.getElementById('c_text');
    const d_text = document.getElementById('d_text');
    const currentQuizData = (jsquizdata)
    questionEl.innerText = currentQuizData[currentQuiz].question;
    a_text.innerText = currentQuizData[currentQuiz].a;
    b_text.innerText = currentQuizData[currentQuiz].b;
    c_text.innerText = currentQuizData[currentQuiz].c;
    d_text.innerText = currentQuizData[currentQuiz].d;
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

    const quiz = document.getElementById('jsquiz');
    const submitBtn = document.getElementById('submit');

    if(submitBtn){submitBtn.addEventListener('click', () => {
        const answer = getselected()
        if(answer){
            if (answer === jsquizdata[currentQuiz].correct){
                score++;
            }
    
            currentQuiz++;
    
            if(currentQuiz < jsquizdata.length){
                LoadQuiz();
            }else{
                quiz.innerHTML = `<br><style> .js-quiz-container{
                    font-family: 'Prompt', sans-serif;
                    display: grid;
                    grid-template-columns: 20% auto 20%;
                    background-color: #fafafa;
                    padding-bottom: 5%;
                }
                
                #jsquiz{
                    grid-column: 2 /span 1;
                }
                
                .quiz-header{
                    grid-column: 2 /span 1;
                }
                
                .quiz-header>button{
                    color: white;
                    background-color: #678EC4;
                    padding: 8px 16px;
                    border-radius: 5px;
                    cursor: pointer;
                    margin-left: 5%;
                }
                
                #jsquestion{
                    font-size: 20pt;
                    padding: 3%;
                    color: rgb(0, 0, 0);; 
                }
                
                ol{
                    color: rgb(0, 0, 0);
                    font-size: 15pt;
                    padding: 10px 14px;
                    border-radius: 5px;
                
                }
                </style>
            <div class="js-quiz-container" id="jsquiz">
            <div class="quiz-header">
            <div id="jsquestion">คะเเนนที่คุณทำได้คือ ${score}/${jsquizdata.length} คะเเนน</div>
                <br>
                <button onclick="location.reload()">เริ่มใหม่</button>
                <button onclick="parent.location='javascript_Course.html'">ออก</button>
                `;
                updatescoredb();
            }
        }
    })}
}
async function updatescoredb() {
    var x = document.getElementById("addData");
      let response = await fetch("/JScoursedb", {
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