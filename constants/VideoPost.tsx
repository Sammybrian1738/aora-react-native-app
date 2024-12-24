type Creator = {
  username: string;
  avatar: string;
};

export type VideoPost = {
  $id: string;
  title: string;
  thumbnail: string;
  prompt: string;
  video: string;
  creator?: Creator;
};
