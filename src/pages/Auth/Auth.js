import { useDispatch, useSelector } from "react-redux";
import Footer from "../../components/Footer";
import { useRef } from "react";
import { CreateUser } from "../../store/api/User/User";

export default function AuthenticationPage() {
  const dispatch = useDispatch();
  const { firstName, isLoading } = useSelector((state) => state?.user?.user);

  const FormRef = useRef();
  //Trigger an action; receive a token; database loads with token

  const submitform = (e) => {
    e.preventDefault();

    const formInfo = new FormData(FormRef.current);

    const email = formInfo.get("email");
    const password = formInfo.get("password");
    const name = formInfo.get("fullname");

    dispatch(CreateUser({ name, email, password }));
  };

  return (
    <>
      <main className="bg-purple-200 min-h-[80vh] py-[10vh]">
        <div className="container py-3 backdrop-blur-lg  bg-white  shadow-md min-h-40 mt-30 rounded-[1rem] ">
          <h1 className="text-5xl">Login</h1>
          {isLoading && "loading..."}
          {firstName}
          <form
            onSubmit={submitform}
            method="POST"
            ref={FormRef}
            className="*:block leading-9 *:my-4 my-5"
          >
            <label className="text-2xl">Name</label>
            <input
              required
              name="fullname"
              className="bg-purple-200 focus:bg-purple-300 py-2 px-3 caret-purple-800 outline-purple-600 rounded w-full"
              placeholder="Enter Full Name"
            />
            <label className="text-2xl">Email</label>
            <input
              required
              name="email"
              type="email"
              className="bg-purple-200 focus:bg-purple-300 py-2 px-3 caret-purple-800 outline-purple-600 rounded w-full"
              placeholder="Enter email"
            />
            <label className="text-2xl">Password</label>
            <input
              name="password"
              type="password"
              className="bg-purple-200 focus:bg-purple-300 py-1 px-3 caret-purple-800 outline-purple-600 rounded w-full"
              placeholder="Enter Password"
            />
            <button
              className="bg-purple-800 py-1 px-3 text-white rounded-xl hover:bg-purple-400 hover:text-black
          transition-colors duration-500 ease-in-out focus:translate-y-1
          "
            >
              Submit
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
}

export async function AuthAction({ request, params }) {
  /*const {email, password} = await request.body;

  const data = new FormData(request.body);
  console.log(mett);
  console.log(data);
  console.log(params);

  return null;
*/
}
