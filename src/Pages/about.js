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
    <main className=" w-full px-4 mx-auto shadoww">
      <h1 className="md:text-[3.2rem] text-[2.7rem] font-semibold font-sans_serif">
        About Us
      </h1>

      <Tabs defaultValue="about">
        <TabsList>
          <TabsTrigger value="about">About</TabsTrigger>
          <TabsTrigger value="faq">Faqs</TabsTrigger>
        </TabsList>
        <TabsContent value="about">
          <div className="space-y-3">
            <h2 className="text-2xl font-semibold">Our Story</h2>
            <p>
              Sharespace was created by a student in the Kwara State University.
              I created ShareSpace to help fellow student who has trouble
              finding compactible roomate by using our platform, the risk of
              choosing a wrong roommate is LESS. Sharespace is a social platform
              that connect individuals seeking roommate by:
            </p>
            <ul>
              <li>Check out Explore page and send message to other user</li>
              <li>Use our Find match features to see specific roomates</li>
              <li>
                Can't find your match. then create your own roomate post to
                receive request from different user
              </li>
            </ul>
            <p>
              The fee for the use of our service is based credit token system
            </p>
          </div>
        </TabsContent>
        <TabsContent value="faq">
          <div>
            <Accordion type="single" collapsible>
              <AccordionItem value="faq-1">
                <AccordionTrigger>
                  What if I don't like my matched roommate?
                </AccordionTrigger>
                <AccordionContent>
                  You can simply just leave the chat. Emails are not exposed so
                  you don't have to worry about them reaching out to you by
                  force.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-2">
                <AccordionTrigger>
                  Is my data safe with SpaceSpace
                </AccordionTrigger>
                <AccordionContent>
                  All personal information are secure and encrypted to our
                  database. Also, payments are handled 100% by paystack.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-3">
                <AccordionTrigger>
                  Does ShareSpace verify its users?
                </AccordionTrigger>
                <AccordionContent>
                  User are verified by Email first, before they can proceed to
                  use our service. And when payment is madefor the purchase of
                  token, user's real name on their card are used to confirm the
                  actual name they submit if it does not match their account is
                  immediate locked out.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-4">
                <AccordionTrigger>
                  What should I do if I suspect fraudulent activity?{" "}
                </AccordionTrigger>
                <AccordionContent>
                  Reach out to our support and report the user!
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-5">
                <AccordionTrigger>
                  Do I pay rent through ShareSpace?{" "}
                </AccordionTrigger>
                <AccordionContent>
                  No, ShareSpace serves primarily as a connection platform. Rent
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
                  ShareSpace is for uni students looking for potential roommate.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-8">
                <AccordionTrigger>
                  Are there any hidden charges for using ShareSpace?
                </AccordionTrigger>
                <AccordionContent>
                  No, ShareSpace make use of credit token system. You make
                  payment through Paystack in exchange of credit, which you can
                  use to find, explore, create a roomate post etc
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-9">
                <AccordionTrigger>
                  How do I contact potential roommates?
                </AccordionTrigger>
                <AccordionContent>
                  ShareSpace offers a chat section so you can ask personal
                  questions amongst each other before deciding to live together.
                  This can only happen if your potential roommate accept you
                  request
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-10">
                <AccordionTrigger>
                  Can I block or report someone on the platform?
                </AccordionTrigger>
                <AccordionContent>
                  Yes, if someone violating any our terms or posting irrelevant
                  content to have our permission to report. when you are
                  chatting the person is trying to scam you, you can block,
                  leave or report the person
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
                    <li>10Credits - NGN500</li>
                    <li>150Credits - NGN4800(most popular)</li>
                    <li>Free for life - NGN10,000</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </TabsContent>
      </Tabs>
    </main>
  );
}
