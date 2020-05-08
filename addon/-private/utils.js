import { typeOf as emberTypeOf } from '@ember/utils';
import { createTypeValidator, createEqualityValidator } from './validators';

const BASIC_VALIDATOR = {
  ANY: 'any',
  BOOLEAN: 'boolean',
  FUNCTION: 'function',
  NULL: 'null',
  NUMBER: 'number',
  OBJECT: 'object',
  STRING: 'string',
  SYMBOL: 'symbol',
  UNDEFINED: 'undefined',
};

/**
 * Helper function to make updating the context path a little cleaner
 * @param {string} path The initial context path (typically will be the argument name)
 * @returns {function} Call the function with no args to get the current context value or call the function with an
 * a string argument to append to the path
 */
export function createContextPath(path) {
  return function updateOrRetrieve(pathSegment) {
    if (!pathSegment) {
      return path;
    }
    path += `.${pathSegment}`;
    return updateOrRetrieve;
  }
}

/**
 * Ensure context is returned from all validators when an error is returned
 * @param {function} validator The validator to run against the value
 * @returns {function}
 */
function ensureContext(validator) {
  return function (value, context) {
    const error = validator(value, context);

    if (!error) {
      return undefined;
    }

    if (Array.isArray(error) && error.length === 2) {
      return error;
    }

    return [error, context];
  }
}

/**
 * Ensure a validator function is always returned when passed special key words or a custom validator
 * @param {string|function} validator Supported validator key words or a custom validator function
 * @returns {function}
 */
export function ensureValidator(validator) {
  if (typeof validator === 'string') {
    switch(validator) {
      case BASIC_VALIDATOR.ANY:
        return () => undefined;
      case BASIC_VALIDATOR.BOOLEAN:
        return ensureContext(createTypeValidator('boolean'));
      case BASIC_VALIDATOR.FUNCTION:
        return ensureContext(createTypeValidator('function'));
      case BASIC_VALIDATOR.NULL:
        return ensureContext(createEqualityValidator(null));
      case BASIC_VALIDATOR.NUMBER:
        return ensureContext(createTypeValidator('number'));
      case BASIC_VALIDATOR.OBJECT:
        return ensureContext(createTypeValidator('object'));
      case BASIC_VALIDATOR.STRING:
        return ensureContext(createTypeValidator('string'));
      case BASIC_VALIDATOR.SYMBOL:
        return ensureContext(createTypeValidator('symbol'));
      case BASIC_VALIDATOR.UNDEFINED:
        return ensureContext(createEqualityValidator(undefined));
      default:
        return function(_, context) {
          return [
            `Unsupported validator string. Expected one of ${Object.values(BASIC_VALIDATOR).join(', ')} but received ${validator}`,
            context
          ];
        }
    }
  }

  if (typeof validator === 'function') {
    return ensureContext(validator);
  }

  return function(_, context) {
    return [
      `Expected validator to be either a supported validator string (${Object.values(BASIC_VALIDATOR).join(', ')}) or a function but received ${toString(validator)}`,
      context
    ];
  }
}

/**
 * Wrapper around ember's typeOf to handle symbols like native typeof does
 * @param {any} value Any value you want to get the type of
 * @returns {string}
 */
export function typeOf(value) {
  if (typeof value === 'symbol') {
    return 'symbol';
  }

  return emberTypeOf(value);
}

/**
 * Convert any value into a string representation. Handles some edge cases but otherwise uses toString
 * @param {any} value Any value you want to convert to a string
 * @returns {string}
 */
export function toString(value) {
  if (value === null) {
    return 'null';
  }

  if (value === undefined) {
    return 'undefined';
  }

  if (Number.isNaN(value)) {
    return 'NaN';
  }

  if (typeof value === 'string') {
    return `"${value}"`;
  }

  if (typeof value.toString === 'function') {
    return value.toString();
  }

  return Object.prototype.toString.call(value);
}
