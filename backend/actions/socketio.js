const VisualizationModel = require("../models/visualizationModel");

module.exports = {
  ADD_VISION: async data => {
    const newVision = await new VisualizationModel({
      userId: data.id,
      link: data.fileName,
      description: data.description,
      type: data.type,
      thumbnail_url: data.thumbnail_url
    }).save();

    // const newVision = await new VisualizationModel({
    //   link: data.fileName,
    //   description: data.description,
    //   type: data.type,
    //   shared: true,
    //   category: data.category,
    //   thumbnail_url: data.thumbnail_url
    // }).save();


    return newVision;
  },
};