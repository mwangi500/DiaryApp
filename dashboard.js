// Check if user is logged in on page load
window.onload = () => {
  const token = localStorage.getItem('token');
  if (!token) {
    alert('You are not logged in. Redirecting to login page.');
    window.location.href = 'index.html'; // change if your login page filename differs
    return;
  }
  loadEntries();

  // Logout button event listener
  const logoutBtn = document.getElementById('logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      localStorage.removeItem('token');  // Remove token to log out
      alert('You have been logged out.');
      window.location.href = 'index.html'; // Redirect to login page
    });
  }
};

// Fetch diary entries from API
async function fetchEntries() {
  const token = localStorage.getItem('token');
  try {
    const response = await axios.get('https://tunga-diary-api.onrender.com/api/fullstack/diary', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data; // array of entries
  } catch (error) {
    console.error('Failed to load entries:', error.response || error);
    alert('Failed to load entries. Please try again.');
  }
}

// Render entries on the page
async function loadEntries() {
  const entries = await fetchEntries();
  if (!entries) return;

  const list = document.getElementById('entry-list');
  list.innerHTML = ''; // clear existing

  entries.forEach(entry => {
    const li = document.createElement('li');
    li.textContent = `${new Date(entry.date).toLocaleDateString()} — ${entry.title}`;

    // Add delete button for demo CRUD delete
    const delBtn = document.createElement('button');
    delBtn.textContent = 'Delete';
    delBtn.style.marginLeft = '10px';
    delBtn.onclick = () => deleteEntry(entry.id);

    li.appendChild(delBtn);
    list.appendChild(li);
  });
}

// Delete an entry by ID
async function deleteEntry(id) {
  if (!confirm('Are you sure you want to delete this entry?')) return;

  const token = localStorage.getItem('token');
  try {
    await axios.delete(`https://tunga-diary-api.onrender.com/api/fullstack/diary/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    alert('Entry deleted successfully.');
    loadEntries(); // refresh list
  } catch (error) {
    console.error('Delete failed:', error.response || error);
    alert('Failed to delete entry.');
  }
}
