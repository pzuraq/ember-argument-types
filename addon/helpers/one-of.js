import { helper } from '@ember/component/helper';
import { createOneOfValidator } from '../-private/validators';

export function oneOf(validators) {
  return createOneOfValidator(validators);
}

export default helper(oneOf);
