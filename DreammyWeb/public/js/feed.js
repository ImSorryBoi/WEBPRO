// check ว่ามีการ set cookies หรือยังถ้ามีจะไปยัง feed.html แต่ถ้าไม่มีจะกลับไปที่ login.html
function checkCookie() {
	var name = "";
	if (getCookie("name") == false) {
	  window.location = "login.html";
	}
  }
  
  checkCookie();
  window.onload = pageLoad;
  
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
  
  function pageLoad() {
	document.getElementById("postbutton").onclick = getData;
  
	document.getElementById("displayPic").onclick = fileUpload;
	document.getElementById("fileField").onchange = fileSubmit;
  
	var name = getCookie("name");
  
	document.getElementById("name").innerHTML = name;
  }
  async function getData() {
	document.getElementById("name").value = "";
  }
  function fileSubmit() {
	document.getElementById("formId").submit();
  }
  