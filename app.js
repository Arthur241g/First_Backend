const express = require('express')
const app = express()
app.listen(8080, console.log("Server start in 8080:"));

const dataArray = ["Accidents Will Happen", "Didn't We", "Dig Down Deep", "Dindi", "Do I Worry?", "Do You Know Why?", "Do You Know Why?",
"Don'cha Go 'Way Mad", "Don't Be a Do-Badder", "Don't Be that Way", "Don't Be that Way", "Don't Change Your Mind About Me",
"Don't Cry, Joe", "Don't Like Goodbyes", "Don't Like Goodbyes", "Don't Like Goodbyes", "Dry Your Eyes", "Elizabeth"]

app.get('/', (req, res) => {
  res.send(dataArray[Math.floor(Math.random()*19)])
})

app.get('/birth_date', (req, res) => {
    res.send("December 12, 1915")
})

app.get('/birth_city', (req, res) => {
    res.send("Hoboken, New Jersey")
})

app.get('/wives', (req, res) => {
    res.send('Nancy Barbato, Ava Gardner, Mia Farrow, Barbara Marx')
})

app.get('/picture', (req, res) => {
    res.redirect('https://en.wikipedia.org/wiki/Frank_Sinatra#/media/File:Frank_Sinatra2,_Pal_Joey.jpg%27%27')
})

app.get('/public', (req, res) => {
    res.send('Everybody can see this page')
})

app.get('/protect', (req, res) => {
    res.send('Welcome, authenticated client')
})

app.get("/protected", (req, res) => {
    var reject = () => {
      res.setHeader("www-authenticate", "Basic");
      res.status(401).send("Not authorized");
    };

    var authorization = req.headers.authorization;

    if (!authorization) {
       return reject();
    }

    var [username, password] = Buffer.from(
      authorization.replace("Basic ", ""),
      "base64"
    )
      .toString()
      .split(":");

    if (!(username === "admin" && password === "admin")) {
      return reject();
    }

    res.send("Welcome, authenticated client");
  });
