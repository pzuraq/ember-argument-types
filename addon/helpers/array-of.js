import { helper } from '@ember/component/helper';
import { createArrayValidator } from '../-private/validators';

export function arrayOf([validator]) {
  return createArrayValidator(validator);
}

export default helper(arrayOf);
