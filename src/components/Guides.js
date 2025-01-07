import { AccordionContent, AccordionHeader } from "@radix-ui/react-accordion";
import Card from "../UI/Card";
import { Accordion, AccordionItem, AccordionTrigger } from "./ui/accordion";

export default function Guide() {
  return (
    <main className="space-y-4">
      <h2 className="text-3xl font-sans_serif font-semibold">Guides</h2>
      <Accordion type="single" className="space-y-4" collapsible>
        <AccordionItem value="q1">
          <AccordionHeader>How do I post?</AccordionHeader>
          <AccordionTrigger>Steps</AccordionTrigger>
          <AccordionContent>
            <ul className="pl-8 list-inside list-disc space-y-3">
              <li>
                Firstly make sure you are logged In, then proceed to the Explore
                Page
              </li>
              <li>At the top right corner, click on "Create" </li>
              <li>
                If you have not create any post before, a modal then pops up
              </li>
              <li>
                Proceed to fill in the correct information to get desired
                roommate
              </li>
            </ul>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="q2">
          <AccordionHeader>How to add people to Chat Space</AccordionHeader>
          <AccordionTrigger>Steps</AccordionTrigger>
          <AccordionContent>
            <ul className="pl-8 list-inside list-disc space-y-3">
              <li>
                After creating your post. You receive proposals from other
                students who wish to be your roommate
              </li>
              <li>
                Proposal are messages sent by a student and it also contain
                other students basic info
              </li>
              <li>
                If you want to know more about a certain student, simply accept
                his/her proposal.
              </li>
              <li>Then they are automatically added to your Chat space.</li>
            </ul>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="q3">
          <AccordionHeader>How to pay for credits?</AccordionHeader>
          <AccordionTrigger>Steps</AccordionTrigger>
          <AccordionContent>
            <ul className="pl-8 list-inside list-disc space-y-3">
              <li>
                Before your can start using our service, you have to complete
                your profile first.
              </li>
              <li>
                To make payment for a certain amount of token simply go to
                "account" in the navigation menu.
              </li>
              <li>
                Click on "Buy Credits". This will prompt a modal window where
                you choose your plan.
              </li>
              <li>
                After clicking the plan you want you will redirected to Paystack
                to complete your transaction
              </li>
              <li>
                Upon successful transaction, you account will be credited with
                amount you pay for.
              </li>
            </ul>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="q4">
          <AccordionHeader>
            What are proposals and how do I send them
          </AccordionHeader>
          <AccordionTrigger>steps</AccordionTrigger>
          <AccordionContent>
            <h4>
              you are "STUDENT A", the other unknown student is "STUDENT B"{" "}
            </h4>
            <p>
              Proposal are inital-messages sent to STUDENT B whose roommate post
              is still active. It also contains basic information about STUDENT
              A, such as STUDENT A age, Religion and School Info. When STUDENT A
              reaches out to STUDENT B to respond by accepting or declining
              STUDENT A proposal.{" "}
              <i>btw we send email ,when you send a proposal, to STUDENT B</i>
              when STUDENT accepts your proposal (
              <i>We send you an email about it to you</i>), you are both add a
              chat space
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="q5">
          <AccordionHeader>How long can I use the chat space</AccordionHeader>
          <AccordionTrigger>steps</AccordionTrigger>
          <AccordionContent>
            <p>
              Chats space are exhausted are 200 messages are sent. So make your
              chat quick and ask personal questions about each other. If you
              want to meet up, meet up in public places.
            </p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <p>If you have any more questions, reach out to our support</p>
    </main>
  );
}
