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
	var name = getCookie("name");
	document.getElementById("name").innerHTML = name;
  }
  async function getData() {
	document.getElementById("name").value = "";
  }
  function fileSubmit() {
	document.getElementById("formId").submit();
  }
  