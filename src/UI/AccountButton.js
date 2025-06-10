import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";

import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";


import {
  ExternalLink,
  LogOut,
  User,
} from "lucide-react";


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCoins,
  faPeopleGroup,
  faPerson,
  faReply,
  faToolbox,
} from "@fortawesome/free-solid-svg-icons";
//import { LogoutXomponent } from "../components/Logout";
import { FEEDBACK_URL, SUPPORT_EMAIL } from "../lib/utils";


export default function AccountButton(){    
      //Link to google form
      const toFeedbackSpace = () => {
        window.location.href = FEEDBACK_URL;
      };
    
      //Link to email
      const toMyEmail = () => {
        window.location.href = SUPPORT_EMAIL;
      };
    
    return    <DropdownMenu>
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
                
                  <DropdownMenuItem>
                    <FontAwesomeIcon icon={faPerson} />
                    <Link to="/profile">My Chats</Link>
                  </DropdownMenuItem>
                 
                <DropdownMenuSeparator />
               
                  <DropdownMenuItem>
                    <FontAwesomeIcon icon={faCoins} />
                    <Link to="/profile?credit=true">
                      <span>My Awesome Profile</span>
                    </Link>
                  </DropdownMenuItem>
               
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
                        Give Feedback
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
                
                <DropdownMenuItem>
                <Button variant='primary' className='w-full rounded-xl'>Buy Credits</Button>
                </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
         
}