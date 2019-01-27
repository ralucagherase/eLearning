var mongoose=require('mongoose');
var bcrypt= require('bcryptjs');

//user Schema
var UserSchema= mongoose.Schema({
    username:{
        type:String
    },
    password:{
        type: String,
        bcrypt: true
    },
    type:{
        type: String
    }
});

var User=module.exports=mongoose.model('User', UserSchema);

//get single user by id
module.exports.getUserById = function(id, callback){
    User.findById(id, callback);
}

//get user by username
module.exports.getUserByUsername=function(username,callback){
    var query={username:username};
    User.findOne(query,callback);
}
//compare passwords
module.exports.comparePassword=function(candidatePassword,hash, callback){
    bcrypt.compare(candidatePassword,hash, function(err, isMatch){
        if(err) throw err;
        callback(null, isMatch);
    });         
}
// Create Student User
module.exports.saveStudent = function(newUser, newStudent, callback){
	bcrypt.hash(newUser.password, 10, function(err, hash){
		if(err) throw errl;
		// Set hash
		newUser.password = hash;
		console.log('Student is being saved');
        //async.parallel([newUser.save.bind(newUser), newStudent.save.bind(newStudent)], callback);
        async.parallel([
            (callback) => newUser.save(callback),
            (callback) => newStudent.save(callback)
        ], callback);
        // newUser.save(); 
        // newStudent.save();
	});
}

// Create Instructor User
module.exports.saveInstructor = function(newUser, newInstructor, callback){
	bcrypt.hash(newUser.password, 10, function(err, hash){
		if(err) throw errl
		// Set hash
		newUser.password = hash;
		console.log('Instructor is being saved');
		async.parallel([newUser.save.bind(newUser), newInstructor.save.bind(newInstructor)], callback);
	});
}
