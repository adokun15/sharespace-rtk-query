import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootPage from "./Pages/RootPage";
import ErrorElement from "./Pages/Error";
import BlogPage from "./Pages/Blog/BlogPage";
import LandingPage from "./Pages/landingPage";
import GuidePage from "./Pages/Guide/GuidePage";
import NewsLetterPage from "./Pages/NewsLetter/NewsLetterPage";
import AuthenticationPage, { AuthAction } from "./Pages/Auth/Auth";
import DashboardPage from "./Pages/Dashboard/Dashboard";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootPage />,
      errorElement: <ErrorElement />,
      children: [
        { index: true, element: <LandingPage /> },
        { path: "/blogs", element: <BlogPage /> },
        { path: "/guides", element: <GuidePage /> },
        { path: "/newsletter", element: <NewsLetterPage /> },
        { path: "/auth", element: <AuthenticationPage />, action: AuthAction },
        {
          path: "/dashboard",
          children: [{ index: true, element: <DashboardPage /> }],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
