const { response } = require("express");
const express = require("express");
const app = express();
// console.dir(app);

// app.use((req, res) => {
//   console.log("We got a new request!");
//   res.send("Hello, we got your request! This is the response!");
// });

app.get("/", (req, res) => {
  res.send("This is the home page!");
});

//req.params is specifically the subreddit that we're searching for.
//you can see everything inside of the req object with console.log(req)
app.get("/r/:subreddit", (req, res) => {
  console.log(req.params);
  const { subreddit } = req.params;
  res.send(`<h1>Browsing the ${subreddit} subreddit`);
});

//the colon is declaring a VARIABLE. These can be named ANYTHING BUT,
//as always, we want to name them things related to what we want!
app.get("/r/:subreddit/:postId", (req, res) => {
  console.log(req.params);
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

//this is for the query string which is part of the URL and it comes AFTER the question mark (?)
//localhost:9000/search?q=dogs&color=red
//^ example of what the looks like. You can construct one easily on
//POSTMAN with the query parameters passed in with key value pairs
app.get("/search", (req, res) => {
  const { q } = req.query;
  if (!q) {
    res.send(`NOTHING FOUND IF NOTHING SEARCHED!`);
  }
  res.send(`<h1>Search results for: ${q}</h1>`);
});

app.get("*", (req, res) => {
  res.send("I dont know that path!");
});

app.listen(9000, () => {
  console.log("Listening on PORT 9000!");
});
