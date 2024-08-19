import Button from "../UI/Button";
import Card from "../UI/Card";

export default function VerifyEmail() {
  return (
    <Card elClass="min-h-5 flex justify-between flex-wrap">
      <p className="text-2xl font-[600]">
        Email Verification
        <span className="block text-[16px] italic font-[200]">
          Access all service when your email is verified.
        </span>
      </p>
      <Button>Verify Now</Button>
    </Card>
  );
}
