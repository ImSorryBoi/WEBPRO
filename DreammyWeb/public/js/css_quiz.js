window.onload = pageLoad;
const cssquizdata = [
    {
        "question": "ภาษาCSSใช้เพื่ออะไร?",
        "a":"ทำโครงสร้างของเว็บไซต์",
        "b":"ติดต่อกับserver",
        "c":"ตกแต่งเว็บไซต์",
        "d":"จัดเก็บข้อมูลuser",
        "correct":"c",
    },
    {
        "question": "VMและVHใช้ทำอะไรในภาษาCSS?",
        "a":"ประมาณขนาดตัวอักษร",
        "b":"ปรับขนาดตัวอักษารตามแกน X",
        "c":"ปรับระยะห่างของ element นั้นๆ ตามความกว้างและสูงให้ตรงกับวิวพอร์ต",
        "d":"ใช้เปลี่ยนขนาดตัวอักษรตามแกน Z",
        "correct":"c",
    },
    {
        "question": "CSS ในคุณสมบัติทำอะไรได้บ้างเมื่อเราใช้ @media",
        "a":"กำหนดรูปแบบและสีข้อความ",
        "b":"ปรับขนาดและสไตล์ตามขนาดหน้าจอ",
        "c":"จัดวางและจัดหน้า HTML",
        "d":"ใช้กับภาษา JavaScript",
        "correct":"b",
    },
    {
        "question": "เลือกตัวเลือกที่ถูกต้องสำหรับการเลือกทุกองค์ประกอบ <div> ที่มีคลาส container ใน CSS",
        "a":"div-container",
        "b":"div.container",
        "c":"#container div",
        "d":".container",
        "correct":"b",
    },
    {
        "question": "ถ้าต้องการปรับขนาดข้อความใน HTML ทั้งหน้าเว็บให้มีขนาดเท่ากับ 20 พิกเซล โดยใช้ CSS, คำสั่งที่ถูกต้องคืออะไร",
        "a":"font: 20px",
        "b":"text-size: 20px",
        "c":"font-size: 20px",
        "d":"size: 20px",
        "correct":"c",
    }
];

const quiz = document.getElementById('cssquiz');
const answerEls = document.querySelectorAll('.answer');


let currentQuiz = 0;
let score = 0;


function pageLoad(){
    LoadQuiz();
    document.getElementById("submit").onsubmit = submit();
}


function LoadQuiz() {

    deselectAnswers();
    
    const questionEl = document.getElementById('cssquestion');
    const a_text = document.getElementById('a_text');
    const b_text = document.getElementById('b_text');
    const c_text = document.getElementById('c_text');
    const d_text = document.getElementById('d_text');
    const currentQuizData = (cssquizdata)
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

    const quiz = document.getElementById('cssquiz');
    const submitBtn = document.getElementById('submit');

    if(submitBtn){submitBtn.addEventListener('click', () => {
        const answer = getselected()
        if(answer){
            if (answer === cssquizdata[currentQuiz].correct){
                score++;
            }
    
            currentQuiz++;
    
            if(currentQuiz < cssquizdata.length){
                LoadQuiz();
            }else{
                quiz.innerHTML = `<br><style> .css-quiz-container{
                    font-family: 'Prompt', sans-serif;
                    display: grid;
                    grid-template-columns: 20% auto 20%;
                    background-color: #fafafa;
                    padding-bottom: 5%;
                }
                
                #cssquiz{
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
                
                #cssquestion{
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
                <div class="css-quiz-container" id="cssquiz">
                <div class="quiz-header">
                <div id="cssquestion">คะเเนนที่คุณทำได้คือ ${score}/${cssquizdata.length} คะเเนน</div>
                <br>
                <button onclick="location.reload()">เริ่มใหม่</button>
                <button onclick="parent.location='css_Course.html'">ออก</button>
                `;
                updatescoredb();
            }
        }
    })}
}
async function updatescoredb() {
    var x = document.getElementById("addData");
      let response = await fetch("/CSScoursedb", {
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
