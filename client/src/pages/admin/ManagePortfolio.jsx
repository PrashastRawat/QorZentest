import AdminCrudPage from "./shared/AdminCrudPage";
import {
  createPortfolioItem,
  deletePortfolioItem,
  getPortfolio,
} from "../../api/portfolioApi";

export default function ManagePortfolio() {
  return (
    <AdminCrudPage
      title="Manage Portfolio"
      fields={["title", "category", "image", "description"]}
      loader={getPortfolio}
      creator={createPortfolioItem}
      deleter={deletePortfolioItem}
    />
  );
}
