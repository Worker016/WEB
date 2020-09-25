var express = require('express');
var path = require('path');
var app = express();
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
var logger = require('logger');
var methodOverride = require('method-override');
var static = require('serve-static');
var morgan = require('morgan');
var log = require('./libs/log')(module); 

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(morgan());
app.use(bodyParser());
app.use(methodOverride());  
app.use(static(path.join(__dirname, "public")));

app.get('/api', function (req, res) {
	res.send('API is running');
});

app.get('/api/articles', function(req, res) {
	res.send('This is not implemented now');
});
app.post('/api/articles', function(req, res) {
	res.send('This is not implemented now');
});
app.get('/api/articles/:id', function(req, res) {
	res.send('This is not implemented now');
});
app.put('/api/articles/:id', function (req, res) {
	res.send('This is not implemented now');
});
app.delete('/api/articles/:id', function (req, res) {
	res.send('This is not implemented now');
});

app.listen(1337, function() {
	log.info('Express server listening on port 1337');
});

app.get('/ErrorExample', function(req, res, next) {
	next(new Error('Random error!'));
});

app.use(function(err, req, res, next) {
	res.status(err.status || 500);
	log.error('Internal error(%d): %s', res.statusCode, err.message);
	res.send({ error: err.message });
	return;
});

app.use(function(req, res, next) {
	res.status(404);
	log.debug('Not found URL: %s', req.url);
	res.send({ error: 'Not found' });
	return;
});