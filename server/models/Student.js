const mongoose = require("mongoose");
const Schema =mongoose.Schema;

const StudentSchema = new Schema({
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
    },
    branch: {
        type: String,
        required: true
    },
    semester: {
        type : Number,
        required: true
    },
    booked_classes : {
        type : Array,
        dafault: []
    },
});

module.exports = Student = mongoose.model("student", StudentSchema);