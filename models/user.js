const {mongoose} = require("../config/db")

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        minlength: [3, "No less than 3 characters"],
        maxlength: [100, "No more than 100 characters"],
        trim: true
    },
    email:{
        type: String,
        required: [true, "Name is required"],
        unique: [true, "Email already registered"],
        trim: true,
        match: [/^[\w\.-]+@[\w]+[\.\w]+$/, "Invalid email"]
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    profilePic:{
        type: String
    },
    provider:{
        local: Boolean,
        facebook: Boolean,
        google: Boolean,
        github: Boolean
    },
    idProvider:{
        facebook: String,
        google: String,
        github: String
    }
})

const UserModel = mongoose.model("user", userSchema);

module.exports = UserModel;
