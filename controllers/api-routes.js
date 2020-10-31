var path = require("path");
const { Workout, Exercise } = require("../models");
//const { db } = require("../models");

module.exports = function (app) {

    app.get("/api/workouts", function (req, res) {

        Workout.find({})
        .then(dbWorkout => {
            console.log(dbWorkout);
            res.json(dbWorkout);
        })
        .catch(({message}) => {
            console.log(message);
        });
    });

    //Creates a new workout
    app.post("/api/workouts", async function (req, res) {
        Workout.create({ name: "", day: Date.now()})
            .then(dbWorkout => {
                console.log(dbWorkout);
                res.json(dbWorkout);
            })
            .catch(({ message }) => {
                console.log(message);
            });
    });

    //Creates a new exercise and updates a workout with it
    app.put("/api/workouts/:id", function ({ body }, res) {
        
        let ex = new Exercise(body);

        console.log(body);
        console.log(ex);

        Exercise.create(ex)
        .then(({_id}) => {
            Workout.findOneAndUpdate({}, {$push: {exercises: _id}}, {new: true})
        })
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.json(err);
        });
    });

    app.get("/api/workouts/range", function (req, res) {

        Workout.find({})
        .then((dbWorkouts) => {
            console.log(dbWorkouts);
            res.json(dbWorkouts);
        })

    });
}