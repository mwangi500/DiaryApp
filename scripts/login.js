document.getElementById('login-form').addEventListener('submit', async function(event) {
  event.preventDefault();
  console.log('Login form submitted');

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    const response = await axios.post('https://tunga-diary-api.onrender.com/api/fullstack/auth/login', {
      email,
      password
    });

    console.log('Login response:', response);

    const token = response.data.token;
    if (!token) throw new Error('No token received');

    localStorage.setItem('token', token);

    alert('Login successful! Redirecting...');
    window.location.href = 'dashboard.html';
  } catch (error) {
    console.error('Login error:', error);
    alert('Login failed: ' + (error.response?.data?.message || 'Check your credentials'));
  }
});

// Prefill credentials on page load
window.onload = () => {
  document.getElementById('email').value = 'kevinmwangi500@gmail.com';
  document.getElementById('password').value = 'tunga123';
};
