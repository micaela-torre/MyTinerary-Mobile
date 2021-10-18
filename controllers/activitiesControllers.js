const Activity = require("../models/Activity");
const activitiesControllers = {
  getActivities: async (req, res) => {
    try {
      var activities = await Activity.find();
      if (activities.length) {
        res.json({ success: true, response: activities });
      } else {
        throw new Error("Activities not Found");
      }
    } catch (error) {
      res.json({ success: false, response: error });
      console.log(error);
    }
  },
  getActivity: async (req, res) => {
    try {
      var activity = await Activity.findOne({ _id: req.params.id });
      if (activity) {
        res.json({ success: true, response: activity });
      } else {
        throw new Error();
      }
    } catch (error) {
      res.json({ success: false, response: error });
    }
  },
  getActivitiesByItinerary: async (req, res) => {
    try {
      var activitiesByItinerary = await Activity.find({
        itineraryId: req.params.itineraryId,
      });

      res.json({ success: true, response: activitiesByItinerary });
    } catch (e) {
      res.json({ success: false, response: e });
    }
  },

  addNewActivity: (req, res) => {
    const newActivity = new Activity({
      name: req.body.name,
      pic: req.body.pic,
      itineraryId: req.body.itineraryId,
    });
    newActivity
      .save()
      .then(() => res.json({ success: true }))
      .catch((error) => res.json({ success: false, response: error }));
  },
  deleteActivity: (req, res) => {
    Activity.findOneAndDelete({ _id: req.params.id })
      .then(() => res.json({ success: true }))
      .catch((error) => res.json({ success: false, response: error }));
  },
  modifyProp: (req, res) => {
    Activity.findOneAndUpdate({ _id: req.params.id }, { ...req.body })
      .then(() => res.json({ success: true }))
      .catch((error) => res.json({ success: false, response: error }));
  },
};
module.exports = activitiesControllers;
