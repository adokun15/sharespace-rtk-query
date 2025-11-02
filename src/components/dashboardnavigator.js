import { HomeIcon, User } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  useSidebar,
  SidebarSeparator,
} from "../components/ui/sidebar";
import Logo from "../image/sharespace_logo.jpg";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";
import { useIsLoggedInQuery } from "../store/Slices/user";
//import { FEEDBACK_URL, SUPPORT_EMAIL } from "../lib/utils";

export default function DashboardNavigator({ loadContent }) {
  const { isMobile } = useSidebar();

  const { data, error, isLoading, isFetching, refetch } = useIsLoggedInQuery(
    null,
    {
      skip: !loadContent,
    }
  );

  //Link to google form
  //  const toFeedbackSpace = () => {
  //  window.location.href = FEEDBACK_URL;
  // };

  //Link to email
  //const toMyEmail = () => {
  // window.location.href = SUPPORT_EMAIL;
  //};

  return (
    <>
      <Sidebar side={isMobile ? "right" : "left"}>
        <SidebarHeader>
          <header className="my-[10px]">
            <Link to="/">
              <div className="flex gap-2 justify-center items-center">
                <img
                  src={Logo}
                  heigth={30}
                  width={30}
                  className="rounded"
                  alt="sharespace_logo"
                />
                <h1 className="text-2xl">ShareSpace</h1>
              </div>
            </Link>
          </header>

          {error && !data && error?.statusCode !== 401 && (
            <p className="text-center text-red-600 ">
              {error?.message || "Something went wrong!"}
            </p>
          )}
        </SidebarHeader>
        <SidebarSeparator />
        {(isLoading || isFetching) && (
          <>
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index}>
                <Skeleton className="h-4 m-3 rounded-xl p-3 py-1 " />
              </div>
            ))}
          </>
        )}

        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent className="text-center space-y-4 font-poppins">
              {!isLoading && !isFetching && (
                <>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        className="flex text-xl justify-center"
                        asChild
                      >
                        <Link to="/">
                          <HomeIcon className="text-purple-400" />
                          <span>Home</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>

                  {/*data && !error && (
                    <>
                      <SidebarMenu>
                        <SidebarMenuItem>
                          <SidebarMenuButton
                            asChild
                            className="flex text-xl justify-center"
                          >
                            <Link to="/space">
                              <MessageSquareCodeIcon className=" text-purple-500" />
                              <span>Chats</span>
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      </SidebarMenu>
                      <SidebarSeparator />
                    </>
                  )

                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        className="text-xl flex justify-center"
                        asChild
                      >
                        <Link to="/guide">
                          <BookOpen className=" text-purple-500" />
                          <span>Guide</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                  */}

                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        className="text-xl flex justify-center"
                        asChild
                      >
                        <Link to="/about">
                          <span>About us</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>

                  {/*               
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        className="text-xl flex justify-center"
                        asChild
                      >
                        <Link to="/">
                          <span>Our Social</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
   */}
                </>
              )}
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter>
          {(isLoading || isFetching) && (
            <>
              {Array.from({ length: 2 }).map((_, index) => (
                <div key={index}>
                  <Skeleton className="h-3 m-2 rounded-xl p-3 py-1 " />
                </div>
              ))}
            </>
          )}

          {!isLoading && !isFetching && (error || !data) && (
            <>
              <>
                {+error?.statusCode === 500 ? (
                  <Button variant="secondary" onClick={refetch}>
                    Reload
                  </Button>
                ) : (
                  <Button variant="secondary" asChild>
                    <Link className="text-center" to="/auth">
                      Login
                    </Link>
                  </Button>
                )}
              </>

              <ul className="text-muted font-roboto divide-x-2 justify-center gap-2 *:px-1 flex text-xs text-center">
                {/* <li>
                  <Link to="/about">About</Link>
                </li>*/}

                <li>
                  <Link to="/terms">Terms</Link>
                </li>
                <li>
                  <Link to="/privacy">Privacy</Link>
                </li>
              </ul>
            </>
          )}
          {!error && data && !isLoading && !isFetching && (
            <>
              <Button variant="outline">
                <User />
                <Link to="/profile">My profile</Link>
              </Button>

              {/*
              <DropdownMenu>
              <DropdownMenuTrigger
                variant="ghost"
                className="hover:bg-slate-100/90 hover:text-muted"
                asChild
              >
                <Button variant="outline">
                  <User />
                  Account
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent className="min-w-[13rem]">
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <FontAwesomeIcon icon={faPerson} />
                    <Link to="/profile">Profile</Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem>
                    <FontAwesomeIcon icon={faCoins} />
                    <Link to="/profile?credit=true">
                      <span>Buy Credit</span>
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />

                <DropdownMenuItem>
                  <FontAwesomeIcon icon={faToolbox} />
                  <Link to="/settings">Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />

                <DropdownMenuGroup>
                  <Button variant="ghost" asChild onClick={toFeedbackSpace}>
                    <DropdownMenuItem className="flex px-3 justify-between">
                      <span>
                        <FontAwesomeIcon className="mr-2" icon={faReply} />
                        Feedback
                      </span>
                      <ExternalLink />
                    </DropdownMenuItem>
                  </Button>

                  <Button variant="ghost" asChild onClick={toMyEmail}>
                    <DropdownMenuItem className="flex px-3 justify-between">
                      <span>
                        <FontAwesomeIcon
                          className="mr-2"
                          icon={faPeopleGroup}
                        />
                        Support
                      </span>
                      <ExternalLink />
                    </DropdownMenuItem>
                  </Button>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut />
                  <LogoutXomponent refetch={refetch} />
                </DropdownMenuItem>
              </DropdownMenuContent>
              </DropdownMenu>
              */}
            </>
          )}
        </SidebarFooter>
      </Sidebar>
    </>
  );
}
