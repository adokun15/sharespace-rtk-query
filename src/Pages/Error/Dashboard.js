import { useNavigate } from "react-router-dom";
import ErrorElement from ".";

export function DashboardError() {
  const navigate = useNavigate();
  const navigateToDashboard = () => navigate("/dashboard");

  return <ErrorElement towhere={navigateToDashboard} />;
}
