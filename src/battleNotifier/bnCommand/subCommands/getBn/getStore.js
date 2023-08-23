import { messages } from '../../config';

const getStore = async ({ user, store }) => {
  let response = '';
  try {
    const userConfig = await store.getAllActive();
    response = JSON.stringify(userConfig, null, 2);
  } catch (error) {
    response = messages.configNotFound;
  }

  await user.send(response);
};

export default getStore;
