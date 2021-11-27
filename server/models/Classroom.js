const mongoose = require("mongoose");
const Schema =mongoose.Schema;

const ClassroomSchema = new Schema({
    faculty_id: {
        type: Schema.Types.ObjectId,
    },
    subject: {
        type: String,
        required: true
    },
    branch: {
        type: String,
        required: true
    },
    semester: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
    },
    room_no: {
        type: Number,
        required: true
    },
    slot_no: {
        type: Number,
        required: true
    },
    total_seats: {
        type: Number,
        default: 20
    }
});

module.exports = Classroom = mongoose.model("classroom", ClassroomSchema);