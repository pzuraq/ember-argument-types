import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { argType } from 'dummy/helpers/arg-type';

module('Unit | Helper | arg-type', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.context = { path: 'myArg' };
  });

  module('any validator', function() {
    test('it returns undefined when provided any value', function(assert) {
      assert.equal(
        argType([false, 'any'], this.context),
        undefined,
        'it didnt throw and returned undefined when provided a boolean',
      );
      assert.equal(
        argType([() => {}, 'any'], this.context),
        undefined,
        'it didnt throw and returned undefined when provided a function',
      );
      assert.equal(
        argType([null, 'any'], this.context),
        undefined,
        'it didnt throw and returned undefined when provided null',
      );
      assert.equal(
        argType([10, 'any'], this.context),
        undefined,
        'it didnt throw and returned undefined when provided a number',
      );
      assert.equal(
        argType([{}, 'any'], this.context),
        undefined,
        'it didnt throw and returned undefined when provided an object',
      );
      assert.equal(
        argType(['test', 'any'], this.context),
        undefined,
        'it didnt throw and returned undefined when provided a string',
      );
      assert.equal(
        argType([Symbol(), 'any'], this.context),
        undefined,
        'it didnt throw and returned undefined when provided a symbol',
      );
      assert.equal(
        argType([undefined, 'any'], this.context),
        undefined,
        'it didnt throw and returned undefined when provided undefined',
      );
    })
  });

  module('boolean validator', function() {
    test('it throws an error when provided non boolean', function(assert) {
      assert.throws(
        function () {
          argType([undefined, 'boolean'], this.context)
        },
        function (err) {
          return err.message === 'Assertion Failed: helper:arg-type |> Property validation failure for argument "myArg" |> Expected type boolean but received undefined';
        },
        'it throws an error when provided undefined',
      );
      assert.throws(
        function () {
          argType([null, 'boolean'], this.context)
        },
        function (err) {
          return err.message === 'Assertion Failed: helper:arg-type |> Property validation failure for argument "myArg" |> Expected type boolean but received null';
        },
        'it throws an error when provided null',
      );
      assert.throws(
        function () {
          argType([NaN, 'boolean'], this.context)
        },
        function (err) {
          return err.message === 'Assertion Failed: helper:arg-type |> Property validation failure for argument "myArg" |> Expected type boolean but received number';
        },
        'it throws an error when provided NaN',
      );
      assert.throws(
        function () {
          argType([Symbol(), 'boolean'], this.context)
        },
        function (err) {
          return err.message === 'Assertion Failed: helper:arg-type |> Property validation failure for argument "myArg" |> Expected type boolean but received symbol';
        },
        'it throws an error when provided symbol',
      );
      assert.throws(
        function () {
          argType([10, 'boolean'], this.context)
        },
        function (err) {
          return err.message === 'Assertion Failed: helper:arg-type |> Property validation failure for argument "myArg" |> Expected type boolean but received number';
        },
        'it throws an error when provided a number',
      );
      assert.throws(
        function () {
          argType(['test', 'boolean'], this.context)
        },
        function (err) {
          return err.message === 'Assertion Failed: helper:arg-type |> Property validation failure for argument "myArg" |> Expected type boolean but received string';
        },
        'it throws an error when provided a string',
      );
      assert.throws(
        function () {
          argType([() => {}, 'boolean'], this.context)
        },
        function (err) {
          return err.message === 'Assertion Failed: helper:arg-type |> Property validation failure for argument "myArg" |> Expected type boolean but received function';
        },
        'it throws an error when provided a function',
      );
      assert.throws(
        function () {
          argType([{}, 'boolean'], this.context)
        },
        function (err) {
          return err.message === 'Assertion Failed: helper:arg-type |> Property validation failure for argument "myArg" |> Expected type boolean but received object';
        },
        'it throws an error when provided an object',
      );
    });
    test('it returns undefined when provided a boolean', function(assert) {
      assert.equal(
        argType([false, 'boolean'], this.context),
        undefined,
        'it didnt throw and returned undefined when provided a boolean',
      );
    })
  });

  module('function validator', function() {
    test('it throws an error when provided non function', function(assert) {
      assert.throws(
        function () {
          argType([undefined, 'function'], this.context)
        },
        function (err) {
          return err.message === 'Assertion Failed: helper:arg-type |> Property validation failure for argument "myArg" |> Expected type function but received undefined';
        },
        'it throws an error when provided undefined',
      );
      assert.throws(
        function () {
          argType([null, 'function'], this.context)
        },
        function (err) {
          return err.message === 'Assertion Failed: helper:arg-type |> Property validation failure for argument "myArg" |> Expected type function but received null';
        },
        'it throws an error when provided null',
      );
      assert.throws(
        function () {
          argType([NaN, 'function'], this.context)
        },
        function (err) {
          return err.message === 'Assertion Failed: helper:arg-type |> Property validation failure for argument "myArg" |> Expected type function but received number';
        },
        'it throws an error when provided NaN',
      );
      assert.throws(
        function () {
          argType([Symbol(), 'function'], this.context)
        },
        function (err) {
          return err.message === 'Assertion Failed: helper:arg-type |> Property validation failure for argument "myArg" |> Expected type function but received symbol';
        },
        'it throws an error when provided symbol',
      );
      assert.throws(
        function () {
          argType([10, 'function'], this.context)
        },
        function (err) {
          return err.message === 'Assertion Failed: helper:arg-type |> Property validation failure for argument "myArg" |> Expected type function but received number';
        },
        'it throws an error when provided a number',
      );
      assert.throws(
        function () {
          argType(['test', 'function'], this.context)
        },
        function (err) {
          return err.message === 'Assertion Failed: helper:arg-type |> Property validation failure for argument "myArg" |> Expected type function but received string';
        },
        'it throws an error when provided a string',
      );
      assert.throws(
        function () {
          argType([true, 'function'], this.context)
        },
        function (err) {
          return err.message === 'Assertion Failed: helper:arg-type |> Property validation failure for argument "myArg" |> Expected type function but received boolean';
        },
        'it throws an error when provided a boolean',
      );
      assert.throws(
        function () {
          argType([{}, 'function'], this.context)
        },
        function (err) {
          return err.message === 'Assertion Failed: helper:arg-type |> Property validation failure for argument "myArg" |> Expected type function but received object';
        },
        'it throws an error when provided an object',
      );
    });
    test('it returns undefined when provided a function', function(assert) {
      assert.equal(
        argType([() => {}, 'function'], this.context),
        undefined,
        'it didnt throw and returned undefined when provided a function',
      );
    })
  });

  module('null validator', function() {
    test('it throws an error when provided non string', function(assert) {
      assert.throws(
        function () {
          argType([undefined, 'null'], this.context)
        },
        function (err) {
          return err.message === 'Assertion Failed: helper:arg-type |> Property validation failure for argument "myArg" |> Expected value to equal null but received undefined';
        },
        'it throws an error when provided undefined',
      );
      assert.throws(
        function () {
          argType([NaN, 'null'], this.context)
        },
        function (err) {
          return err.message === 'Assertion Failed: helper:arg-type |> Property validation failure for argument "myArg" |> Expected value to equal null but received NaN';
        },
        'it throws an error when provided NaN',
      );
      assert.throws(
        function () {
          argType([Symbol(), 'null'], this.context)
        },
        function (err) {
          return err.message === 'Assertion Failed: helper:arg-type |> Property validation failure for argument "myArg" |> Expected value to equal null but received Symbol()';
        },
        'it throws an error when provided symbol',
      );
      assert.throws(
        function () {
          argType([10, 'null'], this.context)
        },
        function (err) {
          return err.message === 'Assertion Failed: helper:arg-type |> Property validation failure for argument "myArg" |> Expected value to equal null but received 10';
        },
        'it throws an error when provided a number',
      );
      assert.throws(
        function () {
          argType(['hello', 'null'], this.context)
        },
        function (err) {
          return err.message === 'Assertion Failed: helper:arg-type |> Property validation failure for argument "myArg" |> Expected value to equal null but received "hello"';
        },
        'it throws an error when provided a string',
      );
      assert.throws(
        function () {
          argType([true, 'null'], this.context)
        },
        function (err) {
          return err.message === 'Assertion Failed: helper:arg-type |> Property validation failure for argument "myArg" |> Expected value to equal null but received true';
        },
        'it throws an error when provided a boolean',
      );
      assert.throws(
        function () {
          argType([() => {}, 'null'], this.context)
        },
        function (err) {
          return err.message === 'Assertion Failed: helper:arg-type |> Property validation failure for argument "myArg" |> Expected value to equal null but received () => {}';
        },
        'it throws an error when provided a function',
      );
      assert.throws(
        function () {
          argType([{}, 'null'], this.context)
        },
        function (err) {
          return err.message === 'Assertion Failed: helper:arg-type |> Property validation failure for argument "myArg" |> Expected value to equal null but received [object Object]';
        },
        'it throws an error when provided an object',
      );
    });
    test('it returns undefined when provided null', function(assert) {
      assert.equal(
        argType([null, 'null'], this.context),
        undefined,
        'it didnt throw and returned undefined when provided null',
      );
    })
  });

  module('number validator', function() {
    test('it throws an error when provided non string', function(assert) {
      assert.throws(
        function () {
          argType([undefined, 'number'], this.context)
        },
        function (err) {
          return err.message === 'Assertion Failed: helper:arg-type |> Property validation failure for argument "myArg" |> Expected type number but received undefined';
        },
        'it throws an error when provided undefined',
      );
      assert.throws(
        function () {
          argType([null, 'number'], this.context)
        },
        function (err) {
          return err.message === 'Assertion Failed: helper:arg-type |> Property validation failure for argument "myArg" |> Expected type number but received null';
        },
        'it throws an error when provided null',
      );
      assert.throws(
        function () {
          argType([Symbol(), 'number'], this.context)
        },
        function (err) {
          return err.message === 'Assertion Failed: helper:arg-type |> Property validation failure for argument "myArg" |> Expected type number but received symbol';
        },
        'it throws an error when provided symbol',
      );
      assert.throws(
        function () {
          argType(['test', 'number'], this.context)
        },
        function (err) {
          return err.message === 'Assertion Failed: helper:arg-type |> Property validation failure for argument "myArg" |> Expected type number but received string';
        },
        'it throws an error when provided a string',
      );
      assert.throws(
        function () {
          argType([true, 'number'], this.context)
        },
        function (err) {
          return err.message === 'Assertion Failed: helper:arg-type |> Property validation failure for argument "myArg" |> Expected type number but received boolean';
        },
        'it throws an error when provided a boolean',
      );
      assert.throws(
        function () {
          argType([() => {}, 'number'], this.context)
        },
        function (err) {
          return err.message === 'Assertion Failed: helper:arg-type |> Property validation failure for argument "myArg" |> Expected type number but received function';
        },
        'it throws an error when provided a function',
      );
      assert.throws(
        function () {
          argType([{}, 'number'], this.context)
        },
        function (err) {
          return err.message === 'Assertion Failed: helper:arg-type |> Property validation failure for argument "myArg" |> Expected type number but received object';
        },
        'it throws an error when provided an object',
      );
    });
    test('it returns undefined when provided a number', function(assert) {
      assert.equal(
        argType([10, 'number'], this.context),
        undefined,
        'it didnt throw and returned undefined when provided a number',
      );
      assert.equal(
        argType([NaN, 'number'], this.context),
        undefined,
        'it didnt throw and returned undefined when provided NaN',
      );
    })
  });

  module('object validator', function() {
    test('it throws an error when provided non string', function(assert) {
      assert.throws(
        function () {
          argType([undefined, 'object'], this.context)
        },
        function (err) {
          return err.message === 'Assertion Failed: helper:arg-type |> Property validation failure for argument "myArg" |> Expected type object but received undefined';
        },
        'it throws an error when provided undefined',
      );
      assert.throws(
        function () {
          argType([Symbol(), 'object'], this.context)
        },
        function (err) {
          return err.message === 'Assertion Failed: helper:arg-type |> Property validation failure for argument "myArg" |> Expected type object but received symbol';
        },
        'it throws an error when provided symbol',
      );
      assert.throws(
        function () {
          argType(['test', 'object'], this.context)
        },
        function (err) {
          return err.message === 'Assertion Failed: helper:arg-type |> Property validation failure for argument "myArg" |> Expected type object but received string';
        },
        'it throws an error when provided a string',
      );
      assert.throws(
        function () {
          argType([10, 'object'], this.context)
        },
        function (err) {
          return err.message === 'Assertion Failed: helper:arg-type |> Property validation failure for argument "myArg" |> Expected type object but received number';
        },
        'it throws an error when provided a number',
      );
      assert.throws(
        function () {
          argType([true, 'object'], this.context)
        },
        function (err) {
          return err.message === 'Assertion Failed: helper:arg-type |> Property validation failure for argument "myArg" |> Expected type object but received boolean';
        },
        'it throws an error when provided a boolean',
      );
      assert.throws(
        function () {
          argType([() => {}, 'object'], this.context)
        },
        function (err) {
          return err.message === 'Assertion Failed: helper:arg-type |> Property validation failure for argument "myArg" |> Expected type object but received function';
        },
        'it throws an error when provided a function',
      );
    });
    test('it returns undefined when provided a number', function(assert) {
      assert.equal(
        argType([{}, 'object'], this.context),
        undefined,
        'it didnt throw and returned undefined when provided an object',
      );
      assert.equal(
        argType([null, 'object'], this.context),
        undefined,
        'it didnt throw and returned undefined when provided null',
      );
    })
  });

  module('string validator', function() {
    test('it throws an error when provided non string', function(assert) {
      assert.throws(
        function () {
          argType([undefined, 'string'], this.context)
        },
        function (err) {
          return err.message === 'Assertion Failed: helper:arg-type |> Property validation failure for argument "myArg" |> Expected type string but received undefined';
        },
        'it throws an error when provided undefined',
      );
      assert.throws(
        function () {
          argType([null, 'string'], this.context)
        },
        function (err) {
          return err.message === 'Assertion Failed: helper:arg-type |> Property validation failure for argument "myArg" |> Expected type string but received null';
        },
        'it throws an error when provided null',
      );
      assert.throws(
        function () {
          argType([NaN, 'string'], this.context)
        },
        function (err) {
          return err.message === 'Assertion Failed: helper:arg-type |> Property validation failure for argument "myArg" |> Expected type string but received number';
        },
        'it throws an error when provided NaN',
      );
      assert.throws(
        function () {
          argType([Symbol(), 'string'], this.context)
        },
        function (err) {
          return err.message === 'Assertion Failed: helper:arg-type |> Property validation failure for argument "myArg" |> Expected type string but received symbol';
        },
        'it throws an error when provided symbol',
      );
      assert.throws(
        function () {
          argType([10, 'string'], this.context)
        },
        function (err) {
          return err.message === 'Assertion Failed: helper:arg-type |> Property validation failure for argument "myArg" |> Expected type string but received number';
        },
        'it throws an error when provided a number',
      );
      assert.throws(
        function () {
          argType([true, 'string'], this.context)
        },
        function (err) {
          return err.message === 'Assertion Failed: helper:arg-type |> Property validation failure for argument "myArg" |> Expected type string but received boolean';
        },
        'it throws an error when provided a boolean',
      );
      assert.throws(
        function () {
          argType([() => {}, 'string'], this.context)
        },
        function (err) {
          return err.message === 'Assertion Failed: helper:arg-type |> Property validation failure for argument "myArg" |> Expected type string but received function';
        },
        'it throws an error when provided a function',
      );
      assert.throws(
        function () {
          argType([{}, 'string'], this.context)
        },
        function (err) {
          return err.message === 'Assertion Failed: helper:arg-type |> Property validation failure for argument "myArg" |> Expected type string but received object';
        },
        'it throws an error when provided an object',
      );
    });
    test('it returns undefined when provided a string', function(assert) {
      assert.equal(
        argType(['hello world', 'string'], this.context),
        undefined,
        'it didnt throw and returned undefined when provided a string',
      );
    })
  });

  module('symbol validator', function() {
    test('it throws an error when provided non string', function(assert) {
      assert.throws(
        function () {
          argType([undefined, 'symbol'], this.context)
        },
        function (err) {
          return err.message === 'Assertion Failed: helper:arg-type |> Property validation failure for argument "myArg" |> Expected type symbol but received undefined';
        },
        'it throws an error when provided undefined',
      );
      assert.throws(
        function () {
          argType([null, 'symbol'], this.context)
        },
        function (err) {
          return err.message === 'Assertion Failed: helper:arg-type |> Property validation failure for argument "myArg" |> Expected type symbol but received null';
        },
        'it throws an error when provided null',
      );
      assert.throws(
        function () {
          argType([NaN, 'symbol'], this.context)
        },
        function (err) {
          return err.message === 'Assertion Failed: helper:arg-type |> Property validation failure for argument "myArg" |> Expected type symbol but received number';
        },
        'it throws an error when provided NaN',
      );
      assert.throws(
        function () {
          argType([10, 'symbol'], this.context)
        },
        function (err) {
          return err.message === 'Assertion Failed: helper:arg-type |> Property validation failure for argument "myArg" |> Expected type symbol but received number';
        },
        'it throws an error when provided a number',
      );
      assert.throws(
        function () {
          argType([true, 'symbol'], this.context)
        },
        function (err) {
          return err.message === 'Assertion Failed: helper:arg-type |> Property validation failure for argument "myArg" |> Expected type symbol but received boolean';
        },
        'it throws an error when provided a boolean',
      );
      assert.throws(
        function () {
          argType([() => {}, 'symbol'], this.context)
        },
        function (err) {
          return err.message === 'Assertion Failed: helper:arg-type |> Property validation failure for argument "myArg" |> Expected type symbol but received function';
        },
        'it throws an error when provided a function',
      );
      assert.throws(
        function () {
          argType([{}, 'symbol'], this.context)
        },
        function (err) {
          return err.message === 'Assertion Failed: helper:arg-type |> Property validation failure for argument "myArg" |> Expected type symbol but received object';
        },
        'it throws an error when provided an object',
      );
    });
    test('it returns undefined when provided a symbol', function(assert) {
      assert.equal(
        argType([Symbol(), 'symbol'], this.context),
        undefined,
        'it didnt throw and returned undefined when provided a symbol',
      );
    })
  });

  module('undefined validator', function() {
    test('it throws an error when provided non string', function(assert) {
      assert.throws(
        function () {
          argType([null, 'undefined'], this.context)
        },
        function (err) {
          return err.message === 'Assertion Failed: helper:arg-type |> Property validation failure for argument "myArg" |> Expected value to equal undefined but received null';
        },
        'it throws an error when provided undefined',
      );
      assert.throws(
        function () {
          argType([NaN, 'undefined'], this.context)
        },
        function (err) {
          return err.message === 'Assertion Failed: helper:arg-type |> Property validation failure for argument "myArg" |> Expected value to equal undefined but received NaN';
        },
        'it throws an error when provided NaN',
      );
      assert.throws(
        function () {
          argType([Symbol(), 'undefined'], this.context)
        },
        function (err) {
          return err.message === 'Assertion Failed: helper:arg-type |> Property validation failure for argument "myArg" |> Expected value to equal undefined but received Symbol()';
        },
        'it throws an error when provided symbol',
      );
      assert.throws(
        function () {
          argType([10, 'undefined'], this.context)
        },
        function (err) {
          return err.message === 'Assertion Failed: helper:arg-type |> Property validation failure for argument "myArg" |> Expected value to equal undefined but received 10';
        },
        'it throws an error when provided a number',
      );
      assert.throws(
        function () {
          argType(['hello', 'undefined'], this.context)
        },
        function (err) {
          return err.message === 'Assertion Failed: helper:arg-type |> Property validation failure for argument "myArg" |> Expected value to equal undefined but received "hello"';
        },
        'it throws an error when provided a string',
      );
      assert.throws(
        function () {
          argType([true, 'undefined'], this.context)
        },
        function (err) {
          return err.message === 'Assertion Failed: helper:arg-type |> Property validation failure for argument "myArg" |> Expected value to equal undefined but received true';
        },
        'it throws an error when provided a boolean',
      );
      assert.throws(
        function () {
          argType([() => {}, 'undefined'], this.context)
        },
        function (err) {
          return err.message === 'Assertion Failed: helper:arg-type |> Property validation failure for argument "myArg" |> Expected value to equal undefined but received () => {}';
        },
        'it throws an error when provided a function',
      );
      assert.throws(
        function () {
          argType([{}, 'undefined'], this.context)
        },
        function (err) {
          return err.message === 'Assertion Failed: helper:arg-type |> Property validation failure for argument "myArg" |> Expected value to equal undefined but received [object Object]';
        },
        'it throws an error when provided an object',
      );
    });
    test('it returns undefined when provided undefined', function(assert) {
      assert.equal(
        argType([undefined, 'undefined'], this.context),
        undefined,
        'it didnt throw and returned undefined when provided undefined',
      );
    })
  });

  module('custom validators', function(hooks) {
    hooks.beforeEach(function() {
      this.simpleValidator = (value) => {
        if (value !== 'valid') {
          return 'The value must be the string "valid"';
        }
      }
      this.complexValidator = (value, context) => {
        if (value !== 'valid') {
          context('test');
          return ['The value must be the string "valid"', context];
        }
      }
    });

    test('it throws an error when the validator returns an error message', function(assert) {
      assert.throws(
        function () {
          argType(['not valid', this.simpleValidator], this.context)
        },
        function (err) {
          return err.message === 'Assertion Failed: helper:arg-type |> Property validation failure for argument "myArg" |> The value must be the string "valid"';
        },
        'it throws an error when provided an invalid value',
      );
      assert.throws(
        function () {
          argType(['not valid', this.complexValidator], this.context)
        },
        function (err) {
          return err.message === 'Assertion Failed: helper:arg-type |> Property validation failure for argument "myArg.test" |> The value must be the string "valid"';
        },
        'it throws an error when provided an invalid value',
      );
    });
    test('it returns undefined when provided undefined', function(assert) {
      assert.equal(
        argType(['valid', this.simpleValidator], this.context),
        undefined,
        'it didnt throw and returned undefined when provided a valid value',
      );
    })
  });

  module('unknown validators', function(hooks) {
    test('it throws an error when the validator string is not supported', function(assert) {
      assert.throws(
        function () {
          argType(['not valid', 'NOT SUPPORTED'], this.context)
        },
        function (err) {
          return err.message === 'Assertion Failed: helper:arg-type |> Property validation failure for argument "myArg" |> Unsupported validator string. Expected one of any, boolean, function, null, number, object, string, symbol, undefined but received NOT SUPPORTED';
        },
        'it throws an error when provided an invalid value',
      );
    });

    test('it throws an error when the validator isnt a string or function', function(assert) {
      assert.throws(
        function () {
          argType(['not valid', {}], this.context)
        },
        function (err) {
          return err.message === 'Assertion Failed: helper:arg-type |> Property validation failure for argument "myArg" |> Expected validator to be either a supported validator string (any, boolean, function, null, number, object, string, symbol, undefined) or a function but received [object Object]';
        },
        'it throws an error when provided an invalid value',
      );
    });
  });
});
