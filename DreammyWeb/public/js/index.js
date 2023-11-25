function checkCookie() {
	var username = "";
	if (getCookie("username") == false) {
	  document.cookie = "name=Guest";
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
  
  async function pageLoad() {
	if (getCookie("name") == "Guest") {
	  document.getElementById("name").innerText = 'Guest';
	}
  
	toggleElement();
	document.getElementById("displayPic").onclick = fileUpload;
	document.getElementById("fileField").onchange = fileSubmit;
  
	var username = getCookie("name");
  
	document.getElementById("name").innerHTML = name;
	showImg("img/" + getCookie("img"));
  }
  
  function toggleElement() {
	var loginAndRegisterButton = document.getElementById("RegisterAndLoginButton");
	var logoutButton = document.getElementById("LogoutButton");
	if (getCookie("name") != "Guest") {
	  loginAndRegisterButton.style.display = "none";
	  logoutButton.style.display = "block";
	}
	else {
	  loginAndRegisterButton.style.display = "block";
	  logoutButton.style.display = "none";
	}
  }