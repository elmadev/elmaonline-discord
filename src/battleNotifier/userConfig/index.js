import userConfigParser from './userConfigParser';
import userConfigFormatter from './userConfigFormatter';
import { UserConfig, UserConfigLists } from './UserConfig';
import { getBattleVariations } from './battleVariations';

export default {
  parser: userConfigParser,
  formatter: userConfigFormatter,
  getBattleVariations,
  isUserConfigEmpty: userConfigFormatter.isUserConfigEmpty,
  areUserConfigListsEmpty: userConfigFormatter.areUserConfigListsEmpty,
  isSimpleLevelPattern: userConfigParser.isSimpleLevelPattern,
  UserConfig,
  UserConfigLists,
};

export { default as parser } from './userConfigParser';
export { default as formatter } from './userConfigFormatter';
export { getBattleVariations } from './battleVariations';
export { isUserConfigEmpty } from './userConfigFormatter';
export { areUserConfigListsEmpty } from './userConfigFormatter';
export { isSimpleLevelPattern } from './userConfigParser';
export { UserConfig, UserConfigLists } from './UserConfig';
