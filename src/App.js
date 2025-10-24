import { createBrowserRouter, RouterProvider } from "react-router-dom";
//import RootPage from "./Pages/RootPage";
//import ErrorElement from "./Pages/Error";
//import LandingPage from "./Pages/landingPage";
import AuthenticationPage from "./main/Auth/Auth";
import ProfilePage from "./main/Dashboard/Profile";
//import FindRoommatePage from "./main/Dashboard/FindRoomie";
//import ChatsPage from "./main/Dashboard/Chats";
import AuthenticationComponent from "./components/AuthComponent";
import ErrorPage from "./main/Error";
import ExplorePage from "./main/Dashboard/Explore";
import HomeRoot from "./main/Dashboard/homeRoot";
//import ManageCredit from "./main/Dashboard/Credit";
import CreateRoomieSpaceForm from "./main/Dashboard/CreateForm";
//import Settings from "./main/Dashboard/Settings";
//import RequestReceivedTable from "./components/RequestReceivedTable";
import About from "./main/about";
import Privacy from "./main/privacy";
import Term from "./main/tos";
//import SingleRoommateInfo from "./components/SingleRoomieData";
//import Guide from "./components/Guides";
//import ForgetPasswordComponent from "./Pages/Auth/forgetPassword";
//import ChatList from "./components/ChatList";
//import ChatDetail from "./components/ChatDetail";
function App() {
  const router = createBrowserRouter([
    {
      path: "/", //public

      // element: <RootPage />,
      // errorElement: <ErrorElement />,
      element: <HomeRoot />,
      errorElement: <ErrorPage />,
      children: [
        //public
        { index: true, element: <ExplorePage /> },
        //    { path: "guide", element: <Guide /> },
        //private
        //      { path: "find", element: <FindRoommatePage /> },
        {
          path: "create",
          children: [
            { index: true, element: <CreateRoomieSpaceForm /> },
            {
              /*path: "add-video", element: <AddVideo />*/
            },
          ],
        },
        { path: "profile", element: <ProfilePage /> },
        //{ path: "profile/manage-credit", element: <ManageCredit />}

        //{ path: "settings", element: <Settings /> },

        //Chat!
        /*       {
          path: "space",
          element: <ChatsPage />,
          children: [
            { index: true, element: <ChatList /> },
            { path: ":spaceId", element: <ChatDetail /> },
            { path: "proposals", element: <RequestReceivedTable /> },
            { path: "proposals/:roomieId", element: <SingleRoommateInfo /> },
          ],
        },
*/

        //public
        {
          path: "/auth",
          element: <AuthenticationPage />,
          children: [
            {
              index: true,
              element: <AuthenticationComponent />,
            },
            /*{
              path: "forgotPassword",
              element: <ForgetPasswordComponent />,
            },*/
          ],
        },
        { path: "/terms", element: <Term /> },
        { path: "/privacy", element: <Privacy /> },
        { path: "/about", element: <About /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;

/**
 

* / */
