const users = require("../users.json");

function getMax(arr: any, prop: string) {
    var max;
    for (var i=0 ; i<arr.length ; i++) {
        if (!max || parseInt(arr[i][prop]) > parseInt(max[prop]))
            max = arr[i];
    }
    return max;
}

exports.hello = (req: any, res: any) => {
	res.json({"message": "Welcome to application."});
}

exports.findAll = (req: any, res: any) => {
	res.json(users);
}

exports.findOne = (req: any, res: any) => {
	let result = users.find((user: any) => {
		return user.id == req.params.id
	})
	res.json(result);
}

exports.create = (req: any, res: any) => {
	let newId = +getMax(users, 'id').id + 1;

	let newUser = {
		"id": newId,
		"name": req.body.name,
		"password": req.body.password,
		"date-of-birth": req.body.date_of_birth,
		"date-of-first-login": req.body.date_of_first_login,
		"date-of-next-notification": req.body.date_of_next_notification,
		"information": req.body.information
	}
	users.push(newUser);
	res.json(newUser);
}

exports.update = (req: any, res: any) => {
	let result = users.find((user: any) => {
		return user.id == req.params.id
	})
	if(result) {
		for(let param in req.body) {
			result[param] = req.body[param];
		}
	}
	res.json(result);
}

exports.delete = (req: any, res: any) => {
	let deleted = false;
	for(var key in users) {
		if(users[key].id == req.params.id) {
			users.splice(key, 1);
			deleted = true;
		}
	}
	if(deleted)
		res.json({'delete': 'true'});
	else
		res.json({'delete': 'false'});
}