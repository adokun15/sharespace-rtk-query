import { Form } from "react-router-dom";

export default function AuthenticationPage() {
  return (
    <main>
      <p className="text-2xl">This Is An Authentication Page</p>
      <div className="container py-3 border-2 border-solid border-purple-600 shadow-md min-h-40 mt-30 rounded-[1rem] ">
        <h1 className="text-4xl">Login</h1>
        <Form method="POST" className="*:block leading-9 *:my-4 my-5">
          <label className="text-2xl">Email</label>
          <input
            required
            name="email"
            type="email"
            className="bg-purple-200 py-1 px-3 caret-purple-800 outline-purple-600 rounded w-full"
            placeholder="Enter email"
          />
          <label className="text-2xl">Password</label>
          <input
            name="password"
            type="password"
            className="bg-purple-200 py-1 px-3 caret-purple-800 outline-purple-600 rounded w-full"
            placeholder="Enter Password"
          />
          <button
            onClick={(e) => {}}
            className="bg-purple-800 py-1 px-3 text-white rounded-xl hover:bg-purple-400 hover:text-black
          transition-colors duration-500 ease-in-out focus:translate-y-1
          "
          >
            Submit
          </button>
        </Form>
      </div>
    </main>
  );
}

export async function AuthAction({ request, params }) {
  const mett = await request.method;

  const data = new FormData(request.body);
  console.log(mett);
  console.log(data);
  console.log(params);

  return null;
}
