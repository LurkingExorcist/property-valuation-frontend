import * as _ from 'lodash';

export class Utils {
  static equals = _.curry(_.isEqual);

  static formatCurrency(value: number | null | undefined) {
    return !_.isNil(value)
      ? value.toLocaleString('ru-RU', {
          style: 'currency',
          currency: 'RUB',
          minimumFractionDigits: 2,
        })
      : '';
  }
}
