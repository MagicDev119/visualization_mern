const visualizationModel = require('../models/visualizationModel')
const utils = require('../utils/utils')

const index = async function (req, res, next) {
  try {
    const findQuery = {
      userId: req.user._id
    }
    let visualizationList = await visualizationModel.find(findQuery).populate('userId')
    let sharedVisualizationList = await visualizationModel.find({
      shared: true
    }).populate('userId')
    visualizationList = [...visualizationList, ...sharedVisualizationList]
    visualizationList = visualizationList.filter(each => {
      const gender = req.query.gender ? (each.userId.gender === req.query.gender) : true
      const race = req.query.race ? (each.userId.race === req.query.race) : true
      const age = req.query.age ? (utils._calculateAge(each.userId.birthday) == req.query.age) : true
      return gender && race && age
    })
    let defaultList = await visualizationModel.find({
      category: "default"
    })
    return res.send({
      code: 200,
      message: "List get sucessfully",
      data: [...visualizationList, ...defaultList],
    })
  } catch (error) {
    console.log(error)
    return res
      .status(404)
      .send({ code: 404, messsage: "not able to get list", error: error })
  }
}

const show = async function (req, res, next) {
  try {
    let visualizationData = await visualizationModel.find({
      _id: req.params.id,
    });
    return res.send({
      code: 200,
      message: "Visualization get sucessfully",
      data: visualizationData,
    });
  } catch (error) {
    return res
      .status(404)
      .send({ code: 404, messsage: "not able to get Visualization", error: error });
  }
}

const store = async function (req, res, next) {
  try {
    req.body.userId = req.user.id
    const newVisualization = await visualizationModel(req.body).save();
    let visualizationData = await visualizationModel.find({
      userId: req.user.id
    });
    return res.status(200).send({
      code: 200,
      message: "Visualization created sucessfully",
      data: visualizationData,
      newVisualization: newVisualization,
    });
  } catch (error) {
    return res.status(404).send({
      code: 404,
      messsage: "not able to create visualization",
      error: error,
    });
  }
}

const update = async function (req, res, next) {
  try {
    let { id, visualization } = req.body;
    const visualizationData = await visualizationModel.findOneAndUpdate(
      { _id: id },
      { $set: visualization }
    );
    return res.send({
      code: 200,
      message: "Visualization updated sucessfully",
      data: visualizationData,
    });
  } catch (error) {
    return res.status(404).send({
      code: 404,
      messsage: "not able to update Visualization",
      error: error,
    });
  }
}

const destroy = async function (req, res, next) {
  try {
    let visualizationData = await visualizationModel.findOneAndDelete({ _id: req.params.id });
    return res.send({
      code: 200,
      message: "Visualization deleted sucessfully",
      data: visualizationData,
    });
  } catch (error) {
    return res
      .status(404)
      .send({ code: 404, messsage: "not able to get Visualization", error: error });
  }
}

module.exports = {
  index: index,
  show: show,
  store: store,
  update: update,
  destroy: destroy
}