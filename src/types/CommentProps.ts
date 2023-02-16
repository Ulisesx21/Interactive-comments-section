import { User } from "./DataTypes";

type CommentType = {
  type: "comment";
  score: number;
  content: string | undefined;
  createdAt: string;
  user: User;
  id: number;
  commentId?: number;
  replyingTo?: string;
};

type ReplyType = {
  type: "reply";
  score: number;
  content: string | undefined;
  createdAt: string;
  user: User;
  id: number;
  commentId: number;
  replyingTo: string;
};

 export type CommentProps = CommentType | ReplyType;