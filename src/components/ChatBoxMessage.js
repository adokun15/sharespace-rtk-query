export default function ChatBoxMessage({ user, message, timeSent }) {
  return (
    <div className="*:block relative">
      <article
        className={`absolute ${
          user ? "right-0" : "left-0"
        } rounded-2xl w-fit even:bg-purple-600/55 my-4 bg-purple-500/50 py-4 px-1`}
      >
        <p>{message}</p>
        <span>{timeSent}</span>
      </article>
    </div>
  );
}
