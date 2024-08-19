export function CreateProfile() {
  return (dispatch) => {
    //Collect Data return Success OR Not!
    return "Success!";
  };
}

export function EditProfile() {
  return (dispatch) => {
    //Collect Data return New state and change DB Not!
    //Asynchorously Update User Document;
    //Dispatch new State if suceess or throw an Error
  };
}

export function GetProfile() {
  return (dispatch) => {
    //Collect Data return New state and provide DB Document!
    //Asynchorously Get User Document;
    //Dispatch new State if suceess or throw an Error
  };
}
