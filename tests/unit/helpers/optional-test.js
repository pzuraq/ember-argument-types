import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { optional } from 'dummy/helpers/optional';
import { createContextPath } from '../../helpers/createContextPath';

module('Unit | Helper | optional', function(hooks) {
  setupRenderingTest(hooks);

  test('it returns and error and context when validation fails', function(assert) {
    const validatorFn = optional(['string']);

    let [message, context] = validatorFn(1, createContextPath('myArg'));
    assert.equal(
      message,
      'Expected the value to pass one of the provided validators:\nmyArg |> Expected type string but received number\nmyArg |> Expected value to equal undefined but received 1\nmyArg |> Expected value to equal null but received 1',
      'it returns the expected message with detailed errors'
    );
    assert.equal(
      context(),
      'myArg',
      'it does not update the context'
    );
  });

  test('it returns undefined when the value is allowed', function(assert) {
    const validatorFn = optional(['string']);

    assert.equal(
      validatorFn('foo', createContextPath('myArg')),
      undefined,
      'it returned undefined when provided "foo"',
    );
    assert.equal(
      validatorFn(undefined, createContextPath('myArg')),
      undefined,
      'it returned undefined when provided undefined',
    );
    assert.equal(
      validatorFn(null, createContextPath('myArg')),
      undefined,
      'it returned undefined when provided null',
    );
  });
});
