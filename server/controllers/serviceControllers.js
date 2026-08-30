import Service from "../models/Service.js";
import { uploadToCloudinary } from "../utils/cloudinaryUpload.js";

// @desc   Create a new service (admin only)
// @route  POST /api/services
export const createService = async (req, res, next) => {
  try {
    const {
      title,
      description,
      features,
      priceStartingFrom,
      whyChooseUs,
      technologies,
      categoryLabel,
      tagline,
      slug,
      iconName,
      approach,
      methodology,
      techniques,
    } = req.body;

    // features/technologies come in as comma-separated strings from the form
    // (Service model expects [String] arrays), so split + trim + drop empties.
    const parsedFeatures = features
      ? features
          .split(",")
          .map((f) => f.trim())
          .filter(Boolean)
      : [];
    const parsedTechnologies = technologies
      ? technologies
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean)
      : [];

    // methodology/techniques arrive as JSON strings when sent via
    // multipart/form-data (FormData can't hold real arrays of objects),
    // so parse them back before handing them to Mongoose. Same pattern
    // as courseController.js's lessons parsing.
    let parsedMethodology = [];
    if (methodology) {
      try {
        parsedMethodology = JSON.parse(methodology);
      } catch (parseError) {
        const error = new Error("Methodology must be valid JSON");
        error.statusCode = 400;
        throw error;
      }
    }

    let parsedTechniques = [];
    if (techniques) {
      try {
        parsedTechniques = JSON.parse(techniques);
      } catch (parseError) {
        const error = new Error("Techniques must be valid JSON");
        error.statusCode = 400;
        throw error;
      }
    }

    // Auto-generate a slug from the title when one isn't provided,
    // so we never save slug: null again (which collides on the sparse unique index)
    let finalSlug = slug;
    if (!finalSlug && title) {
      finalSlug = title
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

      // Ensure uniqueness in case two services share a title
      let candidate = finalSlug;
      let counter = 2;
      while (await Service.findOne({ slug: candidate })) {
        candidate = `${finalSlug}-${counter}`;
        counter++;
      }
      finalSlug = candidate;
    }

    const service = await Service.create({
      title,
      description,
      features: parsedFeatures,
      priceStartingFrom,
      whyChooseUs,
      technologies: parsedTechnologies,
      categoryLabel,
      tagline,
      slug: finalSlug,
      iconName,
      approach,
      methodology: parsedMethodology,
      techniques: parsedTechniques,
      ...(req.file
        ? {
            image: await uploadToCloudinary(req.file.buffer, "qorzen/services"),
          }
        : {}),
    });

    res.status(201).json({
      success: true,
      message: "Service created successfully",
      data: service,
    });
  } catch (error) {
    next(error);
  }
};

// @desc   Get all active services (public)
// @route  GET /api/services
export const getServices = async (req, res, next) => {
  try {
    const services = await Service.find({ isActive: true }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: services.length,
      data: services,
    });
  } catch (error) {
    next(error);
  }
};

// @desc   Get single service by ID or slug (public)
// @route  GET /api/services/:id
export const getServiceById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const isObjectId = /^[0-9a-fA-F]{24}$/.test(id);

    const service = isObjectId
      ? await Service.findById(id)
      : await Service.findOne({ slug: id });

    if (!service) {
      const error = new Error("Service not found");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      success: true,
      data: service,
    });
  } catch (error) {
    next(error);
  }
};

// @desc   Update a service (admin only)
// @route  PUT /api/services/:id
export const updateService = async (req, res, next) => {
  try {
    const service = await Service.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!service) {
      const error = new Error("Service not found");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      success: true,
      message: "Service updated successfully",
      data: service,
    });
  } catch (error) {
    next(error);
  }
};

// @desc   Delete a service (admin only)
// @route  DELETE /api/services/:id
export const deleteService = async (req, res, next) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);

    if (!service) {
      const error = new Error("Service not found");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      success: true,
      message: "Service deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
