import AdminCrudPage from "./shared/AdminCrudPage";
import {
  createService as createItem,
  deleteService as deleteItem,
  getServices as getItems,
} from "../../api/serviceApi";

export default function ManageTestimonials() {
  return (
    <AdminCrudPage 
      title="Manage Testimonials"
      fields={["name", "role", "quote"]}
      loader={getItems}
      creator={createItem}
      deleter={deleteItem}
      sectionBgClass="!bg-violet-950"
    />
  );
}

