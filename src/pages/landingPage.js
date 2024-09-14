import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import someImage1 from "../image/undraw/undraw_Meditation_re_gll0.png";
import someImage2 from "../image/undraw/undraw_People_re_8spw.png";
import someImage3 from "../image/undraw/undraw_Secure_server_re_8wsq.png";
import someImage4 from "../image/undraw/undraw_Active_support_re_b7sj.png";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { useAuthorizeMutation } from "../store/Slices/user";
export default function LandingPage() {
  const navigate = useNavigate();
  const navigateHandler = () => navigate("/auth");

  const [authorize, { isLoading }] = useAuthorizeMutation();

  const triggerDemoLogin = async () => {
    await authorize({
      mode: "login",
      email: "kunleamos100@gmail.com",
      password: "amos2005",
    })
      .unwrap()
      .then((data) => {
        //Control Navigate
        if (!data) return;
        if (data === "dashboard") {
          navigate("/dashboard");
        }
      })
      .catch((e) => console.error(e?.message));
  };

  return (
    <main className="box-content ">
      <section className="bg-purple-300 rounded-t-2xl min-h-[80vh] md:px-[10vw] px-[4vw] py-[10vh]">
        <h1 className="text-5xl my-[5vh]  text-center">
          Find Your Perfect Roommate Match with ShareSpace
        </h1>
        <article className="text-2xl antialiased my-[10vh] text-center font-oswald leading-10">
          <p>ShareSpace collects detailed data to ensure you are paired with</p>
          <p>
            a highly compatible roommate, minimizing conflicts and enhancing
            your
          </p>
          <p>living experience</p>
        </article>
        <button
          onClick={triggerDemoLogin}
          className="block px-4 m-auto rounded-full w-[50vw] ring-offset-1 ring-main_color ring-2 py-4 text-xl bg-main_color text-white"
        >
          {isLoading ? "..." : "Try our Demo"}
        </button>
      </section>
      <section className="min-h-[80vh] md:p-[10vh] py-[4vh]">
        <header className="text-main_color text-center md:text-[48px] text-[36px] font-[700] ">
          How It Work
        </header>
        <article className="my-[10vh] text-main_color">
          <div className="my-5 md:flex block md:w-3/4 mx-auto rounded">
            <div className="overflow-hidden my-10 md:w-1/2 m-auto max-h-[50vh] ">
              <img
                className="aspect-square object-scale-down h-full w-full rounded-2xl"
                src={someImage1}
                alt={someImage1}
              />
            </div>
            <div className="md:w-1/2 md:m-10 m-4 ">
              <h1 className="text-3xl">Advanced Compactibility</h1>
              <p className="text-wrap text-xl leading-8 my-[8%]">
                ShareSpace utilizes a comprehensive data collection method to
                understand your personality , preferences, and lifestyle,
                ensuring you are paired ith a roomate who complements your way
                of living. Say goodbye to mismatched roommates and hello to
                harmonious living.
              </p>
            </div>
          </div>
          <div className="my-5 md:flex block md:flex-row-reverse md:w-3/4 mx-auto rounded">
            <div className="overflow-hidden my-10 md:w-1/2 m-auto max-h-[50vh] ">
              <img
                className="aspect-square object-scale-down h-full w-full rounded-2xl"
                src={someImage2}
                alt={someImage2}
              />
            </div>
            <div className="md:w-1/2 md:m-10 m-4">
              <h1 className="text-3xl">User-Friendly Interface</h1>
              <p className="text-wrap text-xl leading-8 my-[8%]">
                Our platform features an intuitive and user-friendly, making it
                easy for students to navigate through the roommate matching
                process from signing up to finding your perfect roommate,
                ShareSpace ensures a seamless experience
              </p>
            </div>
          </div>
          <div className="my-5 md:flex block md:w-3/4 mx-auto rounded">
            <div className="overflow-hidden my-10 md:w-1/2 m-auto max-h-[50vh] ">
              <img
                className="aspect-square object-scale-down h-full w-full rounded-2xl"
                src={someImage3}
                alt={someImage3}
              />
            </div>

            <div className="md:w-1/2 md:m-10 m-4">
              <h1 className="text-3xl">Secure and Private</h1>

              <p className="text-wrap text-xl leading-8 my-[8%]">
                Your data privacy is our top priority ShareSpace employs
                state-of-the-art security measures to protect your personal
                information. Rest assured, your data is only used to enhance
                your roommate matching experience and is kept completely
                confidential
              </p>
            </div>
          </div>
          <div className="my-5 md:flex block  flex-row-reverse md:w-3/4 mx-auto rounded">
            <div className="overflow-hidden my-10 md:w-1/2 m-auto max-h-[50vh] ">
              <img
                className="aspect-square object-scale-down h-full w-full rounded-2xl"
                src={someImage4}
                alt={someImage4}
              />
            </div>
            <div className="md:w-1/2 md:m-10 m-4">
              <h1 className="text-3xl">24/7 Student Assistances</h1>
              <p className="text-wrap text-xl leading-8 my-[8%]">
                ShareSpace provides around-the-clock support to ensure a smooth
                and stress-free experience for all student. Whether you have
                questions about your match, need help resolving a conflict or
                require assistance, our dedicated support team is available
                24/7. You can reach out to us on chat or email.
              </p>
            </div>
          </div>
        </article>
      </section>
      <section className="min-h-[80vh] bg-purple-200 rounded-t-2xl md:p-10 p-4">
        <header className="text-main_color text-center md:text-[48px] text-[36px] font-[700] ">
          Pricing
        </header>
        <article className="text-main_color space-y-3 my-10 md:grid lg:grid-cols-3 md:grid-cols-2 gap-4  ">
          <div className="bg-white mx-auto rounded my-2 md:my-0 shadow w-full p-5">
            <h2 className="text-3xl py-3 font-[800] ">Basic Match Service</h2>
            <p className="my-2 text-xl">Free</p>
            <p className="text-2xl my-2">
              Essential service for finding a compatible roommate.
            </p>
            <ul className="mt-4">
              <li className="inline-block">
                <FontAwesomeIcon icon={faCheck} />
                <span className="ml-4">Basic Matching</span>
              </li>
              <li>
                <FontAwesomeIcon icon={faCheck} />
                <span className="ml-4">Profile Review</span>
              </li>
              <li>
                <FontAwesomeIcon icon={faCheck} />
                <span className="ml-4">Limited Support</span>
              </li>
            </ul>
            <button
              onClick={navigateHandler}
              className="block m-auto px-8 rounded py-2 w-[90%]  mt-4 text-xl bg-main_color text-white"
            >
              Get Now
            </button>
          </div>
          <div className="bg-white mx-auto rounded my-2 md:my-0 shadow w-full p-5">
            <h2 className="text-3xl py-3 font-[800] ">Premium Match Service</h2>
            <p className="my-2 text-xl">$5500</p>
            <p className="text-2xl my-2">
              Enhanced service with additional features.
            </p>

            <ul className="mt-4">
              <li className="inline-block">
                <FontAwesomeIcon icon={faCheck} />
                <span className="ml-4">Advanced Matching</span>
              </li>
              <li>
                <FontAwesomeIcon icon={faCheck} />
                <span className="ml-4">Profile Insights</span>
              </li>
              <li>
                <FontAwesomeIcon icon={faCheck} />
                <span className="ml-4">Priority Support</span>
              </li>
            </ul>
            <button className="block m-auto px-8 rounded py-2 w-[90%]  mt-4 text-xl bg-main_color text-white">
              Coming Soon
            </button>
          </div>
          <div className="bg-white mx-auto rounded my-2 md:my-0 shadow w-full p-5">
            <h2 className="text-3xl py-3 font-[800] ">
              Ultimate Match Service
            </h2>
            <p className="my-2 text-xl">$9500</p>
            <p className="text-2xl my-2">
              Lifetime access to premium matching features.
            </p>
            <ul className="mt-4">
              <li className="inline-block">
                <FontAwesomeIcon icon={faCheck} />
                <span className="ml-4">Lifetime Access</span>
              </li>
              <li>
                <FontAwesomeIcon icon={faCheck} />
                <span className="ml-4">Exclusive Matches</span>
              </li>
              <li>
                <FontAwesomeIcon icon={faCheck} />
                <span className="ml-4">Personalized Support</span>
              </li>
            </ul>
            <button className="block m-auto px-8 rounded py-2 w-[90%]  mt-4 text-xl bg-main_color text-white">
              Coming Soon
            </button>
          </div>
        </article>
      </section>
      <section className="min-h-[80vh] my-3">
        <header className="text-main_color text-center md:text-[48px] text-[36px] py-10 font-[900] ">
          Frequently Asked Questions
        </header>
        <div className="md:w-[65%] space-y-3 w-[80%] m-auto">
          <article className="bg-slate-200 p-5 shadow rounded">
            <h1 className="text-2xl border-b-2 border-purple-400 capitalize font-[500] font-oswald">
              What if I dont like my matched Roommate
            </h1>
            <p className=" font-oswald md:w-60% w-[80%] my-5 leading-7 text-xl">
              ShareSpace offers a trial period where you can get to know your
              matched roommate. If you find that you are noy compactible, you
              can request a rematch at no additional cost
            </p>
          </article>
          <article className="bg-slate-200 p-5 shadow rounded">
            <h1 className="text-2xl border-b-2 border-purple-400 capitalize font-[500] font-oswald">
              Is my data safe with SpaceSpace
            </h1>
            <p className="font-oswald md:w-60% w-[80%] my-5 leading-7 text-xl">
              Absolutely, ShareSpace uses advanced encryption an security
              protocol to ensure that your personal information is protected at
              all times. your data is only used for the purpose of matching you
              with a compactible roommate
            </p>
          </article>
        </div>
      </section>
      <section className="min-h-[50vh] p-4 md:p-10 tracking-normal leading-[3.4rem] bg-purple-200">
        <div>
          <h2 className="md:text-[48px] text-[36px] text-main_color text-center md:mx-[20vh] mx-2  my-4">
            Find your perfect roommate today with ShareSpace. Sign Up now and
            start your journey towards harmanious living
          </h2>

          <button
            onClick={navigateHandler}
            className="block px-4 m-auto rounded-full w-[50vw] ring-offset-1 ring-main_color ring-2 py-4 text-xl bg-main_color text-white"
          >
            Get Started
          </button>
        </div>
        <div className="bg-white md:w-[50%] m-auto p-8 leading-[2.6rem] rounded-2xl shadow my-[10vh]">
          <h5 className="mb-10 text-2xl ">Dear Students,</h5>

          <p className="mb-5">
            Finding a compactible roommate can be a daunting task, often filled
            ith uncertainty and mismatched living arrangements. At SpaceSpace,
            we understand the importance of a harmanious living environment,
            especially during your crucial academic years. Our platform is
            designed to gather in-depth data about your lifestyle and
            preferences, ensuring you are matched with a roommate who truly
            complement your way of living
          </p>

          <p className="mb-5">
            We pride ourselves on our user friendly interface and top-notch
            security measures, making the process both seamless and secure. Our
            mission is to turn the often stressful roommate search into a
            pleasant and efficient experience
          </p>
          <p className="mb-5">
            Welcome to ShareSpace, where compactibility meets conviences
          </p>
          <div className="italic font-oswald">
            <p>Warm regards,</p>
            <p>Ohida Amos,</p>
            <p>Founder, ShareSpace</p>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
