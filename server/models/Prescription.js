const mongoose = require("mongoose");
const Schema =mongoose.Schema;

const PrescriptionSchema = new Schema({
    doctor_id: {
        type: Schema.Types.ObjectId,
        // required: true
    },
    patient_id: {
        type: Schema.Types.ObjectId,
        // required: true
    },
    patient_name: {
        type: String,
        // required: true
    },
    doctor_name: {
        type: String,
        // required: true
    },
    doctor_specialization: {
        type: String,
        // required: true
    },
    img: 
	{ 
		type: String,
        // required: true
    },
    show: {
        type: String
    } 
});

module.exports = mongoose.model("prescription", PrescriptionSchema);