const loginContainer = document.querySelector("#loginContainer");
const loginForm = document.querySelector("#loginForm");
const userName = document.querySelector("#userName");
const email = document.querySelector("#email");
const loginPassword = document.querySelector("#loginPassword");
const login = document.querySelector("#login");
const signupContainer = document.querySelector("#signupContainer");
const signupForm = document.querySelector("#signupForm");
const fullName = document.querySelector("#fullName");
const password = document.querySelector("#password");
const cPassword = document.querySelector("#cPassword");
const signUp = document.querySelector("#signUp");
const Email = document.querySelector("#Email");
const LPassword = document.querySelector("#LPassword");
const gameContainer = document.querySelector(".container");

function toggleForms() {
  loginContainer.style.display = loginContainer.style.display === "none" ? "block" : "none";
  signupContainer.style.display = signupContainer.style.display === "none" ? "block" : "none";
}

function DisplayGame() {
  // // const isValid = validateInputs();
  // if (isValid) {
    gameContainer.style.display = loginContainer.style.display === "block" ? "none" : "block";
    signupContainer.style.display = signupContainer.style.display === "none" ? "block" : "none";
  // }
}
function bernouli() {
  gameContainer.style.display = "block";
  loginContainer .style.display ="none";
}
function miniVal(){
  if (Email.value === "") {
    alert("Error: Please enter your email address.");
    return false;
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(Email.value)) {
    alert("Error: Please enter a valid email address.");
    return false;
  }
  
  if (LPassword.value === "") {
    alert("Error: Password is empty");
    return false;
  }
}
function validateInputs(){
  if (fullName.value === "" && email.value === "" && password.value === "" && cPassword.value === "") {
    alert("Error: Please fill out the form");
    return false;
  }   

  if (fullName.value === "") {
    alert("Error: Full name is empty");
    return false;
  }
  
  const re = /^[\w ]+$/;
  if (!re.test(fullName.value)) {
    alert("Error: Full name contains invalid characters!");
    return false;
  }
  
  if (email.value === "") {
    alert("Error: Please enter your email address.");
    return false;
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.value)) {
    alert("Error: Please enter a valid email address.");
    return false;
  }
  
  if (password.value === "") {
    alert("Error: Password is empty");
    return false;
  }
  
  if (password.value.length < 6) {
    alert("Error: Password must be at least 8 characters long");
    return false;
  }

  if (cPassword.value === "") {
    alert("Error: Confirm password is empty");
    return false;
  }

  if (password.value !== cPassword.value) {
    alert("Error: Passwords do not match");
    return false;
  }
}


signUp.addEventListener("click", (event) => {
  event.preventDefault();
  if(validateInputs()){
    handleSignup();
    DisplayGame();
  }
});


login.addEventListener("click", (event) => {
  event.preventDefault();
  handleLogin();
  bernouli() ;
});

const emojis = ["🐱‍🚀", "🐱‍🚀", "🎂", "🎂", "💖", "💖", "🎶", "🎶"];
var shuf_emojis = emojis.sort(() => (Math.random() > 0.5 ? 1 : -1));
var clickCount = 0;

for (var i = 0; i
  
  < shuf_emojis.length; i++) {
  let box = document.createElement("div");
  box.className = "item";
  box.innerHTML = shuf_emojis[i];

  box.onclick = function () {
    if (
      this.classList.contains("boxOpen") ||
      this.classList.contains("boxMatch")
    ) {
      return; // Ignore clicks on already opened or matched items
    }

    this.classList.add("boxOpen");
    clickCount++;

    var openedItems = document.querySelectorAll(".boxOpen");
    if (openedItems.length === 2) {
      var firstItem = openedItems[0];
      var secondItem = openedItems[1];

      if (firstItem.innerHTML === secondItem.innerHTML) {
        firstItem.classList.add("boxMatch");
        firstItem.classList.remove("boxOpen");
        secondItem.classList.add("boxMatch");
        secondItem.classList.remove("boxOpen");

        var matchedItems = document.querySelectorAll(".boxMatch");
        if (matchedItems.length === emojis.length) {
          score.style.display = "flex";
          document.getElementById("congratulations").textContent =
            "Congratulations! You win!";
          document.getElementById("clickCount").textContent =
            "Number of Clicks: " + clickCount;
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