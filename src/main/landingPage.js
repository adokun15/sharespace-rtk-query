import someImage1 from "../image/undraw/undraw_Meditation_re_gll0.png";
import someImage2 from "../image/undraw/undraw_People_re_8spw.png";
import someImage3 from "../image/undraw/undraw_Secure_server_re_8wsq.png";
import someImage4 from "../image/undraw/undraw_Active_support_re_b7sj.png";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import MainNavigation from "../components/MainNavigation";
import { Button } from "../components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";
export default function LandingPage() {
  const navigate = useNavigate();
  const navigateHandler = () => navigate("/auth");

  return (
    <main className=" relative ">
      <nav className="fixed w-full py-1 bg-blue-950 text-white text-center font-bold">
        <p>Sharespace is in Beta mode</p>
      </nav>
      <MainNavigation />
      <section className=" rounded-t-2xl min-h-[80vh] md:px-[5vw] px-[4vw] py-[3vh]">
        <h1 className="text-[4rem] my-2 text-center">
          Find Roommate Not Fr-enemies
        </h1>
        <p className="text-xl  antialiased my-[1vh] text-medium w-4/5 mx-auto font-oswald ">
          Find, search, and chat up your potential roommate. create your roomate
          request post to get more student to chat you!
        </p>
        <ul className="*:space-x-2 text-slate-500 mx-auto w-3/5 block my-4 text-2xl">
          <li>
            <FontAwesomeIcon
              className="text-purple-500 font-bold"
              icon={faCheck}
            />
            <span>Send And Receive Request from other student</span>
          </li>
          <li>
            <FontAwesomeIcon
              className="text-purple-500 font-bold"
              icon={faCheck}
            />
            <span>Chat with other student</span>
          </li>
          <li>
            <FontAwesomeIcon
              className="text-purple-500 font-bold"
              icon={faCheck}
            />
            <span>Build your own roommate post request</span>
          </li>
        </ul>
        <div className="flex justify-center">
          <Button
            className="ring-offset-1 md:w-[60vw] rounded shadow py-6
          font-semibold tracking-wide bg-purple-600 text-xl "
          >
            find my match ASAP{" "}
          </Button>
        </div>
      </section>
      <section className="min-h-[80vh] md:p-[10vh] py-[4vh]">
        <header className="text-main_color text-center md:text-[48px] text-[36px] font-[700] ">
          How It Work
        </header>
        <article className="my-[10vh] text-main_color">
          <div className="my-5 block md:w-3/4 mx-auto rounded">
            <div className="overflow-hidden my-10 md:w-1/2 m-auto max-h-[50vh] ">
              <img
                className="aspect-square object-scale-down h-full w-full rounded-2xl"
                src={someImage1}
                alt={someImage1}
              />
            </div>
            <div className="md:w-1/2 md:m-10 m-4 ">
              <h1 className="text-3xl">Create Profile</h1>
              <p className="text-wrap text-xl leading-8 my-[8%]">
                Get started by completing your profile *please put correct
                information*. By doing so we are able to show you your close
                "perfect" partner
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
              <h1 className="text-3xl">Find fellow student on Explore</h1>
              <p className="text-wrap text-xl leading-8 my-[8%]">
                This is our matchingMaking section. You can pick who you want as
                a roommate, and you can also create a request post and see who
                want to be your roommate.
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
              <h1 className="text-3xl">Connect by sending request message</h1>

              <p className="text-wrap text-xl leading-8 my-[8%]">
                Finally, after the whole exploring part, you can chat up your
                roomie and conclude and other things.
              </p>
            </div>
          </div>
        </article>
      </section>
      <section>
        <div className="bg-white md:w-[50%] m-auto p-8 leading-[2.6rem] rounded-2xl shadow my-[10vh]">
          <h5 className="mb-10 text-2xl ">Hey There, ROOM-MATE FINDER</h5>

          <p className="mb-5">
            I'm Ohida the creator of ShareSpace, "why are you create this sef?",
            well i get this questions from people close to me and here is what i
            tell them
          </p>
          <ul>
            <li>Finding a trustworthy person to live with is not that easy</li>
            <li>Someone is will always try to scam you out of your money</li>
            <li>You may not be satisfied with your option</li>
          </ul>
          <p className="mb-5">
            Using ShareSpace, You get to choose who to stay with and choose
            someone you are atleast 75% close to.
          </p>
          <p className="mb-5">
            Welcome to ShareSpace, where compactibility meets conviences
          </p>
        </div>
      </section>
      <section className="min-h-[60vh] rounded-t-2xl md:p-10 p-4">
        <header className="text-main_color text-purple-500 text-center md:text-[48px] text-[36px] font-[700] ">
          Pricing
        </header>
        <p className="text-center">
          Our Pricing is Based On Credit Tokens. Credit Token can be used if you
          need to surpass a certain limit or maybe create a roommate post
          request
        </p>
        <article className="text-main_color space-y-3 my-10 md:grid lg:grid-cols-3 md:grid-cols-2 gap-4  ">
          <div className="bg-white mx-auto rounded my-2 md:my-0 shadow w-full p-5">
            <h2 className="text-3xl py-3 font-[800] ">10 Tokens</h2>
            <p className="my-2 text-xl">NGN500</p>
            <Button
              variant="outline"
              className=" bg-purple-500 text-white m-auto px-8 rounded py-2 w-[90%]  mt-4 text-xl "
            >
              Get started
            </Button>
          </div>
          <div className="bg-white mx-auto rounded my-2 md:my-0 shadow w-full p-5">
            <h2 className="text-3xl py-3 font-[800] ">100 Tokens</h2>
            <p className="my-2 text-xl">NGN4,800</p>
            <p className="my-2 ">Popular</p>
            <Button
              variant="outline"
              className=" bg-purple-500 text-white m-auto px-8 rounded py-2 w-[90%]  mt-4 text-xl "
            >
              Get started
            </Button>{" "}
          </div>
          <div className="bg-white mx-auto rounded my-2 md:my-0 shadow w-full p-5">
            <h2 className="text-3xl py-3 font-[800] ">Unlimited Tokens</h2>
            <p className="my-2 text-xl">NGN9,500</p>
            <Button
              variant="outline"
              className=" bg-purple-500 text-white m-auto px-8 rounded py-2 w-[90%]  mt-4 text-xl "
            >
              Get started
            </Button>
          </div>
        </article>
      </section>
      <section className="min-h-[80vh] my-3">
        <div className="md:w-[65%] space-y-3 w-[80%] m-auto">
          <header className="text-main_color text-center md:text-[48px] text-[36px] py-10 font-[900] ">
            Frequently Asked Questions
          </header>
          <Accordion type="single" collapsible>
            <AccordionItem value="faq-1">
              <AccordionTrigger>
                What if I don't like my matched roommate?
              </AccordionTrigger>
              <AccordionContent>
                ShareSpace offers a chat section so you can ask personal
                questions amongst each other before deciding to live together
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="faq-2">
              <AccordionTrigger>
                How does the credit token work?
              </AccordionTrigger>
              <AccordionContent>This token can be use to</AccordionContent>
            </AccordionItem>
            <AccordionItem value="faq-3">
              <AccordionTrigger>
                How does the credit token work?
              </AccordionTrigger>
              <AccordionContent>This token can be use to</AccordionContent>
            </AccordionItem>
            <AccordionItem value="faq-4">
              <AccordionTrigger>
                How does the credit token work?
              </AccordionTrigger>
              <AccordionContent>This token can be use to</AccordionContent>
            </AccordionItem>
            <AccordionItem value="faq-5">
              <AccordionTrigger>
                How does the credit token work?
              </AccordionTrigger>
              <AccordionContent>This token can be use to</AccordionContent>
            </AccordionItem>
            <AccordionItem value="faq-6">
              <AccordionTrigger>
                How does the credit token work?
              </AccordionTrigger>
              <AccordionContent>This token can be use to</AccordionContent>
            </AccordionItem>
            <AccordionItem value="faq-7">
              <AccordionTrigger>
                How does the credit token work?
              </AccordionTrigger>
              <AccordionContent>This token can be use to</AccordionContent>
            </AccordionItem>
            <AccordionItem value="faq-8">
              <AccordionTrigger>
                How does the credit token work?
              </AccordionTrigger>
              <AccordionContent>This token can be use to</AccordionContent>
            </AccordionItem>
            <AccordionItem value="faq-8">
              <AccordionTrigger>
                How does the credit token work?
              </AccordionTrigger>
              <AccordionContent>This token can be use to</AccordionContent>
            </AccordionItem>
            <AccordionItem value="faq-9">
              <AccordionTrigger>
                How does the credit token work?
              </AccordionTrigger>
              <AccordionContent>This token can be use to</AccordionContent>
            </AccordionItem>
            <AccordionItem value="faq-10">
              <AccordionTrigger>
                Is my data safe with SpaceSpace
              </AccordionTrigger>
              <AccordionContent>
                Absolutely, ShareSpace uses advanced encryption an security
                protocol to ensure that your personal information is protected
                at all times. your data is only used for the purpose of matching
                you with a compactible roommate
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>
      <section className="my-10 min-h-[50vh] p-4 md:p-10 tracking-normal w-4/5 mx-auto leading-[3.4rem] shadow-inner">
        <div>
          <h2 className="md:text-[48px] text-[36px] text-main_color text-center md:mx-[20vh] mx-2 my-4">
            Find your perfect roommate today with ShareSpace. Sign Up now and
            start your journey towards stress-free living.
          </h2>

          <div className="flex justify-center">
            <Button
              className="ring-offset-1 md:w-[60vw] rounded shadow py-6
          font-semibold tracking-wide bg-purple-600 text-xl "
            >
              find my match
            </Button>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
