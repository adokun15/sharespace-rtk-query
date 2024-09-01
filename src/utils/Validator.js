//Validate All Input Inputs

//preferemce errror
//profile errror
//username errror

//match errror
export const isMatchInputInValid = (query = {}) => {
  let error = "";

  if (!query.hasOwnProperty("level")) {
    error = "Level Input is empty!";
  }
  if (!query.hasOwnProperty("religion")) {
    error = "Religion Input is empty!";
  }
  if (!query.hasOwnProperty("department")) {
    error = "Department Input is empty!";
  }
  if (!query.hasOwnProperty("location")) {
    error = "location Input is empty!";
  }
  if (!query.hasOwnProperty("age")) {
    error = "age Input is empty!";
  }

  return error;
};
