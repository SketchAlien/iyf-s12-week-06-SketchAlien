// Task 12.3: POST Requests

async function createPost(title, body, userId) {

  const response = await fetch("https://jsonplaceholder.typicode.com/posts", {

    method: "POST",

    headers: {

      "Content-Type": "application/json"

    },

    body: JSON.stringify({

      title,

      body,

      userId

    })

  });

  if (!response.ok) {

    throw new Error("Failed to create post");

  }

  return response.json();

}

// Demo it

async function demo() {

  try {

    console.log("Sending POST request...");

    const newPost = await createPost(

      "My First Post",

      "This is the content of my post.",

      1

    );

    console.log("Created:", newPost);

  } catch (error) {

    console.error(error.message);

  }

}

demo();