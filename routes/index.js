const express = require("express");
const router = express.Router();
const citiesControllers = require("../controllers/citiesControllers");
const itinerariesControllers = require("../controllers/itinerariesControllers");
const userControllers = require("../controllers/userControllers");
const passport = require("passport");
const validator = require("../controllers/validator");
const activitiesControllers = require("../controllers/activitiesControllers");

router
  .route("/cities")
  .get(citiesControllers.getCities)
  .post(citiesControllers.addNewCity);

router
  .route("/city/:id")
  .get(citiesControllers.getCity)
  .delete(citiesControllers.deleteCity)
  .put(citiesControllers.modifyProp);

router
  .route("/itineraries")
  .get(itinerariesControllers.getItineraries)
  .post(itinerariesControllers.addNewItinerary);

router
  .route("/itinerary/:id")
  .get(itinerariesControllers.getItinerary)
  .delete(itinerariesControllers.deleteItinerary)
  .put(itinerariesControllers.modifyProp);

router
  .route("/itineraries/:cityId")
  .get(itinerariesControllers.getItinerariesByCity);

router.route("/users").post(validator, userControllers.newUser);
router.route("/user/signin").post(userControllers.logUser);

router
  .route("/verifyToken")
  .get(
    passport.authenticate("jwt", { session: false }),
    userControllers.verifyToken
  );

router
  .route("/activities")
  .get(activitiesControllers.getActivities)
  .post(activitiesControllers.addNewActivity);

router
  .route("/activity/:id")
  .get(activitiesControllers.getActivity)
  .delete(activitiesControllers.deleteActivity)
  .put(activitiesControllers.modifyProp);
router
  .route("/activities/:itineraryId")
  .get(activitiesControllers.getActivitiesByItinerary);
router
  .route("/like/:id")
  .put(
    passport.authenticate("jwt", { session: false }),
    itinerariesControllers.putLike
  );
router
  .route("/comment/:id")
  .put( passport.authenticate("jwt", { session: false }),
  itinerariesControllers.addComment)


module.exports = router;
