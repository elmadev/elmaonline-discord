/* eslint-disable prettier/prettier */
// default config, this file should not be changed unless you are adding a new key
export default {
  // Node.js app
  port: process.env.PORT || 3003,

  // Discord, with no token it will not attempt to connect
  // to test locally create own server and bot
  // see: https://discordjs.guide/preparations/setting-up-a-bot-application.html
  discord: {
    token: '',
    clientId: '',
    clientSecret: '',
    channels: {
      battle: '',
      times: '',
      events: '',
      admin: '',
    },
    apiAuth: '',
    url: 'https://test.elma.online/',
    icons: {
      started: '',
      queue: '',
      results: '',
      ended: '',
    },
    prefix: '!',
    bn: {
      storePath: '../bn/bn.store.json',
      logsPath: '../bn/logs/',
      fallbackChannelId: '219884674330132480',
    },
  },
};
