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
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "../components/ui/breadcrumb";
import { Button } from "../components/ui/button";
import { COMMUNITY_LINK, SUPPORT_PHONE } from "../lib/utils";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <main className="mb-6 space-y-6 w-full px-4 mx-auto shadoww">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/about">About Us</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <Tabs defaultValue="about">
        <TabsList>
          <TabsTrigger value="about">About</TabsTrigger>
          <TabsTrigger value="faq">Faqs</TabsTrigger>
        </TabsList>
        <TabsContent value="about">
          <div className="space-y-6 font-poppins mt-5  max-w-2xl">
            <h1 className="font-[600] ">How Sharespace came into existent?</h1>
            <p>
              I started <span className="text-primary">ShareSpace</span> as a
              mini project back <i>2024</i> toward the year ending, as means to
              increase my coding knowledge and add it to my{" "}
              <span className="text-primary">
                <Link to="https://ohida.vercel.app">porfolio</Link>
              </span>{" "}
              then after <i>2weeks</i>, I wrapped up and move on.
            </p>

            <p>
              In <i>February 2025</i>, I tried to launch it after making a few
              tweaks, but I couldn't get people to use it as at the time and
              there was no funds for Ad, and it was already at the end of the
              first semester, so I discouraged and left it again.
            </p>

            <p>
              In <i>October 2025</i>, This time things were different, hostels
              fees are crazy and student are looking for roommate desperately,
              so I took it upon myself to bring back{" "}
              <span className="text-primary">ShareSpace</span> and provide
              students with the <b>easiest filtering tool</b> to find roommate.
            </p>

            <h1 className="font-[600] ">How is it going now?</h1>
            <p>
              Currently, I just launch with the minimal features that it not too
              complex, even a toddler can use it:
            </p>
            <ul className="pl-8">
              <li className="list-disc">Creating request posts</li>
              <li className="list-disc">
                Viewing all available roommate listings
              </li>
              <li className="list-disc">Filtering request(Working on it)</li>
            </ul>

            <p className="my-5 italic">
              I wish to add more features in the future, so i want to hear your
              feedback
              <a
                className="mx-1 block font-bold text-primary underline"
                href={SUPPORT_PHONE}
                target="_blank"
                rel="noreferrer"
              >
                Talk to Ohida
              </a>{" "}
            </p>
          </div>
        </TabsContent>
        <TabsContent value="faq">
          <div>
            <Accordion className="font-poppins" type="single" collapsible>
              <AccordionItem value="faq-2">
                <AccordionTrigger>
                  Is my data safe with SpaceSpace?
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-[16px]">
                    All personal information are secure and encrypted to our
                    database. This may be deleted by you any time.
                  </p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-3">
                <AccordionTrigger>
                  Does ShareSpace verify its users?
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-[16px]">
                    Users are verified by email, before they can proceed to use
                    our service.{" "}
                  </p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-4">
                <AccordionTrigger>
                  What should I do if I suspect fraudulent activity?{" "}
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-[16px]">
                    Reach out to our support or report the user!
                  </p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-5">
                <AccordionTrigger>
                  Do I pay rent through ShareSpace?{" "}
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-[16px]">
                    No, ShareSpace serves primarily as a connection platform.
                    Rent payments handled directly between roomates or
                    landlords.
                  </p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-7">
                <AccordionTrigger>Who can use ShareSpace?</AccordionTrigger>
                <AccordionContent>
                  <p className="text-[16px]">
                    ShareSpace is for university students looking for potential
                    roommate.
                  </p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-8">
                <AccordionTrigger>
                  Are there any hidden charges for using ShareSpace?
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-[16px]">
                    No, you can use our service for free, but it limited to some
                    certain feature, to use this feature, you will have to
                    upgrade to a one-time pro plan.
                  </p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-9">
                <AccordionTrigger>
                  How do I contact potential roommates?
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-[16px]">
                    Each post seen on the explore page, has a 'Chat' button, the
                    button leads directly to the user Whatsapp contact further
                    discussions can be made, if the user is suspicious, kindly
                    report their account!
                  </p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-10">
                <AccordionTrigger>
                  Can I block or report someone on the platform?
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-[16px]">
                    Yes, if a user is violating any our terms or posting
                    irrelevant contents. Report the person!
                  </p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-11">
                <AccordionTrigger>
                  Is there a fee to use ShareSpace?
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-[16px]">
                    The One-time pro plan cost NGN900. Use forever!
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </TabsContent>
      </Tabs>
    </main>
  );
}
