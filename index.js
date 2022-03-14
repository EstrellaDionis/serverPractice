const { response } = require("express");
const express = require("express");
const app = express();
const path = require("path");
// console.dir(app);

// app.use((req, res) => {
//   console.log("We got a new request!");
//   res.send("Hello, we got your request! This is the response!");
// });

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
//This ^ is saying that, no matter where we are in the directory, I want you to append /views
//the reason we do this is because if we start the server and it does not start at index.js
//the default path where the home.ejs is, will NOT load

//we do not need to say home.ejs because the view engine (in app.set) was set to ejs
//we also dont need to say view/ because the default place it looks whenever we call res.render is views (IF IT EXISTS)
app.get("/", (req, res) => {
  res.render("home");
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
  console.log(req.query);
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
