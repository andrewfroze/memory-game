/**
 * @template {keyof HTMLElementTagNameMap} T
 * @param {T} tagName
 * @param {Partial<HTMLElementTagNameMap[T]>} [attributes]
 * @returns {HTMLElementTagNameMap[T]}
 */
function createElement(tagName, attributes = {}) {
  const element = document.createElement(tagName);

  Object.assign(element, attributes);

  return element;
}

export { createElement }