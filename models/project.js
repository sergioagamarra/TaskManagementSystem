const {mongoose} = require("../config/db")

const projectSchema = new mongoose.Schema({
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
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    }
})

const ProjectModel = mongoose.model("project", projectSchema);

module.exports = ProjectModel;
