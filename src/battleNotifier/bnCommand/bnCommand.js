import logger from '../../logger';
import {
  setBn,
  getBn,
  toggleBn,
  helpBn,
  aliasBn,
  rulesBn,
  testBn,
} from './subCommands';
import { TimeOutError } from '../messageUtils';
import { emojis, messages } from './config';

const noCommandFound = async message => {
  await message.react(emojis.notFound);
  await message.channel.send(messages.seeAvailableCommands);
};

const isUserLinkedToBn = async ({ user, store }) => {
  return await store.isUserLinked(user.id);
};

export default {
  name: 'bn',
  execute: async ({ message, args, store }) => {
    const user = message.author;
    const subCommand = args && args[0] && args[0].toLowerCase();

    try {
      const isLinked = await isUserLinkedToBn({ user, store });
      if (!isLinked) {
        const notLinkedMessage = await user.send(messages.notLinked);
        await notLinkedMessage.suppressEmbeds();
        return;
      }

      if (!subCommand) {
        await setBn({ message, store });
      } else if (subCommand === 'get') {
        await getBn({ user, store, args });
      } else if (subCommand === 'on') {
        await toggleBn({ message, store, isOn: true });
      } else if (subCommand === 'off') {
        await toggleBn({ message, store, isOn: false });
      } else if (subCommand === 'help') {
        await helpBn(user);
      } else if (subCommand === 'alias') {
        await aliasBn(user);
      } else if (subCommand === 'rules') {
        await rulesBn(user);
      } else if (subCommand === 'test') {
        await testBn({ message, store });
      } else {
        await noCommandFound(message);
      }
    } catch (error) {
      console.error(error);
      const errorMessage =
        error instanceof TimeOutError
          ? error.message
          : `${messages.somethingWentWrong}\n${messages.seeAvailableCommands}`;
      user.send(errorMessage);

      logger.log({
        userName: user.username,
        userId: user.id,
        action: subCommand || 'set',
        message: error.message || error,
        stack: error.stack,
      });
    }
  },
};
