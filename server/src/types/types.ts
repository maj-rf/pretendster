export interface PublicUser {
  username: string;
  email: string;
  id: string;
  profileImg: {
    url: string;
    public_id: string;
  };
}
