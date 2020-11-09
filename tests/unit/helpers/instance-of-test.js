import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { instanceOf } from 'dummy/helpers/instance-of';
import { createContextPath } from '../../helpers/createContextPath';

class MyClass {
  foo = 'bar';
}

module('Unit | Helper | instance-of', function(hooks) {
  setupRenderingTest(hooks);

  test('it returns and error when the instance of check fails', function(assert) {
    let [message] = instanceOf([MyClass])(undefined, createContextPath('myArg'));
    assert.equal(
      message,
      'Expected value to be an instance of MyClass but received undefined',
      'it returns the expected error message when provided a non array'
    );

    [message] = instanceOf([MyClass])('10/10/2020', createContextPath('myArg'));
    assert.equal(
      message,
      'Expected value to be an instance of MyClass but received "10/10/2020"',
      'it '
    );
  });

  test('it returns undefined when the value is an instance of the class', function(assert) {
    assert.equal(
      instanceOf([MyClass])(new MyClass(), createContextPath('myArg')),
      undefined,
      'it returned undefined when provided an instance of the class',
    );
  });
});
