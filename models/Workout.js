const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
    exercises: [
        {
            type: Schema.Types.ObjectId,
            ref: "Exercise"
        }
    ],

    day: {
        type: Date
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