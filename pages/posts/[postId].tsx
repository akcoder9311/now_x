import { useRouter } from "next/router";
import usePost from "@/hooks/usePost";
import React from "react";
import { ClipLoader } from "react-spinners";
import Header from "@/components/Header";
import PostItem from "@/components/posts/PostItem";
import Form from "@/components/Form";

const PostView = () => {
  const router = useRouter();

  const { postId } = router.query;

  const { data: fetchedPost, isLoading } = usePost(postId as string);

  if (isLoading || !fetchedPost) {
    return (
      <div className="flex justify-center items-center h-full">
        <ClipLoader color="lightblue" size={80} />
      </div>
    );
  }
  return (
    <>
      <Header label="Tweet" showBackArrow />
      <PostItem data={fetchedPost} />
      <Form
        postId={postId as string}
        isComment
        placeholder="Tweet Your reply"
      />
    </>
  );
};

export default PostView;
