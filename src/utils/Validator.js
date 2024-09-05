//Validate All Input Inputs

//preferemce errror
export const isPreferenceInputInValid = (query = {}) => {
  let error = "";
  if (!query.hasOwnProperty("department")) {
    error = "Department Input is empty!";
  }

  if (!query.hasOwnProperty("religion")) {
    error = "Age Input is empty!";
  }
  if (!query.hasOwnProperty("location")) {
    error = "location Input is empty!";
  }
  if (!query.hasOwnProperty("level")) {
    error = "Level Input is empty!";
  }

  if (!query.hasOwnProperty("rent")) {
    error = "Rent Input is empty!";
  }

  return error;
};

//profile errror
export const isProfileInputInvalid = (query = {}) => {
  let error = "";

  if (!query.hasOwnProperty("gender")) {
    error = "Gender Input is empty!";
  }
  if (!query.hasOwnProperty("school")) {
    error = "School Input is empty!";
  }

  return error;
};

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
