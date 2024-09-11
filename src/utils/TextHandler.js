/*import cryptoJs from "crypto-js";
import { secret } from "./secret";

export const decryptTexts = (list) => {
  const decryptedText = list.map((obj) => {
    // const newText = cryptoJs.AES.decrypt(obj.chat, secret);
    //const str = newText.toString(cryptoJs.enc.Utf8);
    const str = obj.chat || obj.message;
    return { message: str + "fsd", ...obj };
  });

  return decryptedText;
};
*/
