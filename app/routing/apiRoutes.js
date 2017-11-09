

// Get all friends
app.get("/api/friends", function(req, res) {
    res.json(friends);
});

// Create New Friend - takes in JSON input
app.post("/api/friends", function(req, res) {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body-parser middleware
    var newFriend = req.body;

    console.log("[apiRoutes.js] " + newFriend + " (" + __dirname + ")");

    friends.push(newFriend);
    makeFriendsFile();

    res.json(findCompatibleFriend(newFriend));
});

function makeFriendsFile() {
	var fileName = "../data/friends.js";

	fs.writeFile(fileName, "var friends = ", function (err) {
		if (err) throw err;
		fs.appendFile(fileName, JSON.stringify(friends, null, 4) + ";", function (err) {
			if (err) throw err;
			fs.appendFile(fileName, "\n\nmodule.exports = friends;", function (err) {
				if (err) throw err;
			});    
		});
	});
}

function findCompatibleFriend(newFriend) {
	var bestFriend = {
		"name": "",
		"photo": ""
	};

	var bestDiff = (5 * newFriend.scores.length) + 1;
	var totalDiff = 0;

	for(var i=0; i<friends.length; i++) {

		totalDiff = 0;

		for(var j=0; j<newFriend.scores.length; j++) {
			totalDiff += Math.abs(newFriend.scores[j] - friends[i].scores[j]);
		}

		if(totalDiff < bestDiff) {
			bestDiff = totalDiff;
			bestFriend.name = friends[i].name;
			bestFriend.photo = friends[i].photo;
		}
	}

	return bestFriend;
}

