import { bnAdminIds } from '../../config';
import getUserConfig from './getUserConfig';
import getStore from './getStore';
import getLog from './getLog';

const getBn = async ({ user, store, args }) => {
  const isBnAdmin = bnAdminIds.includes(user.id);
  const option = args[1];

  if (isBnAdmin && option === 'log') {
    await getLog({ user, date: args[2] });
  } else if (isBnAdmin && option === 'store') {
    await getStore({ user, store });
  } else {
    await getUserConfig({ user, store });
  }
};

export default getBn;
