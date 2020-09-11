import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { oneOf } from 'dummy/helpers/one-of';
import { createContextPath } from '../../helpers/createContextPath';

module('Unit | Helper | one-of', function(hooks) {
  setupRenderingTest(hooks);

  test('it returns and error and context when validation fails', function(assert) {
    const validatorFn = oneOf(['foo', 'bar']);

    let [message, context] = validatorFn(undefined, createContextPath('myArg'));
    assert.equal(
      message,
      'Expected the value to be one of "foo", "bar" but received undefined',
      'it returns the expected error message for multiple allowed values'
    );
    assert.equal(
      context(),
      'myArg',
      'it does not update the context'
    );
  });

  test('it validates with strict equality', function(assert) {
    const validatorFn = oneOf([{}]);

    let [message, context] = validatorFn({}, createContextPath('myArg'));
    assert.equal(
      message,
      'Expected the value to be [object Object] but received [object Object]',
      'it returns the expected error message for a single allowed value'
    );
    assert.equal(
      context(),
      'myArg',
      'it does not update the context'
    );
  });

  test('it returns undefined when the value is allowed', function(assert) {
    const validatorFn = oneOf(['foo', 'bar']);

    assert.equal(
      validatorFn('foo', createContextPath('myArg')),
      undefined,
      'it returned undefined when provided an allowed value',
    );
  });
});
