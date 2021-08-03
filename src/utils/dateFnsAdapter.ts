import { isBefore as isBeforeFNS } from 'date-fns';
import { IDateUtils } from '../data/protocols/IDateUtils';

export class DateFnsAdapter implements IDateUtils {
  isBefore(date: number | Date, dateToCompare: number | Date): boolean {
    return isBeforeFNS(date, dateToCompare);
  }
}
