import {
  BookOpen,
  HomeIcon,
  MessageSquareCodeIcon,
  
} from "lucide-react";
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
import { LogoutXomponent } from "./Logout";

export default function DashboardNavigator({ loadContent }) {
  const { isMobile } = useSidebar();

  const { data, error, isLoading, isFetching, refetch } = useIsLoggedInQuery(
    null,
    {
      skip: !loadContent,
    }
  );

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

                  {data && !error && (
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
                  )}

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

                </>
              )}
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter>
          
           {!isLoading && !isFetching && !error &&
            <div className="py-2 *:w-full space-y-3 my-3">
            <Button
            variant="ghost"
            asChild
            className=" bg-gray-200 rounded-[1rem] hover:bg-primary font-bold hover:text-white py-4"
            >
              <a href='https://sharespaceng.canny.io/feature-request' >
              Feature Request
              </a>
              </Button>          
        
            <Button
            variant="ghost"
             asChild
              className=" bg-gray-200 rounded-[1rem] hover:bg-primary font-bold hover:text-white py-4"
              >
              <a href='https://chat.whatsapp.com/BTbfYTcS9wX76CZSJLolUr/' >
              Join the Community
              </a>
              </Button>
          </div>
          }
          
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
                <li>
                  <Link to="/terms">Terms</Link>
                </li>
                <li>
                  <Link to="/privacy">Privacy</Link>
                </li>
              </ul>
            </>
          )}
       
          {!error && data && !isLoading && !isFetching && <LogoutXomponent refetch={refetch}/>}
       
        </SidebarFooter>
      </Sidebar>
    </>
  );
}
