var express = require('express')
var bodyParser = require('body-parser')
var shortId = require('short-id-gen')
var redis = require('redis')

var redistogo = process.env.REDISTOGO_URL
var client = redistogo ? redis.createClient(redistogo) : redis.createClient()

client.on('error', function (err) {
  console.error('Redis error:', err)
})

var app = express()

app.set('views', __dirname + '/views')
app.set('view engine', 'jade')

app.use(bodyParser.urlencoded())

app.get('/', function (req, res) {
  return res.render('index')
})

app.post('/', function (req, res) {
  var longUrl = req.body.url
  var urlId = shortId.generate()

  // Check it is unique
  client.sadd('global:urls', urlId, function (err, response) {
    if (err) throw err

    // If we added it to global:urls, it is a new id
    if (response == 1) {
      client.set('urls:' + urlId + ':id', longUrl, function (err, response) {
        if (err) throw err

        res.render('index', {
          url: 'http://' + req.hostname + '/' + urlId
        })
      })
    } else {
      // Fail
      res.render('index')
    }
  })
})

app.get('/:shortId', function (req, res) {
  var urlId = req.params.shortId

  client.get('urls:' + urlId + ':id', function (err, response) {
    if (err) throw err

    if (!response) {
      return res.status(404).render('404')
    }

    return res.render('redirect', {
        url: response
    })

    client.incr('clicks:' + urlId + ':url')
  })
})

app.listen(process.env.PORT || 3000)
