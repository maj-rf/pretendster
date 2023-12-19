export type ProfileImage = {
  url: string;
  public_id: string;
};

export interface IComment {
  id: string;
  content: string;
  postId: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  user: UsernameAndImg;
}

export interface IPost {
  id: string;
  content: string;
  postImg: string | null;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  likes: string[];
  user: UsernameAndImg;
}

export interface IUser {
  id: string;
  email: string;
  username: string;
  password: string;
  profileImg: ProfileImage;
  bannerImg: string;
  location: string | null;
  status: string | null;
  bio: string | null;
  followerIDs: string[];
  followingIDs: string[];
  posts: IPost[];
  followers: PublicUser[];
  follows: PublicUser[];
}

export type PublicUser = Pick<
  IUser,
  'username' | 'email' | 'id' | 'profileImg'
>;

export type UserCredentials = Pick<IUser, 'email' | 'password'>;

export type NewUserCredentials = {
  username: string;
  email: string;
  password: string;
  passConfirm: string;
};

export type AboutMe = Pick<IUser, 'username' | 'location' | 'status' | 'bio'>;
export type UsernameAndImg = Pick<IUser, 'username' | 'profileImg' | 'id'>;

export type PostModalProps = {
  closeModal: () => void;
  post: IPost;
};
