const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    passwordHash: {
        type: String,
        required: true
    }
})

userSchema.statics.register = async function(firstName, lastName, email, password) {

    if (!firstName || !lastName || !email || !password) {
        throw Error("Credentials missing.")
    }

    const userExists = await this.findOne({email});

    if (userExists) {
        throw Error("User already exists.")
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const user = await this.create({ firstName, lastName, email, passwordHash });

    return user;

}

userSchema.statics.login = async function(email, password) {

    if (!email || !password) {
        throw Error("All fields must be filled.");
    };

    const user = await this.findOne({email });

    if (!user) {
        throw Error("User cannot be found");
    }

    const validLogin = await bcrypt.compare(password, user.passwordHash);

    if (!validLogin) {
        throw Error("Invalid crdentials");
    };

    return user
}


const User = new mongoose.model("User", userSchema);

module.exports = User;