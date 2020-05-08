/**
 * Duplicating this function here from -private/utils...
 * Not sure how to import it into tests without leaking it to host apps
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
