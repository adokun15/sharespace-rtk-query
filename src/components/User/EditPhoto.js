import { useState } from "react";
import { Button } from "../ui/button";
import placeImg from "../../image/undraw/undraw_Meditation_re_gll0.png";
import { useUploadImageMutation } from "../../store/Slices/uploads";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
export default function EditPhoto({ uid, imgUrl, closePhotoModal }) {
  //Img Preview
  const [previewImg, setPreviewImage] = useState("");
  //Img Large Error : > 50mb
  const [imgError, setImageError] = useState("");

  //Current File
  const [file, setImgFile] = useState(null);

  //Upload
  const [uploadMyProfile, { isLoading }] = useUploadImageMutation();

  //Listener for Change
  const handleImgChange = (e) => {
    const imgFile = e.target.files[0];

    const size = Math.round(imgFile.size / 1024);

    setPreviewImage(URL.createObjectURL(imgFile));

    if (size > 50) {
      setImageError("Image is too large. Pick Image less than 50mb");
      return;
    }

    setImgFile(imgFile);
    setImageError("");
  };

  //Trigger for Upload
  const handleUpload = async () => {
    if (!uid) {
      setImageError("Something went wrong. You seem to be logged out already!");
      return;
    }

    if (imgError) return;

    if (file && file.type === "image/jpeg" && uid) {
      await uploadMyProfile({ uid, file })
        .unwrap()
        .then((data) => {
          //Close Modal
          closePhotoModal();
          //Alert User
          toast.success("Profile pic updated", { description: data });
        })
        .catch((e) => {
          //Send toast
          toast.error("Profile pic update failed ", {
            description: e?.message,
          });
        });
    }
  };

  return (
    <form className=" px-5 py-4  space-y-4  overflow-y-auto md:h-fit block  md:mx-auto md:mt-[2vh] ">
      <p className="text-xs text-red-600">{imgError}</p>
      <div className="rounded overflow-hidden">
        <img
          src={previewImg || imgUrl || placeImg}
          width={120}
          height={120}
          alt="product"
        />
      </div>

      <div className="*:mr-4 flex flex-wrap  justify-between">
        <label
          type="button"
          className="p-2 text-[1.2rem] md:text-[1.5rem] cursor-pointer rounded text-teal-800 bg-slate-200"
        >
          <input
            accept=".png,.jpeg,.jpg,image/pngm,image/jpeg,image/jpg"
            type="file"
            name="logo"
            onChange={handleImgChange}
            className="hidden"
          />
          {previewImg ? "Change Image" : "Upload new Photo"}
        </label>
        {previewImg && (
          <Button
            type="button"
            onClick={handleUpload}
            clxName="bg-teal-800 text-slate-200"
          >
            {isLoading ? <Loader2 className="animate-spin" /> : "Save Image"}
          </Button>
        )}
      </div>
    </form>
  );
}
