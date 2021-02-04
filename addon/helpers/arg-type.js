import { helper } from '@ember/component/helper';
import { assert } from '@ember/debug';
import { createContextPath, ensureValidator } from '../-private/utils';

export function argType([value, validator], { _path, _source }) {
  const error = ensureValidator(validator)(value, createContextPath(_path));
  if (error) {
    const [message, context] = error;
    const sourcePrefix = _source ? `${_source} |> ` : '';
    assert(`${sourcePrefix}helper:arg-type |> Property validation failure for argument "${context()}" |> ${message}`);
  }
}

export default helper(argType);
