export const ScoresReport = function (userReq, users = []) {
  const others = [...users];
  //if(match is on || score is zero, remove user)

  //Correct only: Adjust others

  //Age
  let agegap = userReq?.age?.split("-");
  const minAge = agegap && agegap[0];
  const maxAge = agegap && agegap.length > 1 && agegap[1];

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

    if (!b.includes("-")) {
      return {
        minRent: 0,
        maxRent: 0,
      };
    }
    let rentGap = b?.split("-");
    if (rentGap.length <= 1) return null;

    const minRent = rentGap && +rentGap[0];
    const maxRent = rentGap && +rentGap[1];

    return { minRent, maxRent };
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

    if (+roommate?.preference?.rent === 120 && +userReq?.rent === 120) {
      roommate.score = (roommate.score || 0) + 15;
    }
    if (+roommate?.preference?.rent === 460 && +userReq?.rent === 460) {
      roommate.score = (roommate.score || 0) + 15;
    }
    //Correct only: Adjust others
    if (
      roommate?.preference &&
      roommate?.preference?.location === userReq?.location
    ) {
      roommate.score = (roommate.score || 0) + 15;
    }
    if (+minAge === 17 && roommateAge(roommate?.age) === minAge) {
      roommate.score = (roommate.score || 0) + 15;
    }

    if (+minAge === 27 && roommateAge(roommate?.age) === minAge) {
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
