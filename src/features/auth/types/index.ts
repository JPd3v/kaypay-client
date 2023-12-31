interface LogedUser {
  alias: string;
  balance: number;
  email: string;
  firstName: string;
  id: number;
  lastName: string;
}

interface RefreshTokensResponse {
  message: string;
}

interface LogOutResponse {
  message: string;
}

export type { LogedUser, RefreshTokensResponse, LogOutResponse };
