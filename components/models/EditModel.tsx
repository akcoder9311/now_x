import useCurrentUser from "@/hooks/useCurrentUser";
import useEditModel from "@/hooks/useEditModel";
import useUser from "@/hooks/useUser";
import axios from "axios";
import React, { useCallback, useState } from "react";
import toast from "react-hot-toast";
import Modal from "../Modal";
import Input from "../Input";
import ImageUpload from "../imageUpload";

const EditModel = () => {
  const { data: currentUser } = useCurrentUser();
  const { mutate: mutateFetchedUser } = useUser(currentUser?.id);
  const editModel = useEditModel();

  const [profileImage, setProfileImage] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");

  useCallback(() => {
    setProfileImage(currentUser?.profileImage);
    setCoverImage(useCurrentUser?.coverImage);
    setName(currentUser?.name);
    setUsername(currentUser?.username);
    setBio(useCurrentUser?.bio);
  }, [currentUser]);

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);

      await axios.patch("/api/edit", {
        name,
        username,
        bio,
        profileImage,
        coverImage,
      });

      mutateFetchedUser();

      toast.success("Updated");
      editModel.onClose();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }, [
    bio,
    name,
    username,
    profileImage,
    coverImage,
    editModel,
    mutateFetchedUser,
  ]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <ImageUpload
        value={profileImage}
        disabled={isLoading}
        onChange={(image) => setProfileImage(image)}
        label="Upload Profile Image"
      />

      <ImageUpload
        value={coverImage}
        disabled={isLoading}
        onChange={(image) => setCoverImage(image)}
        label="Upload cover Image"
      />
      <Input
        placeholder="Name"
        onChange={(e) => {
          setName(e.target.value);
        }}
        value={name}
        disabled={isLoading}
      />
      <Input
        placeholder="Username"
        onChange={(e) => {
          setUsername(e.target.value);
        }}
        value={username}
        disabled={isLoading}
      />
      <Input
        placeholder="Bio"
        onChange={(e) => {
          setBio(e.target.value);
        }}
        value={bio}
        disabled={isLoading}
      />
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={editModel.isOpen}
      title="Edit Your Profile "
      actionLabel="Save"
      onClose={editModel.onClose}
      onSubmit={onSubmit}
      body={bodyContent}
    />
  );
};

export default EditModel;
