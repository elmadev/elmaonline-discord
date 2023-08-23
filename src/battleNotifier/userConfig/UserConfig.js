const UserConfigListItem = item => {
  const battleTypes = item.battleTypes || [];
  const designers = item.designers || [];
  const levelPatterns = item.levelPatterns || [];
  const battleAttributes = item.battleAttributes || [];
  const minDuration = item.minDuration || 0;
  const maxDuration = item.maxDuration || 0;
  return {
    battleTypes,
    designers,
    levelPatterns,
    battleAttributes,
    minDuration,
    maxDuration,
  };
};

const UserConfigList = list => {
  return list.map(item => UserConfigListItem(item));
};

export const UserConfigLists = values => {
  const notifyList = values.notifyList ? UserConfigList(values.notifyList) : [];
  const ignoreList = values.ignoreList ? UserConfigList(values.ignoreList) : [];
  return { notifyList, ignoreList };
};

export const UserConfig = values => {
  const kuskiIndex = values.kuskiIndex;
  const userId = values.userId;
  const isOn = values.isOn !== undefined ? values.isOn : false;
  const lists = UserConfigLists({
    notifyList: values.notifyList,
    ignoreList: values.ignoreList,
  });
  return { kuskiIndex, userId, isOn, ...lists };
};
