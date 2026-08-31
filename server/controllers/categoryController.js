import Category from "../models/Category.js";

// GET /api/categories?scope=course|training
// Public — used by CourseCategoryBrowser to build the tab bar in the
// order the admin configured, with trending flags attached.
export const getCategories = async (req, res) => {
  try {
    const { scope } = req.query;
    const filter = scope ? { scope } : {};
    const categories = await Category.find(filter).sort({ order: 1 });
    res.status(200).json({ success: true, data: categories });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// POST /api/categories (admin)
// New categories are appended to the end of their scope's order by default.
export const createCategory = async (req, res) => {
  try {
    const { name, label, scope, trending } = req.body;
    if (!name || !scope) {
      return res
        .status(400)
        .json({ success: false, message: "name and scope are required" });
    }

    const highest = await Category.findOne({ scope }).sort({ order: -1 });
    const nextOrder = highest ? highest.order + 1 : 0;

    const category = await Category.create({
      name,
      label,
      scope,
      trending: Boolean(trending),
      order: nextOrder,
    });

    res.status(201).json({ success: true, data: category });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "A category with this name already exists in this scope",
      });
    }
    res.status(500).json({ success: false, message: err.message });
  }
};

// PUT /api/categories/:id (admin)
// Used for renaming, editing the label, and toggling trending on/off.
export const updateCategory = async (req, res) => {
  try {
    const { name, label, trending } = req.body;
    const update = {};
    if (name !== undefined) update.name = name;
    if (label !== undefined) update.label = label;
    if (trending !== undefined) update.trending = Boolean(trending);

    const category = await Category.findByIdAndUpdate(req.params.id, update, {
      new: true,
      runValidators: true,
    });

    if (!category) {
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }

    res.status(200).json({ success: true, data: category });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// DELETE /api/categories/:id (admin)
export const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) {
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }
    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// PUT /api/categories/reorder (admin)
// Body: { order: [{ id, order }, ...] } — the full new position list for one
// scope, sent together and applied in one confirm step (matches the admin
// UI flow: drag/move locally, review, then hit Confirm).
export const reorderCategories = async (req, res) => {
  try {
    const { order } = req.body;
    if (!Array.isArray(order) || order.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "order array is required" });
    }

    await Promise.all(
      order.map(({ id, order: pos }) =>
        Category.findByIdAndUpdate(id, { order: pos }),
      ),
    );

    res.status(200).json({ success: true, message: "Order updated" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
