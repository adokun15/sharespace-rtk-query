import Button from "../UI/Button";
import Image from "../UI/Image";
import ProfilePic from "../image/202330014270ff.jpg";
export default function RoommateDetail({ detail, onClose }) {
  return (
    <div>
      <article>
        <div>
          <Image imgSrc={ProfilePic} />
        </div>
        <p>a single user with id: {detail?.id}</p>
      </article>

      <article className="flex gap-2">
        <Button onClick={onClose} outline>
          Close
        </Button>
        <Button>Link Up</Button>
      </article>
    </div>
  );
}
