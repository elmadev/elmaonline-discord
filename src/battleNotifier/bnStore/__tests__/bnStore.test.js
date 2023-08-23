import { describe, vi } from 'vitest';

import bnStore from '../bnStore';
import { userConfigsExample1 as exampleConfigs } from '../../testUtils';
import { mockServerApi } from '../../testUtils';
import { bnKuskiToUserConfig, userConfigToBnKuski } from '../bnModelUtils';

let store;
let api;
const testUrl = 'player/bn/';
const mockBnStore = () => bnStore({ api })(testUrl);

beforeEach(() => {
  api = mockServerApi();
});

describe('tests without a config file created yet', () => {
  beforeEach(() => {
    api.get.mockResolvedValue({ data: {} });
    store = mockBnStore();
  });

  test('get user config returns empty', async () => {
    const actual = await store.get('1');
    expect(actual).toEqual({ isOn: false, notifyList: [], ignoreList: [] });
  });

  test('set user config success', async () => {
    const userConfig = exampleConfigs['1'];
    await store.set('1', userConfig);

    const expectedConfig = userConfigToBnKuski(userConfig);
    expect(api.post).toBeCalledWith(`${testUrl}1`, expectedConfig);
  });
});

describe('toggle on/off', () => {
  beforeEach(() => {
    store = mockBnStore();
  });

  test('toggle off', async () => {
    await store.toggleIsOn('1', false);
    expect(api.post).toBeCalledWith(`${testUrl}1/toggle/0`);
  });

  test('toggle on', async () => {
    await store.toggleIsOn('1', true);
    expect(api.post).toBeCalledWith(`${testUrl}1/toggle/1`);
  });
});

describe('is user linked', () => {
  beforeEach(() => {
    store = mockBnStore();
  });

  test('user is linked', async () => {
    api.get.mockResolvedValueOnce({ data: {} });
    const actual = await store.isUserLinked('1');
    expect(actual).toBe(true);
  });

  test('user is not linked', async () => {
    api.get.mockResolvedValueOnce({ data: null });
    const actual = await store.isUserLinked('1');
    expect(actual).toBe(false);
  });
});

describe('tests with a config file already created', () => {
  describe('test get user config', () => {
    beforeEach(() => {
      store = mockBnStore();
    });

    test('get user config from user', async () => {
      api.get.mockResolvedValueOnce({
        data: userConfigToBnKuski(exampleConfigs['1']),
      });
      const actual = await store.get('1');
      expect(actual).toEqual(exampleConfigs['1']);
    });

    test('get all configs', async () => {
      const data = [];
      Object.keys(exampleConfigs).forEach(key => {
        data.push({
          DiscordId: key,
          ...userConfigToBnKuski(exampleConfigs[key]),
        });
      });
      api.get.mockResolvedValueOnce({ data });
      const result = await store.getAllActive();
      expect(result).toEqual(data.map(user => bnKuskiToUserConfig(user)));
    });
  });

  describe('set new user config', () => {
    beforeEach(() => {
      store = mockBnStore();
    });

    test('with no values', async () => {
      const newConfig = {};
      await store.set('100', newConfig);

      const expectedArg = { BnEnabled: 0, BnKuskiRules: [] };
      expect(api.post).toHaveBeenLastCalledWith(`${testUrl}100`, expectedArg);
    });

    test('set new config with values', async () => {
      const newConfig = {
        notifyList: [
          {
            battleTypes: ['Speed', 'Finish Count'],
            designers: ['Pab', 'Sla'],
          },
        ],
      };
      await store.set('100', newConfig);

      const expectedArg = userConfigToBnKuski({
        notifyList: newConfig.notifyList,
      });
      expect(api.post).toHaveBeenLastCalledWith(`${testUrl}100`, expectedArg);
    });
  });
});
