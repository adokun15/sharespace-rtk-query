export const ScoresReport = function (userReq, users = []) {
  const others = [...users];
  //if(match is on || score is zero, remove user)
  others.forEach(function (roommate, index) {
    //Correct only: Adjust others
    if (roommate?.preference.level === userReq?.level) {
      roommate.score = (roommate.score || 0) + 12;
    }
    if (roommate?.religion === userReq?.religion) {
      roommate.score = (roommate.score || 0) + 12;
    }
    if (roommate?.department === userReq?.department) {
      roommate.score = (roommate.score || 0) + 12;
    }
    if (roommate?.rent === userReq?.rent) {
      roommate.score = (roommate.score || 0) + 12;
    }
    //Correct only: Adjust others
    if (roommate?.preference?.location === userReq?.location) {
      roommate.score = (roommate.score || 0) + 12;
    }
    if (roommate?.age === userReq?.age) {
      roommate.score = (roommate.score || 0) + 12;
    }
    roommate?.habits?.forEach((habit) => {
      if (habit === userReq.habit) {
        roommate.score = (roommate.score || 0) + 2;
      }
    });
  });

  return others;
};
