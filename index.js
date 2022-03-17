const { response } = require("express");
const express = require("express");
const app = express();
const path = require("path");
const redditData = require("./data.json");

const comments = [
  {
    username: "Todd",
    comment: "lol that is so funny!",
  },
  {
    username: "Skyler",
    comment: "I like to go birdwatching with my dog",
  },
  {
    username: "Sk8erBoi",
    comment: "Plz delete your account, Todd",
  },
  {
    username: "onlysayswoof",
    comment: "woof woof woof",
  },
];

app.get("/comments", (req, res) => {
  res.render("comments/index", { comments });
});

//here were are doing like we did with path.join(__dirname, '/views')
//this is linking our css style sheet as a default path no matter where we open this project
//this is connecting to the public directory which contains our
//app.css file
app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
//This ^ is saying that, no matter where we are in the directory, I want you to append /views
//the reason we do this is because if we start the server and it does not start at index.js
//the default path where the home.ejs is, will NOT load

//we do not need to say home.ejs because the view engine (in app.set) was set to ejs
//we also dont need to say /view because the default place it looks whenever we call res.render is views (IF IT EXISTS)
app.get("/", (req, res) => {
  res.render("home");
});

//instead of creating the logic in the html
//you can create the logic here and then pass the variable to the ejs
//very similar to props if not the exact thing in a different way
app.get("/random", (req, res) => {
  const num = Math.floor(Math.random() * 10) + 1;
  res.render("random", { random: num });
});

//req.params is specifically the subreddit that we're searching for.
//you can see everything inside of the req object with console.log(req)
app.get("/r/:subreddit", (req, res) => {
  const { subreddit } = req.params;
  //the [subreddit] is to specify which subreddit you want!
  //If you don't include this, you will get ALL data
  //the [subreddit] is being extracted from the { subreddit } from the req.params!!!!
  const data = redditData[subreddit];
  console.log(data);
  if (data) {
    //if you do not spread the data, you cannot extract the specific pieces you want
    res.render("subreddit", { ...data });
  } else {
    res.render("notfound", { subreddit });
  }
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
  const cats = ["Blue", "Rocket", "Monty", "Stephanie", "Winston"];
  res.render("cats", { cats });
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
