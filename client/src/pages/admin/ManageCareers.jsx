import AdminCrudPage from "./shared/AdminCrudPage";
import {
  createService as createItem,
  deleteService as deleteItem,
  getServices as getItems,
} from "../../api/serviceApi";

export default function ManageCareers() {
  return (
    <AdminCrudPage
      title="Manage Careers"
      fields={["title", "description", "type"]}
      loader={getItems}
      creator={createItem}
      deleter={deleteItem}
      sectionBgClass="!bg-zinc-900"
    />
  );
}
