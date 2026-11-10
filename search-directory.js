// Task 12.4: Search & Filter

const loading = document.getElementById("loading");

const errorDiv = document.getElementById("error");

const container = document.getElementById("users-container");

const searchInput = document.getElementById("search");

let allUsers = []; // Store the users globally so we can filter them

async function init() {

  try {

    loading.classList.remove("hidden");

    const response = await fetch("https://jsonplaceholder.typicode.com/users");

    if (!response.ok) throw new Error("Failed to fetch users");

   

    allUsers = await response.json();

    displayUsers(allUsers);

  } catch (error) {

    errorDiv.textContent = `Error: ${error.message}`;

    errorDiv.classList.remove("hidden");

  } finally {

    loading.classList.add("hidden");

  }

  // Set up search

  searchInput.addEventListener("input", (e) => {

    const query = e.target.value.toLowerCase();

    const filtered = allUsers.filter(user =>

      user.name.toLowerCase().includes(query) ||

      user.email.toLowerCase().includes(query)

    );

    displayUsers(filtered);

  });

}

function displayUsers(users) {

  if (users.length === 0) {

    container.innerHTML = "<p>No users found.</p>";

    return;

  }

  container.innerHTML = users.map(user => `

    <div class="user-card">

      <h2>${user.name}</h2>

      <p>📧 ${user.email}</p>

      <p>🏢 ${user.company.name}</p>

      <p>📍 ${user.address.city}</p>

    </div>

  `).join("");

}

init();