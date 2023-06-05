import { Sheet } from '../models/sheet';

export interface IGameroom {
  id: string;
  password: string;
  sheets: number[];
}
export class Gameroom implements IGameroom {
  id: string;
  password: string;
  mastersId: string;
  sheets = [];
}
