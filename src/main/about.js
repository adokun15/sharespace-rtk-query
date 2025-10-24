import {
  TabsTrigger,
  Tabs,
  TabsContent,
  TabsList,
} from "../components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";

export default function About() {
  return (
    <main className="mb-6 w-full px-4 mx-auto shadoww">
      <h1 className="md:text-[3.2rem] text-[2.7rem] font-semibold font-sans_serif">
        About Us
      </h1>

      <Tabs defaultValue="about">
        <TabsList>
          <TabsTrigger value="about">About</TabsTrigger>
          <TabsTrigger value="faq">Faqs</TabsTrigger>
        </TabsList>
        <TabsContent value="about">
          <div className="space-y-3 my-6">
            <h2 className="text-muted text-3xl font-semibold font-sans_serif ">
              Our mission
            </h2>
            <p className="text-xl font-poppins">
              <b>ShareSpace</b> was created because we believe finding the right
              place to live and the right people to live with shouldn't be
              stressful. Our mission is to simplify the process of connecting
              students with trusted roommates and shared accomodations that suit
              their needs and preferences.
            </p>
            <h2 className="mt-4 text-muted text-3xl font-semibold font-sans_serif ">
              What we do
            </h2>

            <p className="text-xl font-poppins">
              <b>Sharespace</b> is a platform designed exclusively for
              university students. We provide a safe, user-friendly space where
              student can :
            </p>
            <ul className="list-disc font-poppins *:ml-4">
              <li>Discover available shared accomodations</li>
              <li>Connect with potential roommates</li>
              <li>Create your own roomate post</li>
            </ul>
            <h2 className="mt-4 text-muted text-3xl font-semibold font-sans_serif ">
              Our Commitment
            </h2>
            <p className="text-xl font-poppins">
              We are dedicated to continually improving the platform and adding
              requested features to ensuring that students have a seamless
              experience while finding a home with roommate that feels right.
            </p>
          </div>
        </TabsContent>
        <TabsContent value="faq">
          <div>
            <Accordion className="" type="single" collapsible>
              <AccordionItem value="faq-1">
                <AccordionTrigger>
                  What if I don't like my matched roommate?
                </AccordionTrigger>
                <AccordionContent>
                  You can simply just leave the <b>chat</b>. Emails are not
                  exposed so you don't have to worry about them reaching out to
                  you without your consent.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-2">
                <AccordionTrigger>
                  Is my data safe with SpaceSpace?
                </AccordionTrigger>
                <AccordionContent>
                  All personal information are secure and encrypted to our
                  database.{" "}
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-3">
                <AccordionTrigger>
                  Does ShareSpace verify its users?
                </AccordionTrigger>
                <AccordionContent>
                  User are verified by Email first, before they can proceed to
                  use our service.{" "}
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-4">
                <AccordionTrigger>
                  What should I do if I suspect fraudulent activity?{" "}
                </AccordionTrigger>
                <AccordionContent>
                  Reach out to our support or report the user!
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-5">
                <AccordionTrigger>
                  Do I pay rent through ShareSpace?{" "}
                </AccordionTrigger>
                <AccordionContent>
                  No, ShareSpace serves primarily as a connection platform. rent
                  payments handled directly between roomates or landlords.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-6">
                <AccordionTrigger>
                  How does ShareSpace match me with potential roommates?{" "}
                </AccordionTrigger>
                <AccordionContent>
                  Sharespace uses your preferences, such as budget, location,
                  and school info, to suggest compatible roommates.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-7">
                <AccordionTrigger>Who can use ShareSpace?</AccordionTrigger>
                <AccordionContent>
                  ShareSpace is for university students looking for potential
                  roommate.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-8">
                <AccordionTrigger>
                  Are there any hidden charges for using ShareSpace?
                </AccordionTrigger>
                <AccordionContent>
                  No, ShareSpace make use of credit token system. You make
                  payment through Paystack in exchange of credit, which you can
                  use to find, explore, create a roomate post etc.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-9">
                <AccordionTrigger>
                  How do I contact potential roommates?
                </AccordionTrigger>
                <AccordionContent>
                  ShareSpace offers a chat session, so you can ask personal
                  questions amongst each other before deciding to live together.
                  This can only happen if your potential roommate accepts your
                  request.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-10">
                <AccordionTrigger>
                  Can I block or report someone on the platform?
                </AccordionTrigger>
                <AccordionContent>
                  Yes, if someone is violating any our terms or posting
                  irrelevant contents. While chatting, if the other person is
                  trying to scam you, you can leave the chat or report the
                  person.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-11">
                <AccordionTrigger>
                  Is there a fee to use ShareSpace?
                </AccordionTrigger>
                <AccordionContent>
                  The use our amazing service we collect credit tokens which
                  availabale at:
                  <ul>
                    <li>
                      <p>60 Credits | NGN100</p>
                    </li>
                    <li>
                      <p>500 Credits | NGN400</p>
                    </li>
                    <li>
                      <p>1000 Credits | NGN700</p>
                    </li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </TabsContent>
      </Tabs>
      <p className="my-5 italic">
        Feel Free to reach out to
        <a
          className="mx-1 font-bold text-primary underline"
          href="mailto:contact@danielamos.com"
          target="_blank"
          rel="noreferrer"
        >
          me
        </a>{" "}
        for any questions
      </p>
    </main>
  );
}
