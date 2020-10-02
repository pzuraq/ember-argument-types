import { helper } from "@ember/component/helper";
import { createUnionOfValidator } from '../-private/validators';

export function optional([validator]) {
  return createUnionOfValidator([validator, 'undefined', 'null']);
}

export default helper(optional);
