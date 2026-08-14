import AdminCrudPage from "./shared/AdminCrudPage";
import { createBlog, deleteBlog, getBlogs } from "../../api/blogApi";

export default function ManageBlog() {
  return (
    <AdminCrudPage
      title="Manage Blog"
      fields={["title", "excerpt", "content"]}
      loader={getBlogs}
      creator={createBlog}
      deleter={deleteBlog}
    />
  );
}
