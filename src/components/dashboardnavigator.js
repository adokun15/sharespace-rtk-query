import {
  ExternalLink,
  HomeIcon,
  LogOut,
  MessageSquareCodeIcon,
  Settings2,
  User,
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useIsLoggedInQuery } from "../store/Slices/user";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faCoins,
  faPeopleGroup,
  faPerson,
  faReply,
  faToolbox,
} from "@fortawesome/free-solid-svg-icons";
import { LogoutXomponent } from "./Logout";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { FEEDBACK_URL, SUPPORT_EMAIL } from "../lib/utils";
import { DialogClose } from "@radix-ui/react-dialog";

export default function DashboardNavigator({ loadContent }) {
  const { isMobile, openMobile, setOpenMobile } = useSidebar();

  const { data, error, isLoading, isFetching, refetch } = useIsLoggedInQuery(
    null,
    {
      skip: !loadContent,
    }
  );

  //control Modal
  const closeModal = () => {
    if (isMobile) {
      setOpenMobile((p) => !p);
    }
  };

  //Link to google form
  const toFeedbackSpace = () => {
    window.location.href = FEEDBACK_URL;
    closeModal();
  };

  //Link to email
  const toMyEmail = () => {
    window.location.href = SUPPORT_EMAIL;
    closeModal();
  };

  return (
    <>
      <Sidebar
        side={isMobile ? "right" : "left"}
        onOpenChange={() => setOpenMobile((p) => !p)}
        open={openMobile}
      >
        <SidebarHeader>
          <header className="my-[10px]">
            <Link onClick={closeModal} to="/">
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

        <>
          <SidebarContent
            className={
              !isLoading && data && !isFetching && !error
                ? "visible"
                : "invisible"
            }
          >
            <SidebarGroup>
              <SidebarGroupContent className="text-center space-y-4 font-poppins">
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      className="flex text-xl justify-center"
                      asChild
                      onClick={closeModal}
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
                      onClick={closeModal}
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
                      onClick={closeModal}
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
                  <Button onClick={refetch}>Reload</Button>
                ) : (
                  <Button asChild>
                    <Link className="text-center" to="/auth">
                      Login
                    </Link>
                  </Button>
                )}
              </>
              <ul className="font-roboto divide-x-2 justify-center gap-2 *:px-1 flex text-xs text-center">
                <li>
                  <Link onClick={closeModal} to="/about">
                    About
                  </Link>
                </li>

                <li>
                  <Link onClick={closeModal} to="/terms">
                    Terms
                  </Link>
                </li>
                <li>
                  <Link onClick={closeModal} to="/privacy">
                    Privacy
                  </Link>
                </li>
              </ul>
            </>
          )}
          {!error && data && !isLoading && !isFetching && (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Button variant="outline">
                  <User />
                  Account
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent className="min-w-[13rem]">
                <DropdownMenuGroup>
                  <DropdownMenuItem onClick={closeModal}>
                    <FontAwesomeIcon icon={faPerson} />
                    <Link to="/profile">Profile</Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem>
                    <Dialog>
                      <DialogTrigger>
                        <FontAwesomeIcon icon={faCoins} />
                        <span>Buy Credit</span>
                        <FontAwesomeIcon icon={faArrowRight} />
                      </DialogTrigger>
                      <DialogContent>
                        <p>THIS IS A PAYMENT</p>
                        <DialogClose onClick={closeModal}>Close</DialogClose>
                      </DialogContent>
                    </Dialog>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />

                <DropdownMenuItem onClick={closeModal}>
                  <FontAwesomeIcon icon={faToolbox} />

                  <Link to="/settings">Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />

                <DropdownMenuGroup>
                  <Button variant="ghost" asChild onClick={toFeedbackSpace}>
                    <DropdownMenuItem className="flex justify-between">
                      <span>
                        <FontAwesomeIcon icon={faReply} />
                        Feedback
                      </span>
                      <ExternalLink />
                    </DropdownMenuItem>
                  </Button>

                  <Button variant="ghost" asChild onClick={toMyEmail}>
                    <DropdownMenuItem className="flex justify-between">
                      <span>
                        <FontAwesomeIcon
                          className="mx-2"
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
          )}
        </SidebarFooter>
      </Sidebar>
    </>
  );
}
