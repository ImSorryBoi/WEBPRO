window.onload = pageLoad;

function pageLoad() {
 
    var pass = document.getElementById('regispass').value;
    var confirm_pass = document.getElementById('regisconfirm_pass').value;
    if (pass != confirm_pass) {
        document.getElementById('errordisplay').innerHTML = 'Please use same password';
        document.getElementById('click').disabled = true;
    } else {
        document.getElementById('errordisplay').innerHTML = 'Password Matched';
        document.getElementById('click').disabled = false;
    }
}

function wrong_pass_alert() {
    if (document.getElementById('regispass').value != "" &&
        document.getElementById('regisconfirm_pass').value != "") {
        alert("Your response is submitted");
    } else {
        alert("Please fill all the fields");
    }
}