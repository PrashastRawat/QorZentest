import React, { useState, useEffect } from "react";
import { ChevronUp, ChevronDown, Flame, Plus, Trash2, Loader2, Check } from "lucide-react";
import {
  getAdminCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  reorderCategories,
} from "../../../api/adminApi";
import "./AdminCategoryManager.css";

/**
 * Lets an admin control, for one scope ("course" or "training"):
 * - the position of each category in the public page's nav/tab bar
 *   (up/down arrows, applied locally then saved with one Confirm click)
 * - whether a category is marked "Trending" (shown as a badge on the
 *   public tab + on every card in that category)
 *
 * Flow matches how the admin described it: move things up/down first
 * (just local state, nothing saved yet — the "log" step), then hit
 * Confirm to persist the new order to the backend in one request.
 */
export default function AdminCategoryManager({ scope, title }) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [newName, setNewName] = useState("");
  const [adding, setAdding] = useState(false);
  const [error, setError] = useState(null);

  const loadCategories = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await getAdminCategories(scope);
      const data = res.data?.data || [];
      setCategories(data.sort((a, b) => a.order - b.order));
      setDirty(false);
    } catch (err) {
      console.error("[AdminCategoryManager] Failed to load categories:", err);
      setError("Could not load categories.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, [scope]);

  // Move a category up/down in local state only — nothing is saved to the
  // backend until Confirm Order is clicked.
  const move = (index, direction) => {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= categories.length) return;
    const updated = [...categories];
    [updated[index], updated[targetIndex]] = [
      updated[targetIndex],
      updated[index],
    ];
    setCategories(updated);
    setDirty(true);
  };

  const toggleTrending = async (category) => {
    try {
      const res = await updateCategory(category._id, {
        trending: !category.trending,
      });
      setCategories((prev) =>
        prev.map((c) => (c._id === category._id ? res.data.data : c)),
      );
    } catch (err) {
      console.error("[AdminCategoryManager] Failed to toggle trending:", err);
      setError("Could not update trending status.");
    }
  };

  const confirmOrder = async () => {
    try {
      setSaving(true);
      setError(null);
      const order = categories.map((c, idx) => ({ id: c._id, order: idx }));
      await reorderCategories(order);
      setDirty(false);
    } catch (err) {
      console.error("[AdminCategoryManager] Failed to save order:", err);
      setError("Could not save the new order. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!newName.trim()) return;
    try {
      setAdding(true);
      setError(null);
      const res = await createCategory({ name: newName.trim(), scope });
      setCategories((prev) => [...prev, res.data.data]);
      setNewName("");
    } catch (err) {
      console.error("[AdminCategoryManager] Failed to add category:", err);
      setError(
        err.response?.data?.message || "Could not add that category.",
      );
    } finally {
      setAdding(false);
    }
  };

  const handleDelete = async (category) => {
    if (
      !window.confirm(
        `Remove "${category.name}" from the ${scope} tab bar? Existing ${scope}s with this category will still exist in the database, they just won't have a matching tab.`,
      )
    )
      return;
    try {
      await deleteCategory(category._id);
      setCategories((prev) => prev.filter((c) => c._id !== category._id));
    } catch (err) {
      console.error("[AdminCategoryManager] Failed to delete category:", err);
      setError("Could not delete that category.");
    }
  };

  return (
    <div className="acm-panel">
      <div className="acm-header">
        <div>
          <h3 className="acm-title">{title || "Category Order & Trending"}</h3>
          <p className="acm-subtitle">
            Position #1 shows first on the public nav bar. Mark any category
            as Trending to show a badge on its tab and on every card in it.
          </p>
        </div>
        {dirty && (
          <button
            className="acm-confirm-btn"
            onClick={confirmOrder}
            disabled={saving}
          >
            {saving ? (
              <Loader2 size={15} className="acm-spin" />
            ) : (
              <Check size={15} />
            )}
            Confirm Order
          </button>
        )}
      </div>

      {error && <div className="acm-error">{error}</div>}

      {loading ? (
        <div className="acm-status">Loading categories...</div>
      ) : categories.length === 0 ? (
        <div className="acm-status">
          No categories yet — add one below to start building the tab bar.
        </div>
      ) : (
        <ul className="acm-list">
          {categories.map((cat, idx) => (
            <li key={cat._id} className="acm-row">
              <span className="acm-position">{idx + 1}</span>
              <div className="acm-reorder-btns">
                <button
                  aria-label="Move up"
                  onClick={() => move(idx, -1)}
                  disabled={idx === 0}
                >
                  <ChevronUp size={16} />
                </button>
                <button
                  aria-label="Move down"
                  onClick={() => move(idx, 1)}
                  disabled={idx === categories.length - 1}
                >
                  <ChevronDown size={16} />
                </button>
              </div>
              <span className="acm-name">
                {cat.label && cat.label !== cat.name ? (
                  <>
                    {cat.label}{" "}
                    <span className="acm-name-raw">({cat.name})</span>
                  </>
                ) : (
                  cat.name
                )}
              </span>
              <button
                className={`acm-trending-toggle ${cat.trending ? "active" : ""}`}
                onClick={() => toggleTrending(cat)}
              >
                <Flame size={14} />
                {cat.trending ? "Trending" : "Set as Trending"}
              </button>
              <button
                className="acm-delete-btn"
                aria-label="Delete category"
                onClick={() => handleDelete(cat)}
              >
                <Trash2 size={15} />
              </button>
            </li>
          ))}
        </ul>
      )}

      <form className="acm-add-form" onSubmit={handleAdd}>
        <input
          type="text"
          placeholder={`New ${scope} category name (must match the category value used on ${scope} records)`}
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
        <button type="submit" disabled={adding || !newName.trim()}>
          {adding ? <Loader2 size={15} className="acm-spin" /> : <Plus size={15} />}
          Add Category
        </button>
      </form>
    </div>
  );
}
