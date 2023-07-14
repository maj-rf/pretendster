export interface IComment {
  id: string;
  content: string;
  postId: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IPost {
  id: string;
  content: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUser {
  id: string;
  email: string;
  username: string;
  password: string;
  profile_img: string | null;
  banner_img: string | null;
  location: string | null;
  status: string | null;
  bio: string | null;
  followerIDs: string[];
  followingIDs: string[];
  posts: IPost[];
}

export type PublicUser = Pick<IUser, 'username' | 'email' | 'id'>;

export type UserCredentials = Pick<IUser, 'email' | 'password'>;

export type NewUserCredentials = {
  username: string;
  email: string;
  password: string;
  passConfirm: string;
};
