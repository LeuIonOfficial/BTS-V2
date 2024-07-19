export type ProfileDto = {
  id: number;
  name: string;
  role: string;
  email: string;
  is_deactivated: number;
  phone: string;
};

export type ProfileResponse = {
  data: ProfileDto;
};
