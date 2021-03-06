'use strict';

/**
 * @file Quick little script that generates a list of all the emails in MIT Launch Club and writes them in a members.txt
 */

try {
	var config = require(__dirname + '/config.js');
} catch(e) {
	throw new Error('***PLEASE CREATE A CONFIG.JS ON YOUR LOCAL SYSTEM. REFER TO LIBS/CONFIG.EXAMPLE.JS***');
}

const fs = require('fs');
const MongoClient = require('mongodb').MongoClient;

MongoClient.connect(config.mongodbURI, function(err, db) {
	if(err) throw err;

	var programmerData = db.collection('members');

	programmerData.find({}).toArray(function(err, docs) {
		if(err) throw err;

		var users = [];
		for(var i = 0; i < docs.length; i++) {
			users.push(docs[i]['student'] + '@micds.org');
		}
		var string = users.join();

		fs.writeFile('members.txt', string, function(err) {
			if(err) throw err;
			process.exit();
		});
	});
});
