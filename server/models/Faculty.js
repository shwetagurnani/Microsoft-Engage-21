const mongoose = require("mongoose");
const Schema =mongoose.Schema;

const FacultySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

module.exports = Student = mongoose.model("faculty", FacultySchema);