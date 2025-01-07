//import { useIsLoggedInQuery } from "../store/Slices/user"
import { Button } from "./ui/button";

export default function InviteModal({ roomieId, onClose, triggerSingleModal }) {
  //check if user is logged in
  //const { data } = useIsLoggedInQuery()

  // const handleSubmit =()=>{
  //Check if user is logged in triggermodal else redirect to Login

  //Lock Modal
  //}
  return (
    <main>
      <h1>Send a Proposals</h1>
      <p>Send Ridwan a request he is looking for a roommate to live with!</p>
      <div>
        <Button variant="close">Close</Button>
        <Button>Send Proposal</Button>
      </div>
    </main>
  );
}
