import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { arrayOf } from 'dummy/helpers/array-of';
import { createContextPath } from '../../helpers/createContextPath';

module('Unit | Helper | array-of', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.validatorFn = arrayOf(['string']);
  });

  test('it returns and error and updated context when a property fails', function(assert) {
    let [message, context] = this.validatorFn(undefined, createContextPath('myArg'));
    assert.equal(
      message,
      'Expected type array but received undefined',
      'it returns the expected error message when provided a non array'
    );
    assert.equal(
      context(),
      'myArg',
      'it does not update the context when provided a non array'
    );

    [message, context] = this.validatorFn(['test', true], createContextPath('myArg'));
    assert.equal(
      message,
      'Expected type string but received boolean',
      'it returns the expected error message when an array item is invalid'
    );
    assert.equal(
      context(),
      'myArg.1',
      'it updates the context to point at the index of the invalid array item'
    );
  });

  test('it returns undefined when all values are valid', function(assert) {
    assert.equal(
      this.validatorFn(['foo', 'bar'], createContextPath('myArg')),
      undefined,
      'it returned undefined when provided a valid array',
    );
  });
});
