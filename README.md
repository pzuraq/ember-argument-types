# ember-argument-types

Run-time type checking for arguments passed to an Ember template. The core use-case is components but this addon can also be used to type check models returned from a route or anything else accessible in a template. Under the hood `arg-type` leverages `assert` from `@ember/debug` so no errors will be emitted in production builds.

## Compatibility

* Ember.js v3.12 or above
* Ember CLI v2.13 or above
* Node.js v10 or above

## Installation

```no-lang
ember install ember-argument-types
```

## Usage

The arg-type helper handles type checking arguments based on the validator passed as the second argument. A validator is a special string or a function which validates an argument. See below for basic and advanced usage.

### Basic validation

Basic validation is handled by passing a string as the second argument to the `arg-type` helper.

```handlebars
{{arg-type @myArg "any"}}
{{arg-type @myArg "boolean"}}
{{arg-type @myArg "function"}}
{{arg-type @myArg "null"}}
{{arg-type @myArg "number"}}
{{arg-type @myArg "object"}}
{{arg-type @myArg "string"}}
{{arg-type @myArg "symbol"}}
{{arg-type @myArg "undefined"}}
```

### Advanced validators

Advanced validation is handled by passing a function as the second argument of the `arg-type` helper. Internally the basic validation strings are all converted to validator functions. The signature of the functions is as follows:

```typescript
interface Validator {
  (value: any): string | undefined;
}
```

Return undefined to indicate the value is valid. Return a string (reason) to indicate the value is invalid and an error will be thrown with the reason appended to the error output for debugging.

#### Included helpers

##### `array-of`

The `array-of` helper is used to validate arrays. It expects a single positional argument of a basic or advanced validator.

```handlebars
{{arg-type @myArg (array-of "string")}}
{{arg-type @myArg (array-of (shape-of firstName="string" lastName="string"))}}
```

##### `instance-of`

The `instance-of` helper is used to validate an argument is an instance of a class. it expects a single positional argument of a class.

```handlebars
{{arg-type @myArg (instance-of this.MyClass)}}
```

##### `optional`

The `optional` helper is a wrapper around the `union-of` helper. It expects a single positional argument of a basic or advanced validator and adds `null` and `undefined` as valid types.

```handlebars
{{arg-type @myArg (optional "string")}}
```

##### `one-of`

The `one-of` helper is used to validate an argument against a set of allowed values. It accepts any number of positional arguments it will use strict equality checking to ensure `@myArg` is one of the provided values.

```handlebars
{{arg-type @myArg (one-of "dark" "light")}}
```

##### `shape-of`

The `shape-of` helper is used to structurally type check an object. It expects only key word arguments whose keys represent properties in the object and whose values are a basic or advanced validator.

```handlebars
{{arg-type
  @myArg
  (shape-of
    firstName="string"
    lastName="string"
    age="number"
    hobbies=(array-of "string")
  )
}}
```

##### `union-of`

The `union-of` helper is used to allow an argument to be several types. It expects any number of positional arguments it will use to validate `@myArg` against.

```handlebars
{{arg-type @myArg (union-of "number" "string")}}
```

## Contributing

See the [Contributing](CONTRIBUTING.md) guide for details.

## License

This project is licensed under the [MIT License](LICENSE.md).
