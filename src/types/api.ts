interface UserData {
  id: string;
  name: string;
  email: string;
  role: string;
  profilePictureUrl: string;
  phoneNumber: string;
}

interface ApiResponse {
  code: string;
  status: string;
  message: string;
  data: UserData;
}
