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

  test('it validates with shape-of', async function(assert) {
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

  test('it validates nested shapes', async function(assert) {
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

  test('it validates with array-of', async function(assert) {
    this.value = ['foo', 'bar', 'biz'];
    await render(hbs`
      {{arg-type this.value (array-of "string")}}
    `);
    assert.ok(true, 'it didnt throw an error');
  });
});
