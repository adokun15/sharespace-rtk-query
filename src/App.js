import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootPage from "./Pages/RootPage";
import ErrorElement from "./Pages/Error";
import BlogPage from "./Pages/Blog/BlogPage";
import LandingPage from "./Pages/landingPage";
import GuidePage from "./Pages/Guide/GuidePage";
import NewsLetterPage from "./Pages/NewsLetter/NewsLetterPage";
import AuthenticationPage, { AuthAction } from "./Pages/Auth/Auth";
import ProfilePage from "./Pages/Dashboard/Profile";
import PreferencePage from "./Pages/Dashboard/Preferences";
import FindRoommatePage from "./Pages/Dashboard/FindRoomie";
import ChatsPage from "./Pages/Dashboard/Chats";
import ChatDetail from "./components/ChatDetail";

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
          children: [
            { index: true, element: <FindRoommatePage /> },
            {
              path: "roommates",
              children: [
                { index: true, element: <ChatsPage /> },
                { path: ":chatId", element: <ChatDetail /> },
              ],
            },
            { path: "profile", element: <ProfilePage /> },
            { path: "prefs", element: <PreferencePage /> },
          ],
        },
        { path: "/logout" },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
