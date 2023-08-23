import { create } from 'apisauce';
import config from '../../config.js';
import bnStore from './bnStore';

const api = create({
  baseURL: config.discord.bn.serverApiUrl,
  headers: {
    Accept: 'application/json',
    'Cache-Control': 'no-cache',
    Authorization: config.discord.bn.serverApiAuth,
  },
});

export default bnStore({ api });
