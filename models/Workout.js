const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
    exercises: [
        {
            type: {type: String},
            name: {type: String},
            duration: {type: Number},
            distance: {type: Number},
            weight: {type: Number},
            reps: {type: Number},
            sets: {type: Number}
        }
    ],

    day: {
        type: Date
    },

    totalDuration: {
        type: Number
    }
});

WorkoutSchema.methods.setTotalDuration = function(){
    this.totalDuration = this.exercises.reduce((tot, ex) => {
        
        return tot + ex.duration;
    }, 0);

    return this.totalDuration
}

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;