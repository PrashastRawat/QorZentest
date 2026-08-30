import React, { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";
import { getProgress } from "../../../api/studentApi";

const StudentProgress = () => {
  const [progress, setProgress] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        setLoading(true);
        const res = await getProgress();
        setProgress(res.data || []);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load progress");
      } finally {
        setLoading(false);
      }
    };
    fetchProgress();
  }, []);

  if (loading) {
    return (
      <div style={{ padding: "2rem", textAlign: "center", color: "#78716c" }}>
        Loading your progress...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: "2rem", textAlign: "center", color: "#991b1b" }}>
        Something went wrong: {error}
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <div>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.4rem",
            padding: "0.25rem 0.65rem",
            backgroundColor: "#efe9e3",
            border: "0.0625rem solid #d9cfc7",
            borderRadius: "624.9375rem",
            fontSize: "0.75rem",
            fontWeight: 700,
          }}
        >
          <Sparkles size={13} color="#8b7050" />
          <span>Performance Telemetry</span>
        </div>
        <h1
          style={{
            fontSize: "1.5rem",
            fontWeight: 800,
            color: "#1c1917",
            marginTop: "0.25rem",
          }}
        >
          Learning Progress & Analytics
        </h1>
        <p style={{ fontSize: "0.85rem", color: "#78716c" }}>
          Module completion rate for each course you're enrolled in.
        </p>
      </div>

      <div
        style={{
          backgroundColor: "#ffffff",
          border: "0.0625rem solid #d9cfc7",
          borderRadius: "1rem",
          padding: "1.25rem",
        }}
      >
        <h3
          style={{
            fontSize: "1.1rem",
            fontWeight: 800,
            color: "#1c1917",
            marginBottom: "1rem",
          }}
        >
          Enrolled Programs Progress Matrix
        </h3>

        {progress.length === 0 ? (
          <p style={{ fontSize: "0.85rem", color: "#78716c" }}>
            No enrolled courses to show progress for yet.
          </p>
        ) : (
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            {progress.map((c) => (
              <div
                key={c.courseId}
                style={{
                  padding: "1rem",
                  border: "0.0625rem solid #efe9e3",
                  borderRadius: "0.75rem",
                  backgroundColor: "#f9f8f6",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "0.5rem",
                    flexWrap: "wrap",
                    gap: "0.5rem",
                  }}
                >
                  <h4
                    style={{
                      fontSize: "0.95rem",
                      fontWeight: 800,
                      color: "#1c1917",
                    }}
                  >
                    {c.courseName}
                  </h4>
                  <span
                    style={{
                      fontSize: "0.85rem",
                      fontWeight: 800,
                      color: "#1c1917",
                    }}
                  >
                    {c.progress}%
                  </span>
                </div>

                <div
                  style={{
                    width: "100%",
                    height: "0.5rem",
                    backgroundColor: "#d9cfc7",
                    borderRadius: "624.9375rem",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      width: `${c.progress}%`,
                      height: "100%",
                      backgroundColor: "#1c1917",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentProgress;
