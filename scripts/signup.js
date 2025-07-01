document.getElementById('signup-form').addEventListener('submit', async function(event) {
  event.preventDefault();

  const email = document.getElementById('signup-email').value;
  const password = document.getElementById('signup-password').value;
  const confirm = document.getElementById('confirm-password').value;

  if (password !== confirm) {
    alert("Passwords do not match!");
    return;
  }

  try {
    await axios.post('https://tunga-diary-api.onrender.com/fullstack/auth/register', {
      email,
      password
    });

    alert("Account created! Please log in.");
    window.location.href = "index.html";
  } catch (error) {
    alert("Signup failed: " + (error.response?.data?.message || 'Try again later'));
  }
});
