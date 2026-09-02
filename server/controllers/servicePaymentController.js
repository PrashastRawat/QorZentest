import ServicePayment from "../models/ServicePayment.js";

// @desc   Record a new service project + payment (admin only)
// @route  POST /api/service-payments
export const createServicePayment = async (req, res, next) => {
  try {
    const {
      service,
      projectTitle,
      clientName,
      clientEmail,
      clientPhone,
      clientCompany,
      notes,
      amount,
      method,
      status,
      paidAt,
    } = req.body;

    const servicePayment = await ServicePayment.create({
      service: service || undefined,
      projectTitle,
      clientName,
      clientEmail,
      clientPhone,
      clientCompany,
      notes,
      amount,
      method,
      status,
      paidAt: paidAt || undefined,
      recordedBy: req.user?._id,
    });

    res.status(201).json({
      success: true,
      message: "Service project payment recorded successfully",
      data: servicePayment,
    });
  } catch (error) {
    next(error);
  }
};

// @desc   Get all service project payments (admin only)
// @route  GET /api/service-payments
export const getServicePayments = async (req, res, next) => {
  try {
    const servicePayments = await ServicePayment.find()
      .populate("service", "title categoryLabel")
      .sort({ paidAt: -1, createdAt: -1 });

    res.status(200).json({
      success: true,
      count: servicePayments.length,
      data: servicePayments,
    });
  } catch (error) {
    next(error);
  }
};

// @desc   Get a single service project payment (admin only)
// @route  GET /api/service-payments/:id
export const getServicePaymentById = async (req, res, next) => {
  try {
    const servicePayment = await ServicePayment.findById(req.params.id).populate(
      "service",
      "title categoryLabel",
    );

    if (!servicePayment) {
      const error = new Error("Service payment record not found");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      success: true,
      data: servicePayment,
    });
  } catch (error) {
    next(error);
  }
};

// @desc   Update a service project payment (admin only)
// @route  PUT /api/service-payments/:id
export const updateServicePayment = async (req, res, next) => {
  try {
    const servicePayment = await ServicePayment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true },
    );

    if (!servicePayment) {
      const error = new Error("Service payment record not found");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      success: true,
      message: "Service payment updated successfully",
      data: servicePayment,
    });
  } catch (error) {
    next(error);
  }
};

// @desc   Delete a service project payment (admin only)
// @route  DELETE /api/service-payments/:id
export const deleteServicePayment = async (req, res, next) => {
  try {
    const servicePayment = await ServicePayment.findByIdAndDelete(req.params.id);

    if (!servicePayment) {
      const error = new Error("Service payment record not found");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      success: true,
      message: "Service payment deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

// @desc   Revenue earned from Services only — total + breakdown
//         (used by the admin Revenue & Payments dashboard to add the
//         "Services" stream alongside Course/Training/Internship revenue,
//         which comes from EnrollmentRequest's getRevenueSummary instead)
// @route  GET /api/service-payments/stats/revenue
export const getServiceRevenueSummary = async (req, res, next) => {
  try {
    const result = await ServicePayment.aggregate([
      { $match: { status: "Paid" } },
      { $group: { _id: null, totalRevenue: { $sum: "$amount" }, count: { $sum: 1 } } },
    ]);

    const summary = result[0] || { totalRevenue: 0, count: 0 };

    res.status(200).json({
      success: true,
      data: {
        totalRevenue: summary.totalRevenue,
        paidCount: summary.count,
      },
    });
  } catch (error) {
    next(error);
  }
};