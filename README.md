# jr

> Barebones URL shortener based on Node and redis.

This was a fun random project. I ended up writing all the code in about two hours with some breaks in between. It's about as barebones as it could be and is very fast.

My favorite part about *jr.* is any website you point at it becomes a URL shortener. The URLs are based on the request. In development, you'll get a URL back something along the lines of `http://localhost/j3nM2b`, while in production `http://jr.malone.io/j3nM2b`.

## Credits

Thanks to [Sunil Arora](http://sunilarora.org/) for his [article](http://sunilarora.org/url-shortener-service-using-redis/) about his Python URL shortener service using redis. It was helpful to have as a guide for my first project using redis.

[François-G. Ribreau](https://twitter.com/FGRibreau) for the feature on [RedisWeekly](http://redisweekly.com/). Happy to be in good company!

## Technology used

 * [Primer](http://primercss.io/) for CSS styling
 * [redis](http://redis.io/) as the database
 * [clipboard.js](https://clipboardjs.com/) for a lightweight clipboard interface

## redis schema

`global:urls` to keep track of all shortened URLs.

`urls:{shortId}:id` to store the long URL associated with the shortId.

`clicks:{shortId}:url` to keep track of short URL clicks.

## Roadmap

 * Validate URLs
 * In depth Analytics
 * Custom shortened IDs
