const BASE_URL =  "https://memory-game-x3fx.onrender.com/api/v1"  //"http://127.0.0.1:8000/api/v1" for local env

const loggedInUserData = {}
function handleSignup() {
  const userData = {
    username: fullName.value,
    email: email.value,
    password: password.value
  };

  fetch(`${BASE_URL}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData)
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Signup failed');
      }
    })
    .then(data => {
      loggedInUserData = data
      console.log('Signup successful:', data);
    })
    .catch(error => {
      console.error('Signup error:', error);
    });
}

function handleLogin() {
  const credentials = {
    email: Email.value,
    password: LPassword.value
  };

  fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Login failed');
      }
    })
    .then(data => {
      console.log('Login successful:', data);
    })
    .catch(error => {
      console.error('Login error:', error);
    });
}



