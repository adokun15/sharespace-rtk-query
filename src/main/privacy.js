import { Link } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "../components/ui/breadcrumb";
import { lIVE_CLIENT_WEB_URL } from "../lib/utils";

export default function Privacy() {
  return (
    <main>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <b>Privacy policy</b>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <h1 className="md:text-4xl text-3xl my-6 md:text-center font-semibold font-sans_serif">
        Privacy and Policy
      </h1>

      <article className="pl-4 font-poppins">
        <div className="my-2">
          <p className="text-xl font-medium">Effective Date : 30/12/24</p>
          <p>
            ShareSpace (the “Platform”) values your privacy and is committed to
            protecting your personal information. This Privacy Policy outlines
            how we collect, use, and safeguard your data when you access or use
            our website{" "}
            <a
              className="text-purple-600 underline"
              href={lIVE_CLIENT_WEB_URL}
              target="_blank"
              rel="noreferrer"
            >
              sharespace.com.ng
            </a>
            (the “Site”). By using the Platform, you consent to the collection
            and use of your information in accordance with this Privacy Policy.
          </p>
        </div>
        <div className="my-2 font-logo space-y-6">
          <section>
            <h2 className="text-slate-800 text-2xl tracking-wide">
              1. <b>Information We Collect</b>
            </h2>
            <p>We collect the following types of information:</p>
            <ul className="mt-3 pl-8 list-inside  space-y-3">
              <li>
                a. <b>Personal Information Name</b>, <b>email address</b>, and
                <b> location </b>, <b>religion</b>, <b>age</b>, <b>gender</b>{" "}
                when you register or update your profile. Accommodation
                preferences, such as budget, location, and roommate criteria.
              </li>
              <li>
                b. <b>Non-Personal Information IP address</b>,{" "}
                <b>browser type</b>, and usage data, such as pages visited and
                time spent on the Site. Cookies, localStorage and tracking
                technologies to enhance user experience and analyze Platform
                performance.
              </li>
              <li>
                c. Third-Party Information Information you share through
                integrations with social media platforms or third-party
                services.
              </li>
            </ul>
          </section>
          <section>
            <h2 className="text-slate-800 text-2xl tracking-wide">
              2. <b>How We Use Your Information</b>
            </h2>

            <p>We use your information to:</p>
            <ul className="mt-3 pl-8 list-disc list-inside  space-y-3">
              <li>
                Facilitate connections between users seeking roommates or shared
                accommodations.
              </li>
              <li>Customize and improve your experience on the Platform.</li>
              <li>
                Communicate updates, promotions, and service-related
                information.
              </li>
              <li>
                Monitor and analyze usage trends to improve the functionality of
                the Platform.
              </li>
              <li>
                Enforce our Terms of Service and comply with legal obligations.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-slate-800 text-2xl tracking-wide">
              3. <b>How We Share Your Information</b>
            </h2>
            <p>We may share your information in the following cases:</p>
            <ul className="mt-3 pl-8 list-disc list-inside  space-y-3">
              <li>
                <b>With Other Users:</b>
                To connect you with potential roommates based on your
                preferences.
              </li>
              <li>
                <b>With Service Providers:</b>
                Trusted third parties who assist in operating the Platform
                (e.g., hosting, analytics).
              </li>
              <li>
                <b>Legal Compliance:</b>
                If required by law, court order, or government request.
              </li>
              <li>
                <b>Business Transactions:</b>
                In the event of a merger, acquisition, or sale of assets, your
                data may be transferred.
              </li>
              <li>
                We do not sell or rent your personal information to third
                parties for marketing purposes.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-slate-800 text-2xl tracking-wide">
              4. <b>Data Retention</b>
            </h2>
            <p>
              We retain your data as long as necessary to fulfill the purposes
              outlined in this Privacy Policy or as required by law. After ten
              months of inactiveness, an email will week be sent before your
              account is deleted. If you wish to delete your account, your data
              will be removed, subject to any legal retention requirements.
            </p>
          </section>

          <section>
            <h2 className="text-slate-800 text-2xl tracking-wide">
              5. <b>Your Rights</b>
            </h2>
            <p>
              You have the following rights regarding your personal information:
            </p>
            <ul className="mt-3 pl-8 list-disc list-inside  space-y-3">
              <li>
                <b>Access and Update:</b>
                Review and update your personal data through your account
                settings.
              </li>
              <li>
                <b>Delete Data:</b>
                Delete your data through settings. This action is irreversible.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-slate-800 text-2xl tracking-wide">
              6. <b>Cookies and Tracking</b>
            </h2>
            <p>
              We use cookies and similar technologies to enhance your experience
              on the Platform. You can manage your cookie preferences through
              your browser settings. Note that disabling cookies may limit
              certain features of the Site.
            </p>
          </section>
          <section>
            <h2 className="text-slate-800 text-2xl tracking-wide">
              7. <b>Security Measures</b>
            </h2>
            <p>
              We implement appropriate technical and organizational measures to
              protect your data from unauthorized access, loss, or misuse.
              However, no system is completely secure, and we cannot guarantee
              absolute security.
            </p>
          </section>
          <section>
            <h2 className="text-slate-800 text-2xl tracking-wide">
              8. <b>Children's Privacy</b>
            </h2>
            <p>
              The Platform is not intended for individuals under 16 years of
              age. We do not knowingly collect information from minors.
            </p>
          </section>

          <section>
            <h2 className="text-slate-800 text-2xl tracking-wide">
              9. <b>Third-Party Links</b>
            </h2>
            <p>
              The Site may contain links to third-party websites. We are not
              responsible for the privacy practices or content of these external
              sites.
            </p>
          </section>

          <section>
            <h2 className="text-slate-800 text-2xl tracking-wide">
              10. <b>Changes to this Privacy Policy</b>
            </h2>
            <p>
              We may update this Privacy Policy from time to time. Significant
              changes will be communicated via email or through the Platform.
              Your continued use of the Platform after changes are posted
              constitutes your acceptance of the revised policy.
            </p>
          </section>
        </div>
        <div className="mt-6">
          If you have any questions about our Privacy Policy, please contact us
          on our{" "}
          <a
            className="text-primary underline"
            href="mailto:contact@danielamos.com"
            target="_blank"
            rel="noreferrer"
          >
            email
          </a>
          .
        </div>
      </article>
    </main>
  );
}
