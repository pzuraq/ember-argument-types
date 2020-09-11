import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { unionOf } from 'dummy/helpers/union-of';
import { createContextPath } from '../../helpers/createContextPath';

module('Unit | Helper | union-of', function(hooks) {
  setupRenderingTest(hooks);

  test('it returns and error and context when validation fails', function(assert) {
    const validatorFn = unionOf(['string', 'boolean']);

    let [message, context] = validatorFn(undefined, createContextPath('myArg'));
    assert.equal(
      message,
      'Expected the value to pass one of the provided validators:\nmyArg |> Expected type string but received undefined\nmyArg |> Expected type boolean but received undefined',
      'it returns the expected message with detailed errors'
    );
    assert.equal(
      context(),
      'myArg',
      'it does not update the context'
    );
  });

  test('it returns undefined when the value is allowed', function(assert) {
    const validatorFn = unionOf(['string', 'boolean']);

    assert.equal(
      validatorFn('foo', createContextPath('myArg')),
      undefined,
      'it returned undefined when provided "foo"',
    );
    assert.equal(
      validatorFn(true, createContextPath('myArg')),
      undefined,
      'it returned undefined when provided true',
    );
  });
});
