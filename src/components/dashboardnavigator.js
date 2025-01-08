import { HomeIcon, MessageSquareCodeIcon, Settings2 } from "lucide-react";
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
import { useIsLoggedInQuery } from "../store/Slices/user";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export default function DashboardNavigator({ isLoggedIn }) {
  const { isMobile } = useSidebar();

  const { data, error, isLoading, isFetching } = isLoggedIn;

  return (
    <Sidebar side={isMobile ? "right" : "left"}>
      <SidebarHeader>
        <header className="my-[10px]">
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
        </header>

        {error && !data && (
          //error?.status !==
          // 401(
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

      <>
        <SidebarContent
          className={
            !isLoading && data && !isFetching ? "visible" : "invisible"
          }
        >
          <SidebarGroup>
            <SidebarGroupContent className="text-center space-y-4 font-poppins">
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
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    className="flex text-xl justify-center"
                  >
                    <Link to="/space">
                      <MessageSquareCodeIcon />
                      <span>Chats</span>
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
                    <Link to="/guide">
                      <Settings2 />
                      <span>Guide</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </>

      <SidebarFooter>
        {!data && !isLoading && !isFetching && (
          <>
            <Button asChild>
              <Link className="text-center" to="/auth">
                Login
              </Link>
            </Button>
            <ul className="font-roboto divide-x-2 justify-center gap-2 *:px-1 flex text-xs text-center">
              <li>
                <Link to="/about">About</Link>
              </li>

              <li>
                <Link to="/terms">Terms</Link>
              </li>
              <li>
                <Link to="/privacy">Privacy</Link>
              </li>
            </ul>
          </>
        )}
        {data && !isLoading && !isFetching && (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button variant="outline">Account</Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent>
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <Link to="/profile">Profile</Link>
                </DropdownMenuItem>

                <DropdownMenuItem>
                  <Link to="/settings">Settings</Link>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <Link>Feedback</Link>
                </DropdownMenuItem>

                <DropdownMenuItem>
                  <Link>Support</Link>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
/**
 * <h3 className="font-sans_serif font-medium text-center">
          Created by{" "}
          <a href="https://ohida.vercel.app" target="_blank" rel="noreferrer">
            Ohida
          </a>
        </h3>
          <ul className="font-roboto text-center">
            <li>
              <Link to="/about">About</Link>
            </li>

            <li>
              <Link to="/terms">Terms</Link>
            </li>
            <li>
              <Link to="/privacy">Privacy</Link>
            </li>
          </ul>
        )}
 */
