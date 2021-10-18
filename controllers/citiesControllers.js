const City = require("../models/City");
const citiesControllers = {
  getCities: async (req, res) => {
    try {
      var cities = await City.find();
      if (cities.length !== 0) {
        res.json({ success: true, response: cities });
      } else {
        throw new Error("Cities not Found");
      }
    } catch (error) {
      res.json({ success: false, response: error });
    }
  },
  getCity: async (req, res) => {
    try {
      var city = await City.findOne({ _id: req.params.id });
      if (city) {
        res.json({ success: true, response: city });
      } else {
        throw new Error();
      }
    } catch (error) {
      res.json({ success: false, response: error });
    }
  },

  addNewCity: (req, res) => {
    const newCity = new City({
      name: req.body.name,
      photo: req.body.photo,
      country: req.body.country,
      description: req.body.description,
    });
    newCity
      .save()
      .then(() => res.json({ success: true }))
      .catch((error) => res.json({ success: false, response: error }));
  },
  deleteCity: (req, res) => {
    City.findOneAndDelete({ _id: req.params.id })
      .then(() => res.json({ success: true }))
      .catch((error) => res.json({ success: false, response: error }));
  },
  modifyProp: (req, res) => {
    City.findOneAndUpdate({ _id: req.params.id }, { ...req.body })
      .then(() => res.json({ success: true }))
      .catch((error) => res.json({ success: false, response: error }));
  },
};
module.exports = citiesControllers;
