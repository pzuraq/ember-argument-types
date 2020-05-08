import { helper } from '@ember/component/helper';
import { assert } from '@ember/debug';
import { createContextPath, ensureValidator } from '../-private/utils';

export function argType([value, validator], { path }) {
  const error = ensureValidator(validator)(value, createContextPath(path));
  if (error) {
    const [message, context] = error;
    assert(`helper:arg-type |> Property validation failure for argument "${context()}" |> ${message}`);
  }
}

export default helper(argType);
