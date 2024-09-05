import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootPage from "./Pages/RootPage";
import ErrorElement from "./Pages/Error";
import LandingPage from "./Pages/landingPage";
import AuthenticationPage from "./Pages/Auth/Auth";
import ProfilePage from "./Pages/Dashboard/Profile";
import PreferencePage from "./Pages/Dashboard/Preferences";
import FindRoommatePage from "./Pages/Dashboard/FindRoomie";
import ChatsPage from "./Pages/Dashboard/Chats";
import ChatDetail from "./components/ChatDetail";
import AuthenticationComponent from "./components/AuthComponent";
import ProfileUpdate from "./components/User/Profile";
import UserPreferenceData from "./components/User/Preference";
import EditUserName from "./components/User/Username";
import ProfilePic from "./components/User/PhotoUpload";
import { DashboardError } from "./Pages/Error/Dashboard";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootPage />,
      errorElement: <ErrorElement />,
      children: [
        { index: true, element: <LandingPage /> },
        {
          path: "/auth",
          element: <AuthenticationPage />,
          children: [
            {
              index: true,
              element: <AuthenticationComponent />,
            },
            {
              path: "new-profile",
              element: <ProfileUpdate mode="Create" />,
            },
            {
              path: "new-preferences",
              element: <UserPreferenceData mode="Create" />,
            },
            {
              path: "new-photo",
              element: <ProfilePic mode="Create" />,
            },
            {
              path: "username",
              element: <EditUserName mode="Create" />,
            },
          ],
        },
        {
          path: "/dashboard",
          errorElement: <DashboardError />,
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
