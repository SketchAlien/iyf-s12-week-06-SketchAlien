// Task 12.1: Fetch API

// Exercise 1: Basic Fetch (using .then)

fetch("https://jsonplaceholder.typicode.com/users/1")

  .then(response => {

    console.log("Response object:", response);

    console.log("Status:", response.status);

    console.log("OK:", response.ok);

    return response.json(); // Parse JSON

  })

  .then(data => {

    console.log("User data:", data);

  })

  .catch(error => {

    console.error("Fetch error:", error);

  });

// Exercise 2: Fetch with Async/Await

async function getUser(id) {

  try {

    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);

   

    if (!response.ok) {

      throw new Error(`HTTP error! status: ${response.status}`);

    }

   

    const data = await response.json();

    return data;

  } catch (error) {

    console.error("Failed to fetch user:", error);

  }

}

// Practice: Fetch and display

async function main() {

  console.log("Fetching user...");

  const user = await getUser(1);

  console.log("User fetched via Async:", user);

}

main();