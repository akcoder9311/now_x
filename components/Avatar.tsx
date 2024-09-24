import useUser from "@/hooks/useUser";
import { useRouter } from "next/router";
import Image from "next/image";
import React, { useCallback } from "react";

interface AvatarProps {
  userId: string;
  isLarge?: boolean;
  hasBoarder?: boolean;
}
const Avatar: React.FC<AvatarProps> = ({ userId, isLarge, hasBoarder }) => {
  const router = useRouter();
  const { data: fetchedUser } = useUser(userId);

  const onClick = useCallback(
    (event: any) => {
      // event.stopPropgation();

      const url = `/users/${userId}`;
      router.push("/");
    },
    [router, userId]
  );

  return (
    <div
      className={`
    ${hasBoarder ? "border-4 " : ""}
    ${isLarge ? "h-32 " : "h-12"}
    ${isLarge ? "w-32 " : "w-12"}
    rounded-full
    hover:opacity-90
    transition
    cursor-pointer
    relative
    
    `}
    >
      <Image
        fill
        style={{
          objectFit: "cover",
          borderRadius: "100%",
        }}
        alt="Avatar"
        onClick={onClick}
        src={fetchedUser?.profileImage || "/images/placeholderimage.jpg"}
      />
    </div>
  );
};

export default Avatar;
