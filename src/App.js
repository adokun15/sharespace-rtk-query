import { createBrowserRouter, RouterProvider } from "react-router-dom";
//import RootPage from "./Pages/RootPage";
//import ErrorElement from "./Pages/Error";
//import LandingPage from "./Pages/landingPage";
import AuthenticationPage from "./Pages/Auth/Auth";
import ProfilePage from "./Pages/Dashboard/Profile";
import FindRoommatePage from "./Pages/Dashboard/FindRoomie";
import ChatsPage from "./Pages/Dashboard/Chats";
import AuthenticationComponent from "./components/AuthComponent";
import ErrorPage from "./Pages/Error";
import ExplorePage from "./Pages/Dashboard/Explore";
import HomeRoot from "./Pages/Dashboard/homeRoot";
import ManageCredit from "./Pages/Dashboard/Credit";
import CreateRoomieSpaceForm from "./Pages/Dashboard/CreateForm";
import Settings from "./Pages/Dashboard/Settings";
import RequestReceivedTable from "./components/RequestReceivedTable";
import About from "./Pages/about";
import Privacy from "./Pages/privacy";
import Term from "./Pages/tos";
import SingleRoommateInfo from "./components/SingleRoomieData";
import Guide from "./components/Guides";
import ForgetPasswordComponent from "./Pages/Auth/forgetPassword";
import ChatList from "./components/ChatList";
import ChatDetail from "./components/ChatDetail";
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
        { path: "guide", element: <Guide /> },

        //private
        { path: "find", element: <FindRoommatePage /> },
        {
          path: "create",
          children: [
            { index: true, element: <CreateRoomieSpaceForm /> },
            {
              /*path: "add-video", element: <AddVideo />*/
            },
          ],
        },
        { path: "profile", element: <ProfilePage />},
        { path: "profile/manage-credit", element: <ManageCredit />}
       , 
        { path: "settings", element: <Settings /> },

        //Chat!
        {
          path: "space",
          element: <ChatsPage />,
          children: [
            { index: true, element: <ChatList /> },
            { path: ":spaceId", element: <ChatDetail /> },
            { path: "proposals", element: <RequestReceivedTable /> },
            { path: "proposals/:roomieId", element: <SingleRoommateInfo /> },
          ],
        },

        //For Credit Purchase!
        
        //public
        {
          path: "/auth",
          element: <AuthenticationPage />,
          children: [
            {
              index: true,
              element: <AuthenticationComponent />,
            },
            {
              path: "forgotPassword",
              element: <ForgetPasswordComponent />,
            },
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
