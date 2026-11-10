// Exercise 1: Synchronous vs Asynchronous

// Synchronous - blocks until complete
console.log("1 - Start");
console.log("2 - Middle");
console.log("3 - End");
// Output: 1, 2, 3 (in order)

// Asynchronous - doesn't block
console.log("1 - Start");

setTimeout(() => {
    console.log("2 - This is delayed");
}, 2000);

console.log("3 - End");
// Output: 1, 3, then 2 (after 2 seconds)

// MY PREDICTION: A, C, E, B, D

console.log("A");

setTimeout(() => console.log("B"), 0);

console.log("C");

setTimeout(() => console.log("D"), 100);

console.log("E");

// Task 11.2: Callback Hell

// 1. The Callback Hell Example

function getUserData(userId, callback) {

  setTimeout(() => {

    callback({ id: userId, name: "SketchAlien" });

  }, 1000);

}

function getUserPosts(userId, callback) {

  setTimeout(() => {

    callback([

      { id: 1, title: "Post 1" },

      { id: 2, title: "Post 2" }

    ]);

  }, 1000);

}

function getPostComments(postId, callback) {

  setTimeout(() => {

    callback([

      { id: 1, text: "Great post!" },

      { id: 2, text: "Thanks for sharing" }

    ]);

  }, 1000);

}

// The Nightmare (Nested Callbacks)

getUserData(1, function(user) {

  console.log("Callback Hell - User:", user);

  getUserPosts(user.id, function(posts) {

    console.log("Callback Hell - Posts:", posts);

    getPostComments(posts[0].id, function(comments) {

      console.log("Callback Hell - Comments:", comments);

    });

  });

});


// Task 11.2: Promises to the Rescue

// 2. Rewriting with Promises

// We will do the exact same logic, but using Promises!

const myPromise = new Promise((resolve, reject) => {

  const success = true;

  setTimeout(() => {

    if (success) {

      resolve("It worked!");

    } else {

      reject("Something went wrong");

    }

  }, 1000);

});

myPromise

  .then(result => {

    console.log("Promise Success:", result);

  })

  .catch(error => {

    console.log("Promise Error:", error);

  });

// 3. Refactoring getUserData to return a Promise

function getUserDataPromise(userId) {

  return new Promise((resolve, reject) => {

    setTimeout(() => {

      if (userId > 0) {

        resolve({ id: userId, name: "SketchAlien" });

      } else {

        reject("Invalid user ID");

      }

    }, 1000);

  });

}

// Testing our new Promise function

getUserDataPromise(1)

  .then(user => console.log("Promise User:", user))

  .catch(err => console.error(err));

  // Task 11.3: Promise Chaining

// First, let's create the Promise versions of posts and comments

function getUserPostsPromise(userId) {

  return new Promise((resolve) => {

    setTimeout(() => {

      resolve([{ id: 1, title: "Post 1" }, { id: 2, title: "Post 2" }]);

    }, 1000);

  });

}

function getPostCommentsPromise(postId) {

  return new Promise((resolve) => {

    setTimeout(() => {

      resolve([{ id: 1, text: "Great post!" }, { id: 2, text: "Thanks!" }]);

    }, 1000);

  });

}

// 1. Chain Promises (This is much better than callback hell!)

getUserDataPromise(1)

  .then(user => {

    console.log("Chain - User:", user);

    return getUserPostsPromise(user.id); // Return the next promise

  })

  .then(posts => {

    console.log("Chain - Posts:", posts);

    return getPostCommentsPromise(posts[0].id);

  })

  .then(comments => {

    console.log("Chain - Comments:", comments);

  })

  .catch(error => {

    console.error("Chain Error:", error);

  });

// 2. Promise.all (Run multiple things at the same time)

console.log("--- Task 11.3: Promise.all ---");

const promise1 = getUserDataPromise(1);

const promise2 = getUserDataPromise(2);

const promise3 = getUserDataPromise(3);

Promise.all([promise1, promise2, promise3])

  .then(results => {

    console.log("All users fetched at once:", results);

  })

  .catch(error => {

    console.error("One failed:", error);

  });




// Task 11.4: Async/Await

// The modern way to handle promises

async function getDataWithAsync() {

  try {

    console.log("Async: Fetching user...");

    const user = await getUserDataPromise(1);

   

    console.log("Async: Fetching posts...");

    const posts = await getUserPostsPromise(user.id);

   

    console.log("Async: Fetching comments...");

    const comments = await getPostCommentsPromise(posts[0].id);

   

    console.log("Async: Finished!", comments);

  } catch (error) {

    console.error("Async Error:", error);

  }

}

// Call the async function

getDataWithAsync();