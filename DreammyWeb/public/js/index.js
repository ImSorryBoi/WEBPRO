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
    var name = getCookie("email");
    var nameElement = document.getElementById("name");
	console.log(name);
        nameElement.innerText = name;

    // โค้ดอื่น ๆ ที่คุณต้องการใน pageLoad
    toggleElement();
    document.getElementById("fileField").onchange = fileSubmit;
}

	document.addEventListener("DOMContentLoaded", function() {
    pageLoad();
});
  
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