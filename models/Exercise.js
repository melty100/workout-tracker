const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ExerciseSchema = new Schema({
    type: String,
    name: String,
    weight: String,
    sets: String,
    reps: String,
    duration: String
});

const Exercise = mongoose.model("Exercise", ExerciseSchema);

ExerciseSchema.methods.setResistanceValues = function(weight, sets, reps, duration) {
    this.weight = weight;
    this.sets = sets;
    this.reps = reps;
    this.duration = duration;
}

ExerciseSchema.methods.setCardioValues = function(distance, duration) {
    this.distance = distance;
    this.duration = duration;
}

module.exports = Exercise;