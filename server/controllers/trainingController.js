import Training from "../models/Training.js";

// @desc   Get all active trainings (public)
// @route  GET /api/trainings
export const getTrainings = async (req, res, next) => {
  try {
    const trainings = await Training.find({ isActive: true }).sort({ isTrending: -1, createdAt: -1 });
    res.status(200).json({
      success: true,
      count: trainings.length,
      data: trainings,
    });
  } catch (error) {
    next(error);
  }
};

// @desc   Get single training by ID
// @route  GET /api/trainings/:id
export const getTrainingById = async (req, res, next) => {
  try {
    const training = await Training.findById(req.params.id);
    if (!training) {
      const error = new Error("Training not found");
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({ success: true, data: training });
  } catch (error) {
    next(error);
  }
};

// @desc   Create a training (admin only)
// @route  POST /api/trainings
export const createTraining = async (req, res, next) => {
  try {
    const training = await Training.create(req.body);
    res.status(201).json({
      success: true,
      message: "Training created successfully",
      data: training,
    });
  } catch (error) {
    next(error);
  }
};

// @desc   Update a training (admin only)
// @route  PUT /api/trainings/:id
export const updateTraining = async (req, res, next) => {
  try {
    const training = await Training.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!training) {
      const error = new Error("Training not found");
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({
      success: true,
      message: "Training updated successfully",
      data: training,
    });
  } catch (error) {
    next(error);
  }
};

// @desc   Delete a training (admin only)
// @route  DELETE /api/trainings/:id
export const deleteTraining = async (req, res, next) => {
  try {
    const training = await Training.findByIdAndDelete(req.params.id);
    if (!training) {
      const error = new Error("Training not found");
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({ success: true, message: "Training deleted successfully" });
  } catch (error) {
    next(error);
  }
};