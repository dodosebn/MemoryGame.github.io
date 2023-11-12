var generror = document.getElementById('generror');
var errorgen = document.getElementById('errorgen');

var today = new Date();
var hourNow = today.getHours();
var greeting;
var icon;

if (hourNow < 12){
greeting = "Welcome ";
icon = "coffee";
}
else if (hourNow < 17){
greeting = 'Welcome ';
icon = "sun-o";
}
else if (hourNow < 24){
greeting = "Welcome "
icon = "moon-o";
}
else {
greeting = "Welcome";
}



function toggleForms() {
loginContainer.style.display = loginContainer.style.display === "none" ? "block" : "none";
signupContainer.style.display = signupContainer.style.display === "none" ? "block" : "none";
}

let errorName = document.getElementById('error-Name');
let errorEmail = document.getElementById('error-email');
let errorPassword = document.getElementById('error-password');
let userError = document.getElementById('error-username');
let errorcpassword = document.getElementById('error-cpassword');
let displayLoginError = document.getElementById('displayLoginError');

function validateFullName() {
var fullName = document.getElementById('fullName');
if (fullName.value === "") {
errorName.innerHTML = "Name is required";
return false;
}
const fullNameRegex = /^[a-zA-Z\s]+$/;
if (!fullNameRegex.test(fullName.value)) {
errorName.innerHTML = "Full name contains invalid characters";
return false;
} else {
errorName.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
}

return true;
}

function validateUserName() {
var userName = document.getElementById('userName');
if (userName.value === "") {
userError.innerHTML = "Username is required";
return false;
} else {
userError.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
}

return true;
}

function validateEmail() {
var email = document.getElementById('email');
if (email.value === "") {
errorEmail.innerHTML = "Email is required";
return false;
}
const emailRegex = /^[^\s@]+@[^\s@]+.[^\s@]+$/;
if (!emailRegex.test(email.value)) {
errorEmail.innerHTML = "Please enter a valid email address.";
return false;
} else {
errorEmail.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
}

return true;
}

function validatePassword() {
var password = document.getElementById('password');
if (password.value === "") {
errorPassword.innerHTML = "Password is required";
return false;
}

if (password.value.length < 6) {
errorPassword.innerHTML = "Password is too short";
return false;
} else {
errorPassword.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
}

return true;
}

function validateCpassword() {
var cPassword = document.getElementById('cPassword');
if (cPassword.value === "") {
errorcpassword.innerHTML = "Re-enter Password";
return false;
}

var password = document.getElementById('password');
if (password.value !== cPassword.value) {
errorcpassword.innerHTML = "Passwords don't match";
return false;
} else {
errorcpassword.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
}

return true;
}
const Logemail = document.getElementById("Logemail");
    const LogPassword = document.getElementById("LogPassword");
const fullName = document.getElementById("fullName");
const userName = document.getElementById("userName");
const email = document.getElementById("email");
const password = document.getElementById("password");
const signupForm = document.getElementById('signupForm');
const loginForm = document.getElementById('loginForm');

let user = JSON.parse(localStorage.getItem("form"))  || []

document.getElementById("signupForm").addEventListener("submit", function(e) {
e.preventDefault();

const isFullNameValid = validateFullName();
const isUserNameValid = validateUserName();
const isEmailValid = validateEmail();
const isPasswordValid = validatePassword();
const isCpasswordValid = validateCpassword();

// If any input is invalid, prevent form submission
if (
!isFullNameValid ||
!isUserNameValid ||
!isEmailValid ||
!isPasswordValid ||
!isCpasswordValid
) {
return false;
}
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const userName = document.getElementById('userName').value;

  const storedUser = localStorage.getItem('user');

  // // Check if email is already registered
  // if (storedUser) {
  //   const existingUser = JSON.parse(storedUser);
  //   if (email === existingUser.email) {
  //     alert('This email is already registered. Please use a different email.');
  //     return;
  //   }
  // }
  // Creae new user object
  const newUser = {
    userName: userName,
    email: email,
    password: password
  };

  // Store user data in local storage
  localStorage.setItem('user', JSON.stringify(newUser));
  
 
  loginPage();
  return true;
});

loginForm.addEventListener('submit', function(e) {
  e.preventDefault();

  // Retrieve form values
  const loginEmail = document.getElementById('Logemail').value;
  const loginPassword = document.getElementById('LogPassword').value;

  // Retrieve user data from local storage
  const storedUser = localStorage.getItem('user');
  if (!storedUser) {
    errorgen.textContent = 'Invalid email or password. Please try again.';
    return;
  }

  // Parse user data from JSON string
  const user = JSON.parse(storedUser);
  if (loginEmail === user.email && loginPassword === user.password) {
    displayGame();
    document.getElementById("col-1").innerHTML = "<h3>" + greeting + " </h1>" + "<h3>" + user.userName + "</h1>" ;
    document.getElementById("icon").innerHTML = ('<i class="fa fa-' + icon + '" aria-hidden="true"></i>');

    loginContainer.style.display = "none";
  } else {
    errorgen.textContent = 'Invalid email or password. Please try again';
  }
});

 
function displayGame() {
var gameContainer = document.getElementById('container');
var signupContainer = document.getElementById('signupContainer');

gameContainer.style.display = "block";
signupContainer.style.display = "none";
}
function loginPage(){
    var loginContainer = document.getElementById('loginContainer');
    loginContainer.style.display = "block";
    signupContainer.style.display = "none";
  }
  

const emojis = ["🐱‍🚀", "🐱‍🚀", "🎂", "🎂", "💖", "💖", "🎶", "🎶"];
const shuffledEmojis = emojis.sort(() => (Math.random() > 0.5 ? 1 : -1));
let clickCount = 0;

for (let i = 0; i < shuffledEmojis.length; i++) {
  const box = document.createElement("div");
  box.className = "item";
  box.textContent = shuffledEmojis[i];

  box.onclick = function () {
    if (this.classList.contains("boxOpen") || this.classList.contains("boxMatch")) {
      return; // Ignore clicks on already opened or matched items
    }

    this.classList.add("boxOpen");
    clickCount++;

    const openedItems = document.querySelectorAll(".boxOpen");
    if (openedItems.length === 2) {
      const firstItem = openedItems[0];
      const secondItem = openedItems[1];

      if (firstItem.textContent === secondItem.textContent) {
        firstItem.classList.add("boxMatch");
        firstItem.classList.remove("boxOpen");
        secondItem.classList.add("boxMatch");
        secondItem.classList.remove("boxOpen");

        const matchedItems = document.querySelectorAll(".boxMatch");
        if (matchedItems.length === emojis.length) {
          score.style.display = "flex";
          document.getElementById("congratulations").textContent = "Congratulations! You win!";
          document.getElementById("clickCount").textContent = "Number of Clicks: " + clickCount;
        }
      } else {
        setTimeout(function () {
          openedItems.forEach(function (item) {
            item.classList.remove("boxOpen");
          });
        }, 1000);
      }
    }
    document.getElementById("score").textContent = clickCount;
 };

document.querySelector(".game").appendChild(box);
}

