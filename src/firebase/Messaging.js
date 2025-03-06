import { getToken } from "firebase/messaging";
import { db, messaging } from "./init";
import { doc, setDoc } from "firebase/firestore";

const vapidKey = "";

//save device--- [new post, promo%updates], [chat room], responds for proposal

export const getDevicePermission = async (uid) => {
  //Request for Permission
  const permission = await Notification.requestPermission();

  if (permission === "granted") {
    await saveMessagingDeviceToken(uid);
  } else {
    throw new Error(
      "Could not get permission to send notication. kindly grant the app permission to send Notification"
    );
  }
};

export const saveMessagingDeviceToken = async (uid) => {
  const msg = await messaging();
  const fcmToken = await getToken(msg, { vapidKey });

  if (fcmToken) {
    //save to db
    const tokenRef = doc(db, "fcmToken", uid);
    //Overwrites previous token
    await setDoc(tokenRef, { fcmToken });
  } else {
    //Request for permission
  }
};
