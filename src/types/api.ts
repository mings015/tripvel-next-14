interface UserData {
  id: string;
  name: string;
  email: string;
  role: string;
  profilePictureUrl: string;
  phoneNumber: string;
}

export interface ApiResponse {
  code: string;
  status: string;
  message: string;
  data: UserData;
}
