import { A } from '@ember/array';
import EmberObject from '@ember/object';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Helper | arg-type', function(hooks) {
  setupRenderingTest(hooks);

  test('it validates base types', async function(assert) {
    this.value = '';
    this.validator = 'any';
    await render(hbs`{{arg-type this.value this.validator path="myArg"}}`);
    assert.ok(true, 'it didnt throw an error');
    this.setProperties({
      validator: 'boolean',
      value: true,
    });
    assert.ok(true, 'it didnt throw an error');
    this.setProperties({
      validator: 'function',
      value() {},
    });
    assert.ok(true, 'it didnt throw an error');
    this.setProperties({
      validator: 'null',
      value: null,
    });
    assert.ok(true, 'it didnt throw an error');
    this.setProperties({
      validator: 'number',
      value: 20,
    });
    assert.ok(true, 'it didnt throw an error');
    this.setProperties({
      validator: 'object',
      value: {},
    });
    assert.ok(true, 'it didnt throw an error');
    this.setProperties({
      validator: 'string',
      value: 'test',
    });
    assert.ok(true, 'it didnt throw an error');
    this.setProperties({
      validator: 'symbol',
      value: Symbol(),
    });
    assert.ok(true, 'it didnt throw an error');
    this.setProperties({
      validator: 'undefined',
      value: undefined,
    });
    assert.ok(true, 'it didnt throw an error');
  });

  module('shape-of', function() {
    test('it validates objects with shape-of', async function(assert) {
      this.value = {
        a: NaN,
        b: true,
        c() {},
        d: null,
        e: 10,
        f: {},
        g: 'test',
        h: Symbol(),
        i: undefined,
      };
      this.validator = 'any';
      await render(hbs`
        {{arg-type
          this.value
          (shape-of
            a="any"
            b="boolean"
            c="function"
            d="null"
            e="number"
            f="object"
            g="string"
            h="symbol"
            i="undefined"
          )
        }}
      `);
      assert.ok(true, 'it didnt throw an error');
    });
    test('it validates nested objects with nested shape-of', async function(assert) {
      this.value = {
        foo: {
          bar: 'test',
          baz: {
            biz: 10,
          },
        },
      };
      this.validator = 'any';
      await render(hbs`
        {{arg-type
          this.value
          (shape-of
            foo=(shape-of
              bar="string"
              baz=(shape-of
                biz="number"
              )
            )
          )
        }}
      `);
      assert.ok(true, 'it didnt throw an error');
    });
    test('it validates ember objects with shape-of', async function(assert) {
      this.value = EmberObject.create({
        name: 'Foo'
      });
      await render(hbs`
        {{arg-type
          this.value
          (shape-of
            name="string"
          )
        }}
      `);
      assert.ok(true, 'it didnt throw an error');
    });
  });

  module('array-of', function() {
    test('it validates arrays with array-of', async function(assert) {
      this.value = ['foo', 'bar', 'biz'];
      await render(hbs`
      {{arg-type this.value (array-of "string")}}
    `);
      assert.ok(true, 'it didnt throw an error');
    });
    test('it validates ember arrays with array-of', async function(assert) {
      this.value = A(['foo','bar', 'biz']);
      await render(hbs`{{arg-type this.value (array-of "string")}}`);
      assert.ok(true, 'it didnt throw an error');
    });
  });

  module('one-of', function() {
    test('it validates a value against allowed values with one-of', async function(assert) {
      this.value = 'foo';
      await render(hbs`
        {{arg-type this.value (one-of "foo" true)}}
      `);
      assert.ok(true, 'it didnt throw an error for "foo""');
      this.set('value', true);
      assert.ok(true, 'it didnt throw an error for true');
    });
  });

  module('union-of', function() {
    test('it validates a value against allowed values with one-of', async function(assert) {
      this.value = 'foo';
      await render(hbs`
        {{arg-type this.value (union-of "string" (shape-of foo="string"))}}
      `);
      assert.ok(true, 'it didnt throw an error for "foo""');
      this.set('value', { foo: 'bar' });
      assert.ok(true, 'it didnt throw an error for a matching shape');
    });
  });
});
