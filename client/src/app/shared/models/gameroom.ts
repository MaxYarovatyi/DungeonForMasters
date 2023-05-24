import { Sheet } from '../models/sheet';
import { v4 as uuidv4 } from 'uuid';
export interface IGameroom {
  id: string;
  name: string;
  password: string;
  sheets: Sheet[];
}
export class Gameroom implements IGameroom {
  id = uuidv4();
  name: string;
  password: string;
  sheets = [];
}
