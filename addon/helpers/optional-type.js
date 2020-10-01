import { helper } from "@ember/component/helper";
import { createUnionOfValidator } from '../-private/validators';

export function optionalType([validator]) {
  return createUnionOfValidator([validator, 'undefined', 'null']);
}

export default helper(optionalType);
