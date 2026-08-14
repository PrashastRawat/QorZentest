import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getCourse } from "../../api/courseApi";
import Loader from "../../components/common/Loader";

export default function CourseDetail() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [hasAccess, setHasAccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;
    setLoading(true);

    getCourse(id)
      .then((res) => {
        if (!mounted) return;
        setCourse(res.data?.data ?? null);
        setHasAccess(Boolean(res.data?.hasAccess));
      })
      .catch((err) => {
        if (mounted) setError(err.response?.data?.error || "Unable to load course");
      })
      .finally(() => mounted && setLoading(false));

    return () => { mounted = false; };
  }, [id]);

  if (loading) return <Loader />;

  if (error || !course)
    return (
      <section className="section">
        <div className="container-page">
          <h1 className="section-title">Course not found</h1>
          <Link className="btn-primary mt-6" to="/courses">
            Back to courses
          </Link>
        </div>
      </section>
    );

  return (
    <section className="section">
      <div className="container-page max-w-4xl">
        <p className="font-bold text-brand-600">COURSE</p>
        <h1 className="mt-2 text-4xl font-black">{course.title}</h1>
        <p className="mt-3 text-slate-500">By {course.instructor}</p>
        <p className="mt-6 text-lg leading-8 text-slate-600">
          {course.description}
        </p>

        <div className="mt-8 flex items-center justify-between rounded-2xl border border-slate-200 p-6">
          <span className="text-3xl font-black text-brand-600">
            ₹{course.price}
          </span>
          {!hasAccess && (
            <button className="btn-primary">Buy Now</button>
          )}
        </div>

        <div className="mt-10">
          <h2 className="text-xl font-bold">Course Content</h2>

          {hasAccess ? (
            <ul className="mt-4 space-y-3">
              {course.lessons?.map((lesson) => (
                <li
                  key={lesson._id}
                  className="rounded-xl border border-slate-200 p-4"
                >
                  <p className="font-semibold">{lesson.title}</p>
                  {lesson.duration && (
                    <p className="text-sm text-slate-500">{lesson.duration}</p>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <div className="mt-4 rounded-xl border border-dashed border-slate-300 p-6 text-center text-slate-500">
              Purchase this course to unlock all lessons.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}