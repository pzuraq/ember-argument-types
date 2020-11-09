import { helper } from '@ember/component/helper';
import { createInstanceOfValidator } from '../-private/validators';

export function instanceOf([klass]) {
  return createInstanceOfValidator(klass);
}

export default helper(instanceOf);
