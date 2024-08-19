import Footer from "../../components/Footer";

export default function NewsLetterPage() {
  return (
    <>
      <main>
        <header className=" relative overflow-hidden bg-purple-200 px-[20vw]  pb-[6vh] py-[2vh]">
          <div classNAME="leading-10">
            <h1 className="text-5xl my-3">NewsLetter</h1>
            <p className="text-xl">
              Subscribe to our NewsLetter. To receive weekly school updates and
              news.
            </p>{" "}
          </div>
          <div className="absolute -top-[40%] left-10 h-[3rem] bg-purple-200 w-[3rem] border-[10px] p-10 px-11 rounded-[50%] border-solid border-main_color"></div>
          <div className="absolute left-[80%] h-[3rem] bg-purple-200 w-[3rem] border-[10px] p-10 px-11 rounded-[50%] border-solid border-main_color"></div>
        </header>
      </main>
      <div className=" px-[10vw] py-[5vh] min-h-[60vh]  ">
        <h3 className="text-3xl mb-10 text-center">
          Get Daily News and Update. Sign Up for our NewsLetter now
        </h3>
        <form className="*:block flex py-7 px-10 bg-white rounded backdrop-blur-lg shadow">
          <input
            placeholder="Enter email address"
            className="px-5  md:w-4/5 w-full m-auto rounded text-main_color 
          block py-3 text-2xl outline-0 ring-offset-2 ring-4  ring-main_color shadow"
          />
          <button className="px-4 bg-main_color text-white rounded">
            Submit
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
}
