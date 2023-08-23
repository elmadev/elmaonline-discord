import { bnKuskiToUserConfig, userConfigToBnKuski } from '../bnModelUtils';

describe('bnKuskiToUserConfig', () => {
  test('empty object returns empty config', () => {
    const actual = bnKuskiToUserConfig({});
    const expected = {
      isOn: false,
      notifyList: [],
      ignoreList: [],
    };
    expect(actual).toEqual(expected);
  });

  test('empty strings return empty config', () => {
    const actual = bnKuskiToUserConfig({
      BnKuskiRules: [
        {
          BattleAttributes: '',
          BattleTypes: '',
          Designers: '',
          LevelPatterns: '',
          MaxDuration: null,
          MinDuration: null,
          IgnoreList: 0,
        },
      ],
    });
    const expected = {
      isOn: false,
      notifyList: [
        {
          battleAttributes: [],
          battleTypes: [],
          designers: [],
          levelPatterns: [],
          maxDuration: 0,
          minDuration: 0,
        },
      ],
      ignoreList: [],
    };
    expect(actual).toEqual(expected);
  });

  test('filled object returns filled config', () => {
    const BnKuskiRules = [
      {
        // spaces are trimmed
        BattleAttributes: 'seeOthers,      allowStarter',
        BattleTypes: 'Normal,    First Finish',
        Designers: 'John,  Adi',
        LevelPatterns: 'Pob,   JoPi',
        MaxDuration: 30,
        MinDuration: 50,
        IgnoreList: 0,
      },
      {
        BattleAttributes: 'seeOthers,allowStarter',
        BattleTypes: 'Normal,First Finish',
        Designers: 'John, Adi',
        LevelPatterns: 'Pob, JoPi',
        MaxDuration: 30,
        MinDuration: 50,
        IgnoreList: 1,
      },
    ];
    const actual = bnKuskiToUserConfig({ BnEnabled: 1, BnKuskiRules });
    const expected = {
      isOn: true,
      notifyList: [
        {
          battleAttributes: ['seeOthers', 'allowStarter'],
          battleTypes: ['Normal', 'First Finish'],
          designers: ['John', 'Adi'],
          levelPatterns: ['Pob', 'JoPi'],
          maxDuration: 30,
          minDuration: 50,
        },
      ],
      ignoreList: [
        {
          battleAttributes: ['seeOthers', 'allowStarter'],
          battleTypes: ['Normal', 'First Finish'],
          designers: ['John', 'Adi'],
          levelPatterns: ['Pob', 'JoPi'],
          maxDuration: 30,
          minDuration: 50,
        },
      ],
    };
    expect(actual).toEqual(expected);
  });
});

describe('userConfigToBnKuski', () => {
  test('empty object returns empty config', () => {
    const actual = userConfigToBnKuski({});
    const expected = {
      BnEnabled: 0,
      BnKuskiRules: [],
    };
    expect(actual).toEqual(expected);
  });

  test('filled object returns filled config', () => {
    const notifyList = [
      {
        battleAttributes: ['seeOthers', 'allowStarter'],
        battleTypes: ['Normal', 'First Finish'],
        designers: ['John', 'Adi'],
        levelPatterns: ['Pob', 'JoPi'],
        maxDuration: 30,
        minDuration: 50,
      },
    ];
    const ignoreList = [
      {
        battleAttributes: ['seeOthers', 'allowStarter'],
        battleTypes: ['Normal', 'First Finish'],
        designers: ['John', 'Adi'],
        levelPatterns: ['Pob', 'JoPi'],
        maxDuration: 30,
        minDuration: 50,
      },
    ];
    const actual = userConfigToBnKuski({ isOn: true, notifyList, ignoreList });
    const expected = {
      BnEnabled: 1,
      BnKuskiRules: [
        {
          BattleAttributes: 'seeOthers,allowStarter',
          BattleTypes: 'Normal,First Finish',
          Designers: 'John,Adi',
          LevelPatterns: 'Pob,JoPi',
          MaxDuration: 30,
          MinDuration: 50,
          IgnoreList: 0,
        },
        {
          BattleAttributes: 'seeOthers,allowStarter',
          BattleTypes: 'Normal,First Finish',
          Designers: 'John,Adi',
          LevelPatterns: 'Pob,JoPi',
          MaxDuration: 30,
          MinDuration: 50,
          IgnoreList: 1,
        },
      ],
    };
    expect(actual).toEqual(expected);
  });
});
