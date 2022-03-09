const { response } = require("express");
const express = require("express");
const app = express();
console.dir(app);

// app.use((req, res) => {
//   console.log("We got a new request!");
//   res.send("Hello, we got your request! This is the response!");
// });

app.get("/", (req, res) => {
  res.send("This is the home page!");
});

app.get("/r/:subreddit", (req, res) => {
  const { subreddit } = req.params;
  res.send(`<h1>Browsing the ${subreddit} subreddit`);
});

app.get("/r/:subreddit/:postId", (req, res) => {
  const { subreddit, postId } = req.params;
  res.send(
    `<h1>Viewing Post ID: ${postId} on the Subreddit: ${subreddit} subreddit`
  );
});

app.post("/cats", (req, res) => {
  res.send("Post request to /cats !!! This is different than a request!");
});

app.get("/cats", (req, res) => {
  res.send("Meow!");
});

app.get("/dogs", (req, res) => {
  res.send("Woof!");
});

app.get("*", (req, res) => {
  res.send("I dont know that path!");
});

app.listen(9000, () => {
  console.log("Listening on PORT 9000!");
});
