import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useGetNoticesQuery } from "../store/Slices/Space";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import Button from "../UI/Button";
import { Link } from "react-router-dom";
import { NoticeDate } from "../utils/TimeHandler";

import { SortListByDate } from "../utils/ListHandler";

export const NoticeList = ({ id }) => {
  const { data, isFetching, isError, error, refetch, isLoading } =
    useGetNoticesQuery(id);

  if (isLoading || isFetching) {
    return (
      <p className="mt-[10vh] text-center text-2xl">
        <FontAwesomeIcon
          className="  animate-spin text-purple-500"
          icon={faSpinner}
        />
      </p>
    );
  }

  if (isError) {
    return (
      <>
        <p className="text-center text-xl text-red-600">{error?.message}</p>
        <Button elclass="block m-auto my-3" trigger={refetch} outline={true}>
          Try Again
        </Button>
      </>
    );
  }

  if (!data || data.length === 0) {
    return <p className="my-5 text-center">No Notifications yet</p>;
  }

  const notices = SortListByDate(data);

  return (
    <div className="h-[20vh] mt-1 overflow-y-scroll rounded transition-all mb-4 py-3 space-y-2 ">
      {notices.map((notification) => (
        <div className=" bg-slate-100 list-none py-4 px-1 rounded pl-3">
          {notification?.type === "invites" && (
            <li className="capitalize">
              <p className="text-pretty">
                you have an invite from
                <span className="font-bold mx-1 font-sans_serif">
                  {notification.from}
                </span>
                to become their roommate.
                <Link
                  to="roommates"
                  className="text-purple-500 underline-offset-1"
                >
                  View spaces
                </Link>
              </p>
              <p className="text-end mr-[2vw] text-[12px]">
                {NoticeDate(notification.timeSent)}
              </p>
            </li>
          )}
          {notification?.type === "reply" && (
            <li className="capitalize">
              <p className="text-pretty">
                <span className="font-bold mx-1 font-sans_serif">
                  {notification?.from}
                </span>
                has
                <span className="font-bold mx-1 font-sans_serif">
                  {notification.response}
                </span>
                to become their roommate.
              </p>
              <p className="text-end mr-[2vw] text-[12px]">
                {NoticeDate(notification.timeSent)}
              </p>
            </li>
          )}
          {notification?.type === "left_space" && (
            <li className="capitalize">
              <p className="text-pretty">
                <span className="font-bold mx-1 font-sans_serif">
                  {notification.from}
                </span>
                has Leave the space.
              </p>
              <p className="text-end mr-[2vw] text-[12px]">
                {NoticeDate(notification.timeSent)}
              </p>
            </li>
          )}
          {notification?.type === "sent_off" && (
            <li className="capitalize">
              <p className="text-pretty">
                <span className="font-bold mx-1 font-sans_serif">
                  {notification.from}
                </span>
                has delete Chat Space!.
              </p>
              <p className="text-end mr-[2vw] text-[12px]">
                {NoticeDate(notification.timeSent)}
              </p>
            </li>
          )}
          {notification?.type === "request" && (
            <li className="capitalize">
              <p className="text-pretty">
                Request has been sent to
                <span className=" mx-1 font-bold font-sans_serif">
                  {notification.to}.
                </span>
                Awaiting their response.
              </p>
              <p className="text-end mr-[2vw] text-[12px]">
                {NoticeDate(notification.timeSent)}
              </p>
            </li>
          )}
        </div>
      ))}
    </div>
  );
};
