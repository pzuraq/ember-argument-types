import { helper } from '@ember/component/helper';
import { createUnionOfValidator } from '../-private/validators';

export function unionOf(validators) {
  return createUnionOfValidator(validators);
}

export default helper(unionOf);
