const arrayFromCsv = value => {
  if (!value) return [];
  return value?.split(',')?.map(item => item.trim()) ?? [];
};

const csvFromArray = arr => {
  return arr?.join(',') ?? '';
};

const bnKuskiListItemToUserConfig = values => {
  const battleTypes = arrayFromCsv(values.BattleTypes);
  const designers = arrayFromCsv(values.Designers);
  const levelPatterns = arrayFromCsv(values.LevelPatterns);
  const battleAttributes = arrayFromCsv(values.BattleAttributes);
  const minDuration = Number(values.MinDuration) || 0;
  const maxDuration = Number(values.MaxDuration) || 0;
  return {
    battleTypes,
    designers,
    levelPatterns,
    battleAttributes,
    minDuration,
    maxDuration,
  };
};

const bnKuskiListToUserConfig = list => {
  return list.map(item => bnKuskiListItemToUserConfig(item));
};

const bnKuskiListsToUserConfig = values => {
  const notifyList = values.notifyList
    ? bnKuskiListToUserConfig(values.notifyList)
    : [];
  const ignoreList = values.ignoreList
    ? bnKuskiListToUserConfig(values.ignoreList)
    : [];
  return { notifyList, ignoreList };
};

/**
 * Parse incoming data from the API to our local UserConfig model.
 */
export const bnKuskiToUserConfig = values => {
  const kuskiIndex = values.KuskiIndex;
  const userId = values.DiscordId;
  const isOn = values.BnEnabled === 1;

  const notifyList =
    values.BnKuskiRules?.filter(item => !item.IgnoreList) ?? [];
  const ignoreList = values.BnKuskiRules?.filter(item => item.IgnoreList) ?? [];
  const lists = bnKuskiListsToUserConfig({ notifyList, ignoreList });

  return { kuskiIndex, userId, isOn, ...lists };
};

const userConfigListItemToBnKuski = (values, isIgnoreList) => {
  const BattleTypes = csvFromArray(values.battleTypes);
  const Designers = csvFromArray(values.designers);
  const LevelPatterns = csvFromArray(values.levelPatterns);
  const BattleAttributes = csvFromArray(values.battleAttributes);
  const MinDuration = values.minDuration ?? 0;
  const MaxDuration = values.maxDuration ?? 0;
  const IgnoreList = isIgnoreList ? 1 : 0;
  return {
    BattleTypes,
    Designers,
    LevelPatterns,
    BattleAttributes,
    MinDuration,
    MaxDuration,
    IgnoreList,
  };
};

const userConfigListToBnKuski = (list, isIgnoreList) => {
  return list.map(item => userConfigListItemToBnKuski(item, isIgnoreList));
};

const userConfigListsToBnKuskiRules = values => {
  const notifyList = values.notifyList
    ? userConfigListToBnKuski(values.notifyList, false)
    : [];
  const ignoreList = values.ignoreList
    ? userConfigListToBnKuski(values.ignoreList, true)
    : [];
  return [...notifyList, ...ignoreList];
};

export const userConfigToBnKuski = values => {
  const KuskiIndex = values.kuskiIndex;
  const DiscordId = values.userId;
  const BnEnabled = values.isOn ? 1 : 0;
  const notifyList = values.notifyList ?? [];
  const ignoreList = values.ignoreList ?? [];
  const BnKuskiRules = userConfigListsToBnKuskiRules({
    notifyList,
    ignoreList,
  });

  return { KuskiIndex, DiscordId, BnEnabled, BnKuskiRules };
};
