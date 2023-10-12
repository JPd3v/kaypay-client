import { RefreshTokensResponse } from 'features/auth';
import axios from 'lib/axios';

// eslint-disable-next-line import/prefer-default-export
export async function refreshTokens() {
  const req = await axios.get<RefreshTokensResponse>('/auth/refresh-token', {});

  return req;
}
