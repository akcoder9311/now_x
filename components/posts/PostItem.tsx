import useCurrentUser from "@/hooks/useCurrentUser";
import useLoginModel from "@/hooks/useLoginModel";
import { formatDistanceToNowStrict } from "date-fns";
import { useRouter } from "next/router";
import React, { FC, useCallback, useMemo } from "react";
import Avatar from "../Avatar";
import { AiOutlineHeart, AiFillHeart, AiOutlineMessage } from "react-icons/ai";
import useLike from "@/hooks/useLike";

interface postItemProps {
  data: Record<string, any>;
  userId?: string;
}

const PostItem: FC<postItemProps> = ({ data, userId }) => {
  const router = useRouter();
  const loginModel = useLoginModel();

  const { data: currentUser } = useCurrentUser();
  const { hasLiked, toggleLike } = useLike({ postId: data.id, userId });

  const goToUser = useCallback(
    (event: any) => {
      event.stopPropagation();

      router.push(`/users/${data.user.id}`);
    },
    [router, data.user.id]
  );

  const goToPost = useCallback(
    (event: any) => {
      router.push(`/posts/${data.id}`);
    },
    [router, data.id]
  );

  const onLike = useCallback(
    (event: any) => {
      event.stopPropagation();

      if (!currentUser) {
        return loginModel.onOpen();
      }

      toggleLike();
    },
    [loginModel, currentUser, toggleLike]
  );

  const createdAt = useMemo(() => {
    if (!data?.createdAt) {
      null;
    }
    return formatDistanceToNowStrict(new Date(data.createdAt));
  }, [data?.createdAt]);

  const LikedIcon = hasLiked ? AiFillHeart : AiOutlineHeart;

  return (
    <div
      onClick={goToPost}
      className="
    border-b-[1px]
    border-neutral-800
    p-5
    cursor-pointer
    hover:bg-neutral-900
    transition
    "
    >
      <div className="flex flex-row items-start gap-3">
        <Avatar userId={data.user.id} />

        <div>
          <div
            className="
            flex
            flex-row
            items-center
            gap-2
            "
          >
            <p
              onClick={goToUser}
              className="
            text-white
            font-semibold
            cursor-pointer
            hover:underline
            "
            >
              {data.user.name}
            </p>
            <span
              onClick={goToUser}
              className="
            text-neutral-500
            cursor-pointer
            hidden
            md:block
            "
            ></span>
            <span className="text-neutral-500 text-sm">{createdAt}</span>
          </div>
          <div className="text-white mt-1">{data.body}</div>
          <div className="flex flex-row items-center mt-3 gap-3">
            <div
              className="
            flex
            flex-row
            items-center
            text-neutral-500
            gap-2
            cursor-pointer
            transition
            hover:text-sky-500
            "
            >
              <AiOutlineMessage size={20} />
              <p>{data.components?.length || 0}</p>
            </div>
            <div
              onClick={onLike}
              className="
            flex
            flex-row
            items-center
            text-neutral-500
            gap-2
            cursor-pointer
            transition
            hover:text-red-500
            "
            >
              <LikedIcon size={20} color={hasLiked ? "red" : ""} />
              <p>{data.likedIds?.length}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostItem;
