export default function Button({
  children,
  variant = "primary",
  loading = false,
  className = "",
  ...props
}) {
  const styles = variant === "secondary" ? "btn-secondary" : "btn-primary";
  return (
    <button
      className={`${styles} disabled:cursor-not-allowed disabled:opacity-60 ${className}`}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading ? "Please wait..." : children}
    </button>
  );
}
