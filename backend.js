        window.onload = function() {
          const ui = SwaggerUIBundle({
              url: "https://memory-game-x3fx.onrender.com/docs/swagger.json",
              dom_id: '#swagger-ui',
              presets: [
                  SwaggerUIBundle.presets.apis,
                  SwaggerUIStandalonePreset
              ],
              layout: "BaseLayout"
          });
      };
      
function handleSignup() {
  const userData = {
    name: fullName.value,
    email: email.value,
    password: password.value
  };

  fetch('https://memory-game-x3fx.onrender.com/docs#/Users/create_user_api_v1_users_post', {
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
      console.log('Signup successful:', data);
    })
    .catch(error => {
      console.error('Signup error:', error);
    });
}

function handleLogin() {
  const credentials = {
    email: Email.value,
    password: Password.value
  };

  fetch('https://memory-game-x3fx.onrender.com/docs#/Users/login_api_v1_login_post', {
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

signupForm.addEventListener('submit', event => {
  event.preventDefault();
  if (validateInputs()) {
    handleSignup();
  }
});

loginForm.addEventListener('submit', event => {
  event.preventDefault();
  handleLogin();
});

