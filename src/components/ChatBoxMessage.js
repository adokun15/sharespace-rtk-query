export default function ChatBoxMessage({ user, message, timeSent }) {
  return (
    <div>
      <article
        className={`flex px-6  ${user ? "justify-end" : "justify-start"}`}
      >
        <div className="rounded-2xl w-fit pr-2 min-w-[20%] max-w-[70%] even:bg-purple-600/55 my-4 bg-purple-500/50 p-1">
          <div>
            <p className="text-xl font-[700]">@Amod</p>
          </div>
          <p className="text-wrap">{message}</p>
          <span className="text-[14px]">{timeSent}</span>
        </div>
      </article>
    </div>
  );
}
