const {mongoose} = require("../config/db")

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title is required"],
        minlength: [3, "No less than 3 characters"],
        maxlength: [100, "No more than 100 characters"],
        trim: true
    },
    description:{
        type: String,
        required: [true, "Description is required"],
        minlength: [3, "No less than 3 characters"],
        maxlength: [100, "No more than 200 characters"],
        trim: true,
    },
    creationDate: {
        type: Date,
        default: Date.now,
        getters: function(date){
            return date.toLocaleDateString('es-ES');
        }
    },
    deadline:{
        type: Date,
        required: [true, "Deadline is required"],
        getters: function(date){
            return date.toLocaleDateString('es-ES');
        }
    },
    stateTask:{
        type: String,
        enum: ["pending", "in progress", "completed"],
        default: "pending"
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "project"
    }
})

const TaskModel = mongoose.model("task", taskSchema);

module.exports = TaskModel;
