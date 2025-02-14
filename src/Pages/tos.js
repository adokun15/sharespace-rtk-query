import { Link } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "../components/ui/breadcrumb";
import { lIVE_CLIENT_WEB_URL } from "../lib/utils";
//
// ♾️
export default function Term() {
  return (
    <main className="w-[95%] space-y-4 md:w-4/5 mx-auto shadoww">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <b>Terms of service</b>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <h1 className="md:text-4xl text-3xl my-6 md:text-center font-semibold font-sans_serif">
        Terms of Service
      </h1>
      <article className="pl-4 font-poppins">
        <div className="my-2">
          <p className="text-xl font-medium">Effective Date : 30/12/24</p>
        </div>
        <div className="my-2 space-y-6">
          <p>
            Welcome to ShareSpace (the “Platform”). By accessing or using our
            website{" "}
            <a
              className="text-primary underline"
              href={lIVE_CLIENT_WEB_URL}
              target="_blank"
              rel="noreferrer"
            >
              sharespace.com.ng
            </a>{" "}
            (the “Site”), you agree to comply with and be bound by the following
            Terms and Conditions (the “Terms”). If you do not agree to these
            Terms, please do not use the Platform.
          </p>

          <section>
            <h2 className="text-2xl font-semibold tracking-wide">
              1. Acceptance of Terms
            </h2>
            <p className="pl-2">
              By using this Platform, you confirm that you are at least{" "}
              <b>16 years</b> old and legally capable of entering into binding
              agreements.
            </p>
          </section>
          <section>
            <h2 className="text-2xl tracking-wide">
              2. <b>Services Provided</b>
            </h2>
            <p className="pl-2">
              ShareSpace connects individuals seeking roommates or shared
              accommodations. This is a connection Platform and does not own or
              manage any property or guarantee compatibility between roommates.
            </p>
          </section>
          <section>
            <h2 className="text-slate-800 text-2xl tracking-wide">
              3. <b>User Obligations</b>
            </h2>
            <p className="pl-2">As a user of ShareSpace, you agree to:</p>
            <ul className="mt-3 pl-8 list-inside list-disc space-y-3">
              <li>
                Provide accurate and truthful information during registration.
              </li>
              <li>Maintain the confidentiality of your login credentials.</li>
              <li>Use the Platform solely for lawful purposes.</li>
              <li>
                {" "}
                Avoid posting offensive, discriminatory, or misleading content.
              </li>
              <li>
                Comply with local laws governing rental agreements and shared
                accommodations.
              </li>
            </ul>
          </section>
          <section>
            <h2 className="text-slate-800 text-2xl tracking-wide">
              4.<b>Prohibited Activities</b>
            </h2>

            <p className="pl-2">You must not:</p>

            <ul className="mt-3 pl-8 list-inside list-disc space-y-3">
              <li>
                Engage in fraudulent activities or impersonate another user.
              </li>
              <li>
                Use the Platform to solicit illegal activities or sell
                prohibited goods/services.
              </li>
              <li>
                Post content that infringes on the rights of others, including
                intellectual property rights.
              </li>
              <li>
                Attempt to hack, disrupt, or harm the Platform in any way.
              </li>
            </ul>
            <p className="pl-2">
              Violation of the above rule leads to an immediate termination of
              your account.
            </p>
          </section>
          <section>
            <h2 className="text-slate-800 text-2xl tracking-wide">
              5.<b>Content Ownership and Use</b>
            </h2>
            <ul className="mt-3 pl-8 list-inside list-disc space-y-3">
              <li>
                By posting content on ShareSpace, you grant us a non-exclusive,
                worldwide, royalty-free license to use, modify, and display the
                content for promotional purposes.
              </li>

              <li>
                ShareSpace reserves the right to remove any content deemed
                inappropriate or in violation of these Terms.
              </li>
            </ul>
          </section>
          <section>
            <h2 className="text-slate-800 text-2xl tracking-wide">
              6. <b>Fees and Payments</b>
            </h2>
            <ul className="mt-3 pl-8 list-inside list-disc space-y-3">
              <li>
                Registration and basic use of the Platform may be free; however,
                additional services may incur fees.
              </li>
              <li>
                Users are responsible for managing payments directly with their
                landlords or roommates. ShareSpace is not liable for any
                financial transactions between users.
              </li>
            </ul>
          </section>
          <section>
            <h2 className="text-slate-800 text-2xl tracking-wide">
              7. <b>Disclaimers and Limitations of Liability</b>
            </h2>
            <ul className="mt-3 pl-8 list-inside list-disc space-y-3">
              <li>
                ShareSpace provides its services "as is" without warranties of
                any kind.
              </li>
              <li>
                The Platform does not guarantee the accuracy or reliability of
                user-generated content.
              </li>
              <li>
                ShareSpace is not responsible for disputes, damages, or losses
                resulting from interactions between users.
              </li>
            </ul>
          </section>
          <section>
            <h2 className="text-slate-800 text-2xl tracking-wide">
              8. <b>Termination of Service</b>
            </h2>
            <p className="pl-2">
              ShareSpace reserves the right to suspend or terminate your account
              if you violate these Terms or engage in prohibited activities.
            </p>
          </section>
          <section>
            <h2 className="text-slate-800 text-2xl tracking-wide">
              9. <b>Privacy Policy</b>
            </h2>
            <p className="pl-2">
              Your use of the Platform is governed by our
              <a
                className="text-primary mx-1 underline"
                href={`${lIVE_CLIENT_WEB_URL}/privacy`}
                target="_blank"
                rel="noreferrer"
              >
                Privacy Policy
              </a>
              which explains how we collect, use, and protect your data.
            </p>
          </section>
          <section>
            <h2 className="text-slate-800 text-2xl tracking-wide">
              10. <b>Governing Law</b>
            </h2>
            <p className="pl-2">
              These Terms are governed by the laws of Nigeria. Any disputes
              arising from the use of the Platform will be resolved in Nigerian
              courts.
            </p>
          </section>
          <section>
            <h2 className="text-slate-800 text-2xl tracking-wide">
              11. <b>Amendments</b>
            </h2>
            <p className="pl-2">
              ShareSpace reserves the right to update these Terms at any time.
              Users will be notified of significant changes via email or through
              the Platform.
            </p>
          </section>
        </div>
        <div>
          If you have any questions about these Terms, please contact me{" "}
          <a
            className="text-primary underline"
            href="mailto:contact@danielamos.com"
            target="_blank"
            rel="noreferrer"
          >
            here
          </a>
        </div>
      </article>
    </main>
  );
}
