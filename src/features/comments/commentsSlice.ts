import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import data from "../../data/data.json";
import { Comment } from "../../types/DataTypes";

const initialState = localStorage.getItem("state") === null ? data.comments as Comment[] : JSON.parse(localStorage.getItem("state")!)  as Comment[];

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    addComment(state, action: PayloadAction<string>) {
      state = [
        ...state,
        {
          id: Math.random(),
          content: action.payload,
          createdAt: "now",
          score: 0,
          user: {
            image: {
              png: "./images/avatars/image-juliusomo.png",
              webp: "./images/avatars/image-juliusomo.webp",
            },
            username: "juliusomo",
          },
          replies: [],
        },
      ];
      localStorage.setItem("state", JSON.stringify(state))
      return state
    },

    updateComment(
      state,
      action: PayloadAction<{ id: number; content: string | undefined }>
    ) {
      const { id, content } = action.payload;
      state = state.map((comment) => {
        if (comment.id === id) {
          return { ...comment, content };
        } else {
          return comment;
        }
      });
      localStorage.setItem("state", JSON.stringify(state))
      return state
    },

    removeComment(state, action: PayloadAction<number>) {
      state = state.filter((comment) => comment.id !== action.payload);
      localStorage.setItem("state", JSON.stringify(state))
      return state
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

      state = state.map((comment) => {
        if (comment.id === (commentId ? commentId : id)) {
          return {
            ...comment,
            replies: [
              ...comment.replies,
              {
                id: Math.random(),
                content: reply,
                createdAt: "now",
                score: 0,
                replyingTo: commentId ? userName : comment.user.username,
                user: {
                  image: {
                    png: "./images/avatars/image-juliusomo.png",
                    webp: "./images/avatars/image-juliusomo.webp",
                  },
                  username: "juliusomo",
                },
              },
            ],
          };
          
        } else {
          return comment;
        }
      });
      localStorage.setItem("state", JSON.stringify(state))
      return state
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
        const updatedReplies = comment.replies.map((reply) => {
          if (reply.id === replyId) {
            return { ...reply, content };
          } else {
            return reply;
          }
        });

        state = state.map((comment) => {
          if (comment.id === commentId) {
            return { ...comment, replies: updatedReplies };
          } else {
            return comment;
          }
        });
        localStorage.setItem("state", JSON.stringify(state))
        return state
      } else {
        return state;
      }
    },

    removeReply(
      state,
      action: PayloadAction<{ commentId?: number; replyId: number }>
    ) {
      const { commentId, replyId } = action.payload;
      let comment = state.find((comment) => comment.id === commentId);
      if (comment) {
        let updateReplies = comment.replies.filter(
          (reply) => reply.id !== replyId
        );
        state = state.map((comment) => {
          if (comment.id === commentId) {
            return { ...comment, replies: updateReplies };
          } else {
            return comment;
          }
        });
        localStorage.setItem("state", JSON.stringify(state))
        return state
      }
    },

    increaseReplyQuantity(
      state,
      action: PayloadAction<{ replyId: number; commentId: number | undefined }>
    ) {
      const { replyId, commentId } = action.payload;
      const comment = state.find((comment) => comment.id === commentId);
      if (comment) {
        const updatedReplies = comment.replies.map((reply) => {
          if (reply.id === replyId) {
            return { ...reply, score: reply.score + 1 };
          } else {
            return reply;
          }
        });

        state = state.map((comment) => {
          if (comment.id === commentId) {
            return { ...comment, replies: updatedReplies };
          } else {
            return comment;
          }
        });
        localStorage.setItem("state", JSON.stringify(state))
        return state
      }
    },

    decreaseReplyQuantity(
      state,
      action: PayloadAction<{ replyId: number; commentId: number | undefined}>
    ) {
      const { replyId, commentId } = action.payload;
      const comment = state.find((comment) => comment.id === commentId);
      if (comment) {
        const updatedReplies = comment.replies.map((reply) => {
          if (reply.id === replyId && reply.score > 0) {
            return { ...reply, score: reply.score - 1 };
          } else {
            return reply;
          }
        });

        state = state.map((comment) => {
          if (comment.id === commentId) {
            return { ...comment, replies: updatedReplies };
          } else {
            return comment;
          }
        });

        localStorage.setItem("state", JSON.stringify(state))
        return state
      }
    },

    increaseCommentQuantity(state, action: PayloadAction<number>) {
      state = state.map((comment) => {
        if (comment.id === action.payload) {
          return { ...comment, score: comment.score + 1 };
        } else {
          return comment;
        }
      });
      localStorage.setItem("state", JSON.stringify(state))
      return state
    },

    decreaseCommentQuantity(state, action: PayloadAction<number>) {
      if (state.find((comment) => comment.id === action.payload)?.score === 0) {
        return state;
      } else {
        state = state.map((comment) => {
          if (comment.id === action.payload) {
            return { ...comment, score: comment.score - 1 };
          } else {
            return comment;
          }
        });
        localStorage.setItem("state", JSON.stringify(state))
        return state
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
  increaseCommentQuantity,
  decreaseCommentQuantity,
  increaseReplyQuantity,
  decreaseReplyQuantity,
} = commentsSlice.actions;

export default commentsSlice.reducer;
