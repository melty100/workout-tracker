var path = require("path");
const {Workout} = require("../models");

module.exports = function (app) {

    app.get("/api/workouts", function (req, res) {

        Workout.find({}).sort({day: -1}).limit(1)
        .then(data => {

            w = data[0];
            w.totalDuration = w.exercises.reduce((tot, ex) => {return tot + ex.duration;}, 0);

            res.json(data);
        })
        .catch(({message}) => {
            console.log(message);
        });
    });

    //Creates a new workout
    app.post("/api/workouts", function (req, res) {
        Workout.create({day: new Date().setDate(new Date().getDate())})
            .then(dbWorkout => {
                res.json(dbWorkout);
            })
            .catch(({ message }) => {
                console.log(message);
            });
    });

    //Creates a new exercise and updates a workout with it
    app.put("/api/workouts/:id", function (req, res) {

        console.log(req.body);
        console.log(req.params.id);

        Workout.findOneAndUpdate({_id: req.params.id}, {$push: {exercises: req.body}}, {new: true})
        .then(dbWorkout => {

            dbWorkout.totalDuration = dbWorkout.exercises.reduce((tot, ex) => {return tot + ex.duration}, 0);

            res.json(dbWorkout);
        })
        .catch(err => {
            console.log(err);
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