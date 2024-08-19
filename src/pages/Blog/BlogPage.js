import Footer from "../../components/Footer";

export default function BlogPage() {
  return (
    <main className="">
      <header className=" relative overflow-hidden bg-purple-200 px-[20vw]  pb-[6vh] py-[2vh]">
        <div classNAME="leading-10">
          <h1 className="text-5xl my-3">Blogs</h1>
          <p className="text-xl">Check out our blogs post </p>
        </div>
        <div className="absolute -top-[40%] left-10 h-[3rem] bg-purple-200 w-[3rem] border-[10px] p-10 px-11 rounded-[50%] border-solid border-main_color"></div>
        <div className="absolute left-[80%] h-[3rem] bg-purple-200 w-[3rem] border-[10px] p-10 px-11 rounded-[50%] border-solid border-main_color"></div>
      </header>

      <article className="px-[25vw] my-6  ">
        <div className="py-7 rounded bg-purple-100 backdrop-blur-lg shadow px-10">
          <h1 className="text-3xl underline">
            Navigating Your First Year: A Complete Guide to University Life
          </h1>
        </div>
        <div className="py-7 rounded my-5 bg-purple-100 backdrop-blur-lg shadow px-10">
          <h1 className="text-3xl underline">
            School Hostel Essentials: Everything You Need to Know About Campus
            Living
          </h1>
        </div>
        <div className="py-7 rounded bg-purple-100 backdrop-blur-lg shadow px-10">
          <h1 className="text-3xl underline">
            Finding the Perfect University Accomodation: A Student's Guide
          </h1>
        </div>
      </article>
      <Footer />
    </main>
  );
}
