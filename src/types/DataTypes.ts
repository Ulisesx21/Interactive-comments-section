export type Comments = {
  comments: Comment[]
}

export type Comment = {
  id: number
  content: string | undefined
  createdAt: string
  score: number
  user: User
  replies: Reply[]
}

export type Reply = {
  id: number
  content: string | undefined;
  createdAt: string
  score: number
  replyingTo: string
  user: User
}

export type User = {
  image: Image
  username: string
}

export type Image = {
  png: string
  webp: string
}