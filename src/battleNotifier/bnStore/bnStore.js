import { UserConfig } from '../userConfig';
import { bnKuskiToUserConfig, userConfigToBnKuski } from './bnModelUtils';

const createBnStore =
  ({ api }) =>
  url => {
    const getAllActive = async () => {
      const response = await api.get(url);
      const result = [];
      response.data.forEach(user => {
        const parsedData = bnKuskiToUserConfig(user);
        result.push(parsedData);
      });
      return result;
    };

    const get = async userId => {
      const response = await api.get(`${url}${userId}`);
      const parsedData = response.data && bnKuskiToUserConfig(response.data);
      return parsedData && UserConfig(parsedData);
    };

    const set = async (userId, values) => {
      const newData = UserConfig(values);

      const parsedData = userConfigToBnKuski(newData);
      await api.post(`${url}${userId}`, parsedData);
    };

    const isUserLinked = async userId => {
      const response = await api.get(`${url}${userId}/linked`);
      return Boolean(response.data);
    };

    const toggleIsOn = async (userId, isOn) => {
      const value = isOn ? 1 : 0;
      await api.post(`${url}${userId}/toggle/${value}`);
    };

    return {
      url,
      get,
      set,
      getAllActive,
      toggleIsOn,
      isUserLinked,
    };
  };

export default createBnStore;
