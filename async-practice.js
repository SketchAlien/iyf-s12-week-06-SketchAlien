// ============================================

// LESSON 11 — CLASSWORK EXERCISE

// Callbacks  ->  Promises + chaining  ->  Async/await

// Week 6 · Run with:  node lesson-11-exercise.js

//

// ONE scenario, THREE styles. You are GIVEN working callback code (Part A).

// Your job: rewrite the SAME flow with Promises (Part B), then async/await (Part C).

// Answer key: lesson-11-solution.js  (try first, peek last).

// ============================================


// ============================================

// PART A — GIVEN (runs as-is). Read it, run it, notice the nesting = "callback hell".

// Three async steps: get a user, then their orders, then the total spend.

// ============================================

const nameFor = (id) => ({ 1: "Amina", 2: "Brian" }[id] || "Unknown");

function getUserCb(userId, cb) {

  setTimeout(() => {

    if (!userId) return cb(new Error("Missing userId"));

    cb(null, { id: userId, name: nameFor(userId) });

  }, 400);

}

function getOrdersCb(user, cb) {

  setTimeout(() => {

    cb(null, [

      { id: 101, amount: 20 },

      { id: 102, amount: 35 },

    ]);

  }, 400);

}

function getOrderTotalCb(orders, cb) {

  setTimeout(() => {

    const total = orders.reduce((sum, o) => sum + o.amount, 0);

    cb(null, total);

  }, 400);

}

// Caller — callback version

getUserCb(1, (err, user) => {

  if (err) return console.error("A error:", err.message);

  getOrdersCb(user, (err, orders) => {

    if (err) return console.error("A error:", err.message);

    getOrderTotalCb(orders, (err, total) => {

      if (err) return console.error("A error:", err.message);

      console.log(`A: ${user.name} spent ${total}`);

    });

  });

});


// ============================================

// PART B — Promises

// ============================================

// B1: rewrite each function to RETURN a Promise

function getUser(userId) {

  return new Promise((resolve, reject) => {

    setTimeout(() => {

      if (!userId) return reject(new Error("Missing userId"));

      resolve({ id: userId, name: nameFor(userId) });

    }, 400);

  });

}

function getOrders(user) {

  return new Promise((resolve, reject) => {

    setTimeout(() => {

      resolve([

        { id: 101, amount: 20 },

        { id: 102, amount: 35 },

      ]);

    }, 400);

  });

}

function getOrderTotal(orders) {

  return new Promise((resolve, reject) => {

    setTimeout(() => {

      const total = orders.reduce((sum, o) => sum + o.amount, 0);

      resolve(total);

    }, 400);

  });

}

// B2: chain the three with .then()

getUser(1)

  .then((user) => {

    // Return the next promise, passing the user along

    return getOrders(user).then((orders) => ({ user, orders }));

  })

  .then(({ user, orders }) => {

    // Return the next promise, passing the user and total along

    return getOrderTotal(orders).then((total) => ({ user, total }));

  })

  .then(({ user, total }) => {

    console.log(`B: ${user.name} spent ${total}`);

  })

  .catch((err) => {

    console.error("B error:", err.message);

  });


// ============================================

// PART C — Async / Await

// ============================================

// C1: write async function checkout(userId)

async function checkout(userId) {

  try {

    const user = await getUser(userId);

    const orders = await getOrders(user);

    const total = await getOrderTotal(orders);

   

    console.log(`C: ${user.name} spent ${total}`);

  } catch (err) {

    console.error("C error:", err.message);

  }

}

// C2: call checkout(1)

checkout(1);


// ============================================

// BONUS — Promise.all (Parallel lookups)

// ============================================

async function getBothUsers() {

  try {

    const [user1, user2] = await Promise.all([getUser(1), getUser(2)]);

    console.log(`Bonus: Users are ${user1.name} and ${user2.name}`);

  } catch (err) {

    console.error("Bonus error:", err.message);

  }

}

getBothUsers();