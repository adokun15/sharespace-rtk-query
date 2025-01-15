import { Button } from "../ui/button";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { Select } from "../ui/select";
import { useEditUserMutation } from "../../store/Slices/user";
export default function EditUser({ onClose, prevData }) {
  const [editUser] = useEditUserMutation();

  const handleEditUser = async (data) => {
    await editUser(data)
      .unwrap()
      .then((data) => {
        //Close modal
        onClose();

        //alert user: "changes made"
        console.log(data);
      })
      .catch((err) => {
        //alert user: "ERROR"
        console.log(err);
      });
  };
  return (
    <form>
      <Label>Which type are you?</Label>
      <Select></Select>
      <Label>School</Label>
      <Input />
      <Label>Department </Label>

      <Input />
      <Label>Level</Label>
      <Input />
      <Button onClick={handleEditUser}>Save Changes</Button>
    </form>
  );
}
