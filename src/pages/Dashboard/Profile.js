import ProfilePicDemo from "../../image/202330014270ff.jpg";
import Button from "../../UI/Button";
import Card from "../../UI/Card";
import Container from "../../UI/Container";
import { useDispatch, useSelector } from "react-redux";
import Image from "../../UI/Image";
import ProfileUpdate from "../../components/User/Profile";
import { ModalAction } from "../../store/Slices/modal";
import VerifyEmail from "../../components/VerifyEmail";

export default function ProfilePage() {
  //  const user = useSelector((state) => state.user);
  const { EditProfilePopOver } = useSelector((state) => state.modal.modal);
  const dispatch = useDispatch();
  return (
    <>
      <Container elClass="text-main_color">
        <h1 className="text-4xl text-center my-8"> Your Profile</h1>
        <Card elClass="hover:-translate-y-1 transition-all duration-700 ease-in-out">
          <article className="px-[10%] md:flex *:block my-4 items-center">
            <div className=" max-w-[40%] flex justify-center">
              <Image imgSrc={ProfilePicDemo} />
            </div>
            <div className="space-y-1 w-full py-2 ">
              <p className="text-4xl ml-3  col-span-3">Daniel Amos</p>
              <p className="text-xl italic my-4 ml-3 text-slate-400 col-span-3">
                @Daniel_Amos
              </p>
              <div className="flex flex-wrap items-center">
                <p className="cursor-pointer  w-fit p-2 rounded ml-3 bg-slate-200  text-[15px] hover:bg-purple-500/90 hover:text-white transition-all">
                  MALE
                </p>

                <p className="w-fit p-1 rounded ml-3 bg-slate-200  text-[15px] hover:bg-purple-500/90 hover:text-white transition-all cursor-pointer ">
                  18.
                </p>
              </div>

              <p className=" w-fit p-1 my-1 rounded ml-3  bg-slate-200  text-[15px]  hover:bg-purple-500/90 hover:text-white transition-all cursor-pointer ">
                amos@gmail.com
              </p>
              <p className=" w-fit text-nowrap  p-1 rounded ml-3 bg-slate-200  text-[15px]  hover:bg-purple-500/90 hover:text-white transition-all cursor-pointer ">
                Kwara State University{" "}
              </p>
            </div>
          </article>
          <article className="flex gap-2">
            <Button
              onClick={() => {
                dispatch(
                  ModalAction.toggleEditProfilePopOver({ mode: "Edit" })
                );
              }}
            >
              Edit
            </Button>

            <Button outline>Delete Profile</Button>
          </article>
        </Card>
        <VerifyEmail />
      </Container>
      {EditProfilePopOver.isOpened && (
        <ProfileUpdate mode={EditProfilePopOver.mode} />
      )}
    </>
  );
}
