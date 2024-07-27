import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function DashboardPage() {
  return (
    <main>
      <p className="text-2xl">This Is a Dashboard Page</p>

      <div className="container py-10 rounded-xl bg-blue-950 shadow min-h-40 text-white">
        <h3 className="text-2xl">
          Your Dashboard, <span className="inline-block">Daniel</span>
          <span>
            <FontAwesomeIcon icon={"face-explode"} />
          </span>
        </h3>

        <article className="flex text-xl my-10 gap-x-8">
          <div>
            <p>Email</p>
            <p>UserName</p>
          </div>
          <div>
            <p>someemail@gmail.com</p>
            <p>someusername</p>
          </div>
        </article>
      </div>
      {/*
      <div className="container py-10 my-10 rounded-xl bg-blue-950 shadow min-h-40 text-white">
        <h1 className="text-4xl">OverView</h1>
        <div className="columns-auto md:flex my-10 gap-10 justify-between">
          <div className="bg-blue-800 shadow-blue-400  w-full">
            <p className="text-3xl">Chats</p>
          </div>

          <div className="bg-blue-800 text-white py-2 px-3 shadow-blue-400  w-full">
            <p className="text-3xl">Events</p>
            <button>View </button>
          </div>
          <div className="bg-blue-800 shadow-blue-400 w-full">
            <p>Roomie Finder</p>
          </div>
        </div>
      </div>
        */}
    </main>
  );
}
