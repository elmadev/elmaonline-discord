import { isSimpleLevelPattern } from './userConfig';

const matchesValue = (array, value) => {
  const matchValue = value && value.toLowerCase();
  return (
    array.length === 0 || array.some(item => item.toLowerCase() === matchValue)
  );
};

const matchesLevelPatterns = (levelPatterns, level) => {
  if (levelPatterns.length === 0) return true;

  const matchesSome = levelPatterns.some(levelPattern => {
    const useRegExp = !isSimpleLevelPattern(levelPattern);
    if (useRegExp) {
      return new RegExp(levelPattern).test(level);
    }

    const levelName = level ? level.toLowerCase() : '';
    return levelName.startsWith(levelPattern.toLowerCase());
  });

  return matchesSome;
};

const matchesAttributes = (battleAttributes, battle) => {
  return battleAttributes.every(attr => {
    return battle[attr];
  });
};

const matchesDurationRange = (
  { minDuration, maxDuration },
  durationMinutes,
) => {
  const matchesMin = minDuration === 0 || durationMinutes >= minDuration;
  const matchesMax = maxDuration === 0 || durationMinutes <= maxDuration;
  return matchesMin && matchesMax;
};

const battleMatchesConfigItem = (battle, configItem) => {
  const {
    designers,
    battleTypes,
    levelPatterns,
    battleAttributes,
    ...duration
  } = configItem;

  const matchesBattleType = matchesValue(battleTypes, battle.battleType);
  const matchesDesigner = matchesValue(designers, battle.designer);
  const matchesLevel = matchesLevelPatterns(levelPatterns, battle.level);
  const matchesBattleAttributes = matchesAttributes(battleAttributes, battle);
  const matchesDuration = matchesDurationRange(
    duration,
    battle.durationMinutes,
  );

  return (
    matchesBattleType &&
    matchesDesigner &&
    matchesLevel &&
    matchesBattleAttributes &&
    matchesDuration
  );
};

const battleMatchesConfigList = (battle, configList) =>
  configList.some(configItem => battleMatchesConfigItem(battle, configItem));

export const battleMatchesUserConfig = (battle, userConfig) =>
  battleMatchesConfigList(battle, userConfig.notifyList) &&
  !battleMatchesConfigList(battle, userConfig.ignoreList);

export const getSubscribedUserIds = async ({ battle, store }) => {
  const userConfigs = await store.getAllActive();
  const userIds = [];
  for (const userConfig of userConfigs) {
    const isSubscribed =
      userConfig.isOn && battleMatchesUserConfig(battle, userConfig);
    if (isSubscribed) {
      userIds.push(userConfig.userId);
    }
  }

  return userIds;
};
