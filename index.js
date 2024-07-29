const express = require("express");
const app = express();
const morgan = require("morgan");
const colors = require("colors");

app.use(express.static("public"));
app.use(
  morgan((tokens, req, res) =>
    [
      "🌍",
      colors.bgBlack.bold(` REQUEST `),
      tokens.method(req, res) || "",
      colors.green.bold(tokens.status(req, res) || ""),
      colors.bgGreen.bold(tokens.url(req, res) || ""),
      colors.green.bold((tokens["response-time"](req, res) || "") + " ms"),
      colors.magenta.bold("@ " + (tokens.date(req, res) || "")),
      "\n",
      colors.green("from " + tokens["remote-addr"](req, res) || ""),
      colors.yellow.bold("from " + (tokens.referrer(req, res) || "")),
      colors.blue(tokens["user-agent"](req, res) || ""),
    ].join(" ")
  )
);

app.get("/home", (request, response, next) => {
  console.log("dirname", __dirname);
  response.sendFile(__dirname + "/views/home.html");
});

app.get("/cat", (request, response, next) => {
  response.sendFile(__dirname + "/views/cat.html");
});

app.listen(3000, () => console.log("My first app listening on port 3000! "));
