// Simulating a user database with localStorage
function getUser(email) {
  return JSON.parse(localStorage.getItem(email));
}

function createUser(email) {
  localStorage.setItem(email, JSON.stringify({ email }));
}

function setLoggedInUser(email) {
  localStorage.setItem("loggedInUser", email);
}

function getLoggedInUser() {
  return localStorage.getItem("loggedInUser");
}

function clearLoggedInUser() {
  localStorage.removeItem("loggedInUser");
}

// Send a one-time code via EmailJS
function sendOneTimeCode(email) {
  const code = Math.floor(100000 + Math.random() * 900000).toString();  // Generate 6-digit code
  localStorage.setItem("oneTimeCode", code);  // Store the code temporarily

  emailjs.send("service_r9gr1w7", "template_w0ef0uq", {
    to_name: email,
    from_name: "MongoCondo",
    message: `Your one-time login code is: ${code}`
  }, "q20xTMI3E1Pn9hm6s")
  .then(response => {
    alert("Code sent successfully!");
  })
  .catch(error => {
    alert("Failed to send code.");
    console.error("Error:", error);
  });
}

// Render the logged-out state
function renderLoggedOut() {
  document.getElementById("content").innerHTML = `
    <h1>Welcome to MongoCondo! You are currently logged out.</h1>
    <p>Enter your email below and we will send you a one-time code to type into the lower box to log in.</p>
    <input type="email" id="email" placeholder="Your email" required>
    <button onclick="handleSendCode()">Send code</button><br><br>
    <input type="text" id="code" placeholder="One-time code">
    <button onclick="handleSubmitCode()">Submit</button>
  `;
}

// Render the logged-in state for an existing user
function renderLoggedIn(email) {
  document.getElementById("content").innerHTML = `
    <h1>Welcome, ${email}, you are now logged in!</h1>
    <button onclick="handleLogout()">Log Out</button>
  `;
}

// Render the logged-in state for a new user
function renderNewUser(email) {
  document.getElementById("content").innerHTML = `
    <h1>Welcome, ${email}, you have successfully created your account!</h1>
    <button onclick="handleLogout()">Log Out</button>
  `;
}

// Handle the "Send code" button click
function handleSendCode() {
  const email = document.getElementById("email").value;
  if (email) {
    sendOneTimeCode(email);
  } else {
    alert("Please enter a valid email.");
  }
}

// Handle the "Submit" button click for the code
function handleSubmitCode() {
  const email = document.getElementById("email").value;
  const enteredCode = document.getElementById("code").value;
  const storedCode = localStorage.getItem("oneTimeCode");

  if (enteredCode === storedCode) {
    localStorage.removeItem("oneTimeCode");  // Clear the code after use
    const user = getUser(email);
    
    if (user) {
      setLoggedInUser(email);
      renderLoggedIn(email);
    } else {
      createUser(email);
      setLoggedInUser(email);
      renderNewUser(email);
    }
  } else {
    alert("Incorrect code. Please try again.");
  }
}

// Handle the "Log Out" button click
function handleLogout() {
  clearLoggedInUser();
  renderLoggedOut();
}

// Initial rendering based on login state
document.addEventListener("DOMContentLoaded", () => {
  const loggedInUser = getLoggedInUser();
  if (loggedInUser) {
    renderLoggedIn(loggedInUser);
  } else {
    renderLoggedOut();
  }
});
