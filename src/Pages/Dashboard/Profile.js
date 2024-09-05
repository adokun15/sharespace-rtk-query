import ProfilePicDemo from "../../image/202330014270ff.jpg";
import Button from "../../UI/Button";
import Card from "../../UI/Card";
import Container from "../../UI/Container";
import { useDispatch, useSelector } from "react-redux";
import Image from "../../UI/Image";
import ProfileUpdate from "../../components/User/Profile";
import { ModalAction } from "../../store/Slices/modal";
import Modal from "../../UI/Modal";

import { AnimatePresence, motion } from "framer-motion";
import { useGetProfileQuery } from "../../store/Slices/ProfileSlice";
import { useIsLoggedInQuery } from "../../store/Slices/user";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

export default function ProfilePage() {
  const {
    data: user,
    isLoading: userLoading,
    isFetching: userFetching,
  } = useIsLoggedInQuery();
  const { EditProfilePopOver } = useSelector((state) => state.modal.modal);
  const dispatch = useDispatch();

  const {
    data: profile,
    isLoading,
    refetch,
    error,
    isFetching: profileFetching,
    isError,
  } = useGetProfileQuery(user?.user?.uid, { skip: !user?.user?.uid });

  if (isLoading || userLoading || userFetching || profileFetching) {
    return (
      <p className="mt-[10vh] text-center animate-spin text-2xl">
        <FontAwesomeIcon icon={faSpinner} />
      </p>
    );
  }

  if (isError) {
    return (
      <div className="m-auto w-[70%]">
        <p>{error?.message}</p>
        <Button trigger={refetch} outline={true}>
          Try Again
        </Button>
      </div>
    );
  }

  if (profile) {
    return (
      <motion.div>
        <Container elClass="text-main_color">
          <h1 className="text-4xl text-center my-8"> Your Profile</h1>
          <Card elClass="hover:-translate-y-1 transition-all duration-700 ease-in-out">
            <article className="px-[10%] md:flex *:block my-4 items-center">
              <div className=" max-w-[40%] flex justify-center">
                <Image
                  imgSrc={
                    profile?.photourl ? profile?.photourl : ProfilePicDemo
                  }
                />
              </div>
              <div className="space-y-1 w-full py-2 ">
                <p className="text-4xl ml-3  col-span-3">{profile?.fullname}</p>
                <p className="text-xl italic my-4 ml-3 text-slate-400 col-span-3">
                  @{profile?.username}
                </p>
                <div className="flex flex-wrap items-center">
                  <p className="cursor-pointer  w-fit p-2 rounded ml-3 bg-slate-200  text-[15px] hover:bg-purple-500/90 hover:text-white transition-all">
                    {profile?.gender}
                  </p>

                  <p className="w-fit p-1 rounded ml-3 bg-slate-200  text-[15px] hover:bg-purple-500/90 hover:text-white transition-all cursor-pointer ">
                    {profile?.dob}
                  </p>
                </div>

                <p className=" w-fit p-1 my-1 rounded ml-3  bg-slate-200  text-[15px]  hover:bg-purple-500/90 hover:text-white transition-all cursor-pointer ">
                  {profile?.email}
                </p>
                <p className=" w-fit text-nowrap  p-1 rounded ml-3 bg-slate-200  text-[15px]  hover:bg-purple-500/90 hover:text-white transition-all cursor-pointer ">
                  {profile?.school}
                </p>
              </div>
            </article>
            <Button
              trigger={() => {
                dispatch(
                  ModalAction.toggleEditProfilePopOver({ mode: "Edit" })
                );
              }}
            >
              Edit
            </Button>
          </Card>
        </Container>
        <AnimatePresence
          initial={{ scale: 0 }}
          animate={{ scale: 100 }}
          exit={{ scale: 0 }}
        >
          {EditProfilePopOver.isOpened && (
            <>
              <Modal cls="top-[5%] absolute  z-[1200] left-[20%] w-[60%]">
                <ProfileUpdate mode={EditProfilePopOver.mode?.toLowerCase()} />
              </Modal>
            </>
          )}
        </AnimatePresence>
      </motion.div>
    );
  }
}
