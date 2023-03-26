__path = process.cwd()

var express = require('express');
var router = express.Router();
var { exec } = require('child_process')
var fetch = require('node-fetch')
var canvacord = require('canvacord').Canvas
var fs = require('fs')

async function getBuffer(url) {
  he = await fetch(url).then(c => c.buffer())
   return he
}
async function getJson(url) {
  he = await fetch(url).then(c => c.json())
   return he
}
function getRandom(nans) {
  he = nans[Math.floor(Math.random() * nans.length)]
   return he
}
 router.get('/', (req, res) => {
 res.send(`<!DOCTYPE html>
<html><link type="text/css" rel="stylesheet" id="dark-mode-custom-link"><link type="text/css" rel="stylesheet" id="dark-mode-general-link"><style lang="en" type="text/css" id="dark-mode-custom-style"></style><style lang="en" type="text/css" id="dark-mode-native-style"></style><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    
    <title>Canvas</title>
    <link rel="icon" href="https://i.ibb.co/3dLh13c/79a970c5c44e.jpg" type="image/jpg">
</head>
<style>/* Style Settings */
@import url('https://fonts.googleapis.com/css?family=Karla:400,700&display=swap');
:root {
    --bgColor: block;
    --accentColor: #39e09b;
    --font: 'Karla', sans-serif;
}

body{
    background-color: var(--bgColor);
}

#userPhoto{
    width: 96px;
    height: 96px;
    display: block;
    margin: 35px auto 20px;
    border-radius: 50%;
}

#userName{
    color: #bbb;
    font-size: 1rem;
    font-weight: 600;
    line-height: 1.25;
    display: block;
    font-family: var(--font);
    width: 100%;
    text-align: center;
    text-decoration: none;
}

#links{
    max-width: 675px;
    width: auto;
    display: block;
    margin: 27px auto;
}
.link{
    display: block;
    background-color: var(--accentColor);
    color: var(--bgColor);
    font-family: var(--font);
    text-align: center;
    margin-bottom: 20px;
    padding: 17px;
    text-decoration: none;
    font-size: 1rem;
}

.link:hover{
    background-color: var(--bgColor);
    color: var(--accentColor);
}
.nav-wrapper, .page-footer {
   background-color: #000000;
   width: 360px;
   height: 200px;
   background: green;
   animation: warnanya 5s infinite;
   }

  @keyframes warnanya {
  from {background-color: green;}
  to {background-color: green;}
  to {background-color: yellow;}
  }
  }
</style>
<body class="nav-wrapper">
    <img id="userPhoto" src="./poto.png" alt="User Photo">
    
    <a href="https://github.com/KilerBotz" id="userName">KilersBotz</a>
    <div id="links">
        <a class="link" href="canvas/clyde?text=KilersBotz">Canvas Clyde</a>
    </div>
    <div id="links">
        <a class="link" href="canvas/changemymind?text=KilersBotz">Canvas ChangeMyMind</a>
    </div>
    <div id="links">
        <a class="link" href="canvas/trigger?url=https://i.ibb.co/p40Qpnn/8274b29694db.png">Canvas Trigger</a>
    </div>
    <div id="links">
        <a class="link" href="loli">Random Loli</a>
    </div>
    <div id="links">
        <a class="link" href="shota">Random Shota</a>
    </div>
    <div id="links">
        <a class="link" href="nsfwloli">Random NSFW loli</a>
    </div>
    <div id="links">
        <a class="link" href="nsfw/hentai">Random Hentai</a>
    </div>
    <!-- Javascript -->
    <script src="/script/jquery.min.js"></script>
    <script src="/script/index.js"></script>

</body></html>`)
})
 router.all('/loli', async (req, res) => {
   try {
   json = JSON.parse(fs.readFileSync('lib/lolis.json').toString())
   random = json[Math.floor(Math.random() * json.length)]
   res.type('png')
   res.send(await getBuffer(random))
   } catch (e) {
   res.send({ status: 400, response: 'Server Error!' })
   }
   })
  router.get('/canvas/*', async (req, res) => {
   let { url, text } = req.query
   try {
  switch(req.path.replace(/\/canvas/, '').toLowerCase()) {
 case '/trigger':
 case '/trigger/':
  if (!url) return res.status(408).send({ status: 408, message: 'Parameter url cannot be empty'})
  res.type('gif')
  res.send(await canvacord.trigger(url))
 break
 case '/changemymind':
 case '/changemymind/':
  if (!text) return res.status(408).send({ status: 408, message: 'Parameter text cannot be empty' })
  res.type('jpg')
  res.send(await canvacord.changemymind(text))
  break
 case '/clyde':
 case '/clyde/':
  if (!text) return res.status(408).send({ status: 408, message: 'Parameter text cannot be empty' })
  res.type('jpg')
  res.send(await canvacord.clyde(text))
  break
 default: 
 res.status(404).json({
            status:404,
            error: 'Page you are looking for is not found',
            endpoint: req.path
        })
 }
  } catch (e) {
  console.error(e) 
   res.type('text/json')
   res.status(400).send({ status: 400, message: 'Server Error, Please Report to owner!' })
 }
 })
 router.get('/nsfw/hentai', async (req, res) => {
 try {
 end = getRandom([,"waifu", "neko"])
 let { url } = await getJson(`https://api.waifu.pics/nsfw/${end}`)
 let buffer = await getBuffer(url)
 res.type('png')
 res.send(buffer)
 } catch {
 res.type('text/json')
 res.status(400).send({ status: 400, message: 'Internal Server Error!' })
 }
 })
 router.all('/shota', async (req, res) => {
   try {
   json = JSON.parse(fs.readFileSync('lib/shotas.json').toString())
   random = json[Math.floor(Math.random() * json.length)]
   res.type('png')
   res.send(await getBuffer(random))
   } catch (e) {
   res.send({ status: 400, response: 'Server Error!' })
   }
   })
   router.all('/nsfwloli', async (req, res) => {
   try {
   json = JSON.parse(fs.readFileSync('lib/nsfwlolis.json').toString())
   random = json[Math.floor(Math.random() * json.length)]
   res.type('png')
   res.send(await getBuffer(random))
   } catch (e) {
   res.send({ status: 400, response: 'Server Error!' })
   }
   })
   router.all('*', async (req, res) => {
   res.status(404).json({
            status:404,
            error: 'Page you are looking for is not found',
            endpoint: req.path
        })
})
  

module.exports = router
