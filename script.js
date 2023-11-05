let isSignedUp = false;

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
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
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

function trickyVal() {
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

  return true;
}

let signupButton = document.getElementById('signUp');
signupButton.addEventListener("click", (event) => {
  event.preventDefault();
  if (trickyVal()) {
    displayGame();
  }
});

function displayGame() {
  var gameContainer = document.getElementById('container');
  var signupContainer = document.getElementById('signupContainer');
  
  gameContainer.style.display = "block";
  signupContainer.style.display = "none";
}

function validateLoginForm() {
  const usernameInput = document.getElementById('Lusername');
  const passwordInput = document.getElementById('LPassword');
  const errorMessage = document.getElementById('error.message');

  errorMessage.style.display = 'none';
  errorMessage.innerHTML = '';

  if (usernameInput.value.trim() === '') {
    errorMessage.style.display = 'block';
    errorMessage.innerHTML = 'Username field is required.';
    return false;
  }
  if (passwordInput.value === '') {
    errorMessage.style.display = 'block';
    errorMessage.innerHTML = 'Password field is required.';
    return false;
  }

  return true;
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

const errorMessage = document.getElementById('error.message');

const BASE_URL = "https://memory-game-x3fx.onrender.com/api/v1"; 

const loggedInUserData = {};

function handleSignup() {
  const isFormValid = trickyVal();
  
  if (!isFormValid) {
    errorMessage.innerHTML = "Form validation failed.";
    return false;
  }
    const userData = {
      username: fullName.value,
      email: email.value,
      password: password.value,
    };
  
    fetch(`${BASE_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Signup failed');
        }
      })
      .then(data => {
        loggedInUserData.token = data.token;
        return fetchUserData();
      })
      .then(userData => {
        loggedInUserData.userData = userData;
        displayGamePage();
      })
      .catch(error => {
        errorMessage.innerHTML = "you Already have an account";
      });
    

  isSignedUp = true;
    signupButton.disabled = true;

    return true;
  
}

function handleLogin() {

  if (isSignedUp = true) {
    const credentials = {
      username: fullName.value,
      password: LPassword.value,
    };
  
    fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    })
      .then(response => {
        if (response.ok) {
          
          return response.json();
        } else {
          throw new Error('Login failed');
        }
      })
      .then(data => {
        loggedInUserData.token = data.token;
      
        return fetchUserData();
      })
      .then(userData => {
        loggedInUserData.userData = userData;
        displayGamePage();
      })
      .catch(error => {
        errorMessage.innerHTML = "Signup before you logIN in";
      });
  
    }
  //  else {
  //   document.getElementById('error.message').innerHTML = "You have to sign up first.";
  // }

  if (!validateLoginForm()) {
    errorMessage.innerHTML = isFormValid = false;
    return;
  }
  return true;
  
}

async function fetchUserData() {
  const response = await fetch(`${BASE_URL}/userdata`, {
    headers: {
      'Authorization': `Bearer ${loggedInUserData.token}`,
    },
  });
  if (response.ok) {
    return response.json();
  } else {
    throw new Error('Failed to fetch user data');
  }
}

function displayGamePage() {
  var welcomeMessage = document.getElementById('welcomeMessage');
  welcomeMessage.innerHTML = `Welcome back,  const {usernameInput.value}, to the memory game!`;
  var gameContainer = document.getElementById('container');
  var loginContainer = document.getElementById('loginContainer');
  
  gameContainer.style.display = "block";
  loginContainer.style.display = "none";
}
let loginButton = document.getElementById('login');
loginButton.addEventListener("click", (event) => {
event.preventDefault();
if(validateLoginForm()){
  displayGamePage();
  console.log(welcomeMessage);
}
});




