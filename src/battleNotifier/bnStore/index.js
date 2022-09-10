import { writeJsonFile, readJsonFile } from './jsonFs';
import { createParentFolder } from '../../fileUtils';
import bnStore from './bnStore';

export default bnStore({
  writeJsonFile,
  readJsonFile,
  createParentFolder,
  dateNow: () => new Date().toISOString(),
});
