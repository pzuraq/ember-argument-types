import { helper } from '@ember/component/helper';
import { createShapeValidator } from '../-private/validators';

export function shapeOf(_, shape) {
  return createShapeValidator(shape);
}

export default helper(shapeOf);
