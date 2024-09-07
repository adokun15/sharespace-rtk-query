export const ScoresReport = function (userReq, users = []) {
  console.log(userReq);
  console.log(users);
  const others = [...users];
  //if(match is on || score is zero, remove user)

  //Correct only: Adjust others

  //Age
  let agegap = userReq?.age?.split("-");
  const minAge = agegap && agegap[0];
  const maxAge = agegap && agegap[1];

  if (!userReq?.age?.includes("-")) {
    agegap = +userReq?.age;
  }

  const roommateAge = (date) => {
    if (!date) return;
    const newDate = new Date(date);
    const Date_ = new Date();
    return Date_.getFullYear() - newDate.getFullYear();
  };

  const roomateBudget = (b) => {
    if (!b) return;
    let rentGap = b && b?.split("-");
    const minRent = rentGap && +rentGap[0];
    const maxRent = rentGap && +rentGap[1];

    return rentGap ? { minRent, maxRent } : null;
  };
  others.forEach(function (roommate, index) {
    if (
      roommate?.preference &&
      roommate?.preference?.level === userReq?.level
    ) {
      roommate.score = (roommate.score || 0) + 15;
    }
    if (
      roommate?.preference &&
      roommate?.preference?.religion === userReq?.religion
    ) {
      roommate.score = (roommate.score || 0) + 15;
    }
    if (
      roommate?.preference &&
      roommate?.preference?.department === userReq?.department
    ) {
      roommate.score = (roommate.score || 0) + 15;
    }
    if (
      roomateBudget(roommate?.preference?.rent).maxRent <= +userReq?.rent &&
      roomateBudget(roommate?.preference?.rent).minRent >= +userReq?.rent
    ) {
      roommate.score = (roommate.score || 0) + 15;
    }
    //Correct only: Adjust others
    if (
      roommate?.preference &&
      roommate?.preference?.location === userReq?.location
    ) {
      roommate.score = (roommate.score || 0) + 15;
    }
    if (
      minAge &&
      roommateAge(roommate?.age) >= +minAge &&
      maxAge &&
      roommateAge(roommate?.age) <= maxAge
    ) {
      roommate.score = (roommate.score || 0) + 15;
    }
    if (typeof agegap === "number" && agegap === roommateAge(roommate?.age)) {
      roommate.score = (roommate.score || 0) + 10;
    }
  });

  return others;
};
