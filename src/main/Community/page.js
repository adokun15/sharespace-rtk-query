import { Link } from "react-router-dom";
import { Button } from "../../components/ui/button";
import {
  COMMUNITY_LINK,
  lIVE_CLIENT_WEB_URL,
  SUPPORT_PHONE,
} from "../../lib/utils";

//Show user options to join WhatsApp Community or
export default function Community() {
  const ShareCommunity = async () => {
    const text = `
      Hi, we are currently building a Whatsapp community targeted
      toward students looking for roommates.
      Join the community  if you are looking for a roommate or forward to a friend that might be in need it.

       ${COMMUNITY_LINK}
      `;

    const title = "Sharespace Community";

    try {
      await navigator.share({
        title,
        url: COMMUNITY_LINK,
        text,
      });
    } catch (error) {
      const encoded = encodeURIComponent(text);
      window.open(`https://api.whatsapp.com/send?text=${encoded}`, "_blank");
    }
  };

  return (
    <div className="space-y-6 font-poppins max-w-2xl">
      <h1 className="text-[24px] font-[600]">Join the Community</h1>
      <p className="font-medium">For Students</p>
      <p>
        Our community is more engaging with people, join now and find fellow
        peers with similar issues, It is a growing community, whether you are
        looking for shared accomodation or just a roomate, this space is for
        you.
      </p>
      <article className="flex gap-3 items-center">
        <Button
          onClick={ShareCommunity}
          variant="ghost"
          className="ring-green-800 ring-2 px-6 py-4 block h-fit text-[20px] rounded-full"
        >
          Invite Peer
        </Button>
        <Button
          variant=""
          className="bg-green-800 md:px-6 py-2  text-[16px] md:py-4 block h-fit md:text-[20px] rounded-full"
        >
          <Link to={COMMUNITY_LINK} target="_blank">
            Meet Peers
          </Link>
        </Button>
      </article>
      <p className="font-medium">For Volunteers</p>
      <p>
        We need more hands on skills we are not very good in, so we are looking
        for volunteers who can offer their skills in the following fields:
      </p>
      <ul className="pl-8">
        <li className="list-disc">Community Manager</li>
        <li className="list-disc">Product Designer</li>
        <li className="list-disc">Motion Frontend Developer (tailwindcss)</li>
        <li className="list-disc">Social Media Manager</li>
        <li className="list-disc">Backend Developer(Nodejs,Postgresql)</li>
      </ul>
      <p className="text-slate-400">
        If you also want to contribute and your field is not amongst the one
        list, still you can reach out to me
      </p>
      <Button className=" md:px-6 py-2 text-[16px] md:py-4  block h-fit md:text-[20px] rounded-full">
        <Link to={SUPPORT_PHONE} target="_blank">
          Talk to me
        </Link>
      </Button>
    </div>
  );
}
