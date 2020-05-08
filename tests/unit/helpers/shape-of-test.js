import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { shapeOf } from 'dummy/helpers/shape-of';
import { createContextPath } from '../../helpers/createContextPath';

module('Unit | Helper | shape-of', function(hooks) {
  setupRenderingTest(hooks);

  test('it returns and error and updated context when a property fails', function(assert) {
    const validatorFn = shapeOf([], { hello: 'boolean' });

    let [message, context] = validatorFn(undefined, createContextPath('myArg'));
    assert.equal(
      message,
      'Expected type object but received undefined',
      'it returns the expected error message when provided a non object'
    );
    assert.equal(
      context(),
      'myArg',
      'it does not update the context when provided a non object'
    );

    [message, context] = validatorFn({}, createContextPath('myArg'));
    assert.equal(
      message,
      'Expected type boolean but received undefined',
      'it returns the expected error message when an expected property is missing'
    );
    assert.equal(
      context(),
      'myArg.hello',
      'it updates the context when an expected property is missing'
    );

    [message, context] = validatorFn({ hello: 'world' }, createContextPath('myArg'));
    assert.equal(
      message,
      'Expected type boolean but received string',
      'it returns the expected error message when an expected property is invalid'
    );
    assert.equal(
      context(),
      'myArg.hello',
      'it updates the context when an expected property is invalid'
    );
  });

  test('it returns undefined when the shape matches', function(assert) {
    const validatorFn = shapeOf([], {
      foo: 'boolean',
      bar: 'null',
    });

    assert.equal(
      validatorFn({ foo: true, bar: null }, createContextPath('myArg')),
      undefined,
      'it returned undefined when provided a matching shape',
    );
  });
});
