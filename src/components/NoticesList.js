import { useGetNoticesQuery } from "../store/Slices/Space";
import { cookie_id } from "../utils/authHandler";

export const NoticeList = () => {
  const { data, isError, error, isLoading } = useGetNoticesQuery(cookie_id);

  if (isLoading) {
    return <p>loading...</p>;
  }

  if (isError) {
    return <p>{error?.message}</p>;
  }

  if (!data || data.length === 0) {
    return <p>No Notifications yet</p>;
  }

  return (
    <div>
      {data.map((notification) => (
        <div>
          {notification?.type === "invites" && (
            <li>
              you have an invite from {notification.from} to become their
              roommate.
            </li>
          )}
          {notification?.type === "reply" && (
            <li>
              {notification.from} {notification.response} to become their
              roommate.
            </li>
          )}
        </div>
      ))}
    </div>
  );
};
