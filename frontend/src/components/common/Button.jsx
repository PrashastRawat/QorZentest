import React from "react";

export default function Button({
  children,
  variant = "primary",
  loading = false,
  className = "",
  style = {},
  ...props
}) {
  const isSecondary = variant === "secondary";

  const defaultStyle = {
    width: "100%",
    padding: "0.85rem 1.5rem",
    backgroundColor: isSecondary ? "#efe9e3" : "#c9b59c",
    color: isSecondary ? "#1c1917" : "#ffffff",
    fontWeight: "800",
    fontSize: "0.95rem",
    borderRadius: "12px",
    border: isSecondary ? "1px solid #d9cfc7" : "none",
    cursor: loading ? "not-allowed" : "pointer",
    opacity: loading || props.disabled ? 0.7 : 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.5rem",
    transition: "all 0.25s ease",
    boxShadow: isSecondary ? "none" : "0 4px 14px rgba(201, 181, 156, 0.35)",
    ...style
  };

  return (
    <button
      style={defaultStyle}
      disabled={loading || props.disabled}
      className={`btn-custom-action ${className}`}
      {...props}
    >
      {loading ? "Please wait..." : children}
    </button>
  );
}
