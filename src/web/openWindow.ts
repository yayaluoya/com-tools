/**
 * 打开一个新页面
 * @param url 页面地址
 * @param opt 选项
 */
export function openWindow(
  url: string,
  opt?: { target?: string; noopener?: boolean; noreferrer?: boolean },
) {
  const { target = '__blank', noopener = true, noreferrer = true } = opt || {};
  const feature: string[] = [];

  noopener && feature.push('noopener=yes');
  noreferrer && feature.push('noreferrer=yes');

  window.open(url, target, feature.join(','));
}
