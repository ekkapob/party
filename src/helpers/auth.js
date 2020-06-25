import axios from 'axios';

const OFFSET_SECONDS = 15;

export const refreshToken = async (credential) => {
  const { refreshToken } = credential;
  try {
    const resp = await axios.post(
      `${process.env.REACT_APP_API_V1}/refresh_token`,
      {
        refresh_token: refreshToken,
      }
    );
    return resp.data;
  } catch (err) {
    throw "invalid token";
  }
};

export const accessToken = async (credential, dispatcher, onFailure) => {
  const { accessToken, exp } = credential;
  const isAccessTokenExpired = getCurrentTime() + OFFSET_SECONDS > exp;
  if (!isAccessTokenExpired) return accessToken;

  try {
    const data = await refreshToken(credential);
    const { access_token, refresh_token, exp: respExp } = data;
    if (dispatcher) {
      dispatcher({
        type: 'SET_CREDENTIAL',
        payload: {
          accessToken: access_token, refreshToken: refresh_token, exp: respExp,
        },
      });
    }
    return access_token;
  } catch (err) {
    if (dispatcher) {
      dispatcher({
        type: 'RESET_CREDENTIAL',
      });
    }
    if (onFailure) onFailure();
  }
};

const getCurrentTime = () => {
  return Math.floor(Date.now() / 1000);
}
