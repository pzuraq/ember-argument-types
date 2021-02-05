/* eslint-env node */
'use strict';

/*
  File: components/test.hbs
  ```hbs
  {{arg-type @myArg "string"}}
  ```
  becomes
  ```hbs
  {{arg-type @myArg "string" _path="@myArg" _source="components/test.hbs"}}
  ```
*/

module.exports = class SetTransform {
  transform(ast) {
    let b = this.syntax.builders;

    function transformNode(node) {
      // Ensure we only change arg-type helpers
      if (node.path.original !== 'arg-type' || node.path.type !== 'PathExpression') {
        return;
      }

      // Apply named arguments on the helper to aid debugging in the case of assert failures
      node.hash.pairs.push(
        b.pair('_path', b.string(node.params[0].original)),
        b.pair('_source', b.string(ast.loc.source)),
      )
    }

    this.syntax.traverse(ast, {
      SubExpression: transformNode,
      MustacheStatement: transformNode,
    });

    return ast;
  }
};
