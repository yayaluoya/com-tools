/**
 * 获取一个span的尺寸
 * 可以用这个方法获取一段文字在浏览器上显示时的尺寸
 * @param str 文字内容
 * @param style 样式
 * @returns
 */
export function getSpanRect(str: string, style: Partial<CSSStyleDeclaration> = {}) {
  let span = document.createElement('span');
  span.textContent = str;
  Object.assign(span.style, style);
  document.body.appendChild(span);
  let rect = span.getBoundingClientRect();
  span.remove();
  return rect;
}
