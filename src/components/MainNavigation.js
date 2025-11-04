import { useSidebar } from "../components/ui/sidebar";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Logo from "../image/sharespace_logo.jpg";
import { ArrowRight, User } from "lucide-react";
import { Button } from "../components/ui/button";
import { FEEDBACK_URL } from "../lib/utils";
import { useIsLoggedInQuery } from "../store/Slices/user";
import { Link } from "react-router-dom";
import { Skeleton } from "./ui/skeleton";

export default function MainNavigation() {
  const { isMobile } = useSidebar();

  //Link to google form
  const toFeedbackSpace = () => {
    window.location.href = FEEDBACK_URL;
  };

  const { data, error, isLoading, isFetching, refetch } =
    useIsLoggedInQuery(null);

  return (
    <>
      {isMobile && (
        <>
          <div className="text-xs md:text-xl md:text-center w-full bg-accent text-white text-center py-1 px-5">
            <p className="md:hidden" onClick={toFeedbackSpace}>
              <span className="font-bold">ShareSpace</span> is currently in
              beta! We're working to improve your experience. Have feedback? Let
              us know!
              <ArrowRight className="inline mx-2" size={16} />
            </p>
          </div>
          <nav className="flex bg-transparent  w-full py-4 text-2xl  mb-3 px-4 font-sans_serif   bg-white  shadow  justify-between">
            <div className="flex gap-2 justify-center items-center">
              <img
                src={Logo}
                heigth={30}
                width={30}
                className="rounded"
                alt="sharespace_logo"
              />
              <h1 className="text-xl">
                <Link to="/">ShareSpace</Link>
              </h1>
            </div>

            <div>
              {!error && data && !isLoading && !isFetching && (
                <Button
                  variant=""
                  className="md:text-[20px] bg-transparent hover:text-white text-secondary text-[16px] rounded-xl"
                >
                  <User />
                  <Link to="/profile">profile</Link>
                </Button>
              )}

              {(isLoading || isFetching) && !error && (
                <Skeleton className="h-4 m-3 rounded-xl p-3 py-1 " />
              )}
              {!isLoading && !isFetching && (error || !data) && (
                <>
                  {+error?.statusCode === 500 ? (
                    <Button variant="outline" onClick={refetch}>
                      Load page
                    </Button>
                  ) : (
                    <Button
                      className="md:text-[20px] bg-transparent hover:text-white text-secondary text-[16px] rounded-xl"
                      asChild
                    >
                      <Link className="text-center" to="/auth">
                        Login
                      </Link>
                    </Button>
                  )}
                </>
              )}
            </div>
          </nav>
        </>
      )}
    </>
  );
}
