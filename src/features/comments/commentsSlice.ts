import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import data from "../../mocks/data.json";
import { Comment } from "../../types/DataTypes";
import { getItem, setItem } from "../../utils/localStorage";

const initialState =
  (getItem("state") as Comment[]) || (data.comments as Comment[]);

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    addComment(state, action: PayloadAction<{ content: string }>) {
      const { content } = action.payload;
      state.push({
        id: Math.random(),
        content,
        createdAt: "now",
        score: 0,
        user: data.currentUser,
        replies: [],
      });
      setItem("state", JSON.stringify(state));
    },

    updateComment(
      state,
      action: PayloadAction<{ id: number; content: string | undefined }>
    ) {
      const { id, content } = action.payload;
      const comment = state.find((comment) => comment.id === id);
      if (comment) {
        comment.content = content;
        setItem("state", JSON.stringify(state));
      }
    },

    removeComment(state, action: PayloadAction<{ id: number }>) {
      const { id } = action.payload;
      const commentIdx = state.findIndex((comment) => comment.id === id);
      if (commentIdx) {
        state.splice(commentIdx, 1);
        setItem("state", JSON.stringify(state));
      }
    },

    replyComment(
      state,
      action: PayloadAction<{
        id: number;
        reply: string;
        commentId: number | undefined;
        userName: string;
      }>
    ) {
      const { id, reply, commentId, userName } = action.payload;
      
      const comment = commentId 
      ? state.find((comment) => comment.id === commentId)
      : state.find((comment) => comment.id === id);
      
      if (comment) {
        comment.replies.push({
          id: Math.random(),
          content: reply,
          createdAt: "now",
          score: 0,
          replyingTo: commentId ? userName : comment.user.username,
          user: data.currentUser,
        });

        setItem("state", JSON.stringify(state));
      }
    },

    changeCommentScore(
      state,
      action: PayloadAction<{ id: number; actionType?: string }>
    ) {
      const { id, actionType } = action.payload;

      const comment = state.find((comment) => comment.id === id);

      if (comment) {
        actionType === "plus"
          ? comment.score++
          : comment.score === 0
          ? null
          : comment.score--;

        setItem("state", JSON.stringify(state));
      }
    },

    updateReply(
      state,
      action: PayloadAction<{
        commentId: number | undefined;
        replyId: number;
        content: string | undefined;
      }>
    ) {
      const { commentId, replyId, content } = action.payload;
      const comment = state.find((comment) => comment.id === commentId);
      if (comment) {
        const replyIdx = comment.replies.findIndex(
          (reply) => reply.id === replyId
        );

        comment.replies[replyIdx].content = content;

        setItem("state", JSON.stringify(state));
      }
    },

    removeReply(
      state,
      action: PayloadAction<{ commentId?: number; replyId: number }>
    ) {
      const { commentId, replyId } = action.payload;
      let comment = state.find((comment) => comment.id === commentId);

      if (comment) {
        const replyIdx = comment.replies.findIndex(
          (reply) => reply.id === replyId
        );
        comment.replies.splice(replyIdx, 1);

        setItem("state", JSON.stringify(state));
      }
    },

    changeReplyScore(
      state,
      action: PayloadAction<{
        replyId: number;
        commentId: number | undefined;
        actionType?: string;
      }>
    ) {
      const { replyId, commentId, actionType } = action.payload;
      const comment = state.find((comment) => comment.id === commentId);
      if (comment) {
        const replyIdx = comment.replies.findIndex(
          (reply) => reply.id === replyId
        );

        actionType === "plus"
          ? comment.replies[replyIdx].score++
          : comment.replies[replyIdx].score === 0
          ? null
          : comment.replies[replyIdx].score--;

        setItem("state", JSON.stringify(state));
      }
    },
  },
});

export const {
  addComment,
  updateComment,
  removeComment,
  replyComment,
  updateReply,
  removeReply,
  changeCommentScore,
  changeReplyScore,
} = commentsSlice.actions;

export default commentsSlice.reducer;
