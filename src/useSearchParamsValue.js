import { useState, useEffect, useRef } from 'react';

/**
 * 从 URLSearchParams + fields 解析筛选初始值（内部使用，不导出）。
 *
 * @param {Object} options
 * @param {URLSearchParams} [options.searchParams]
 * @param {Array<{ name: string, label?: string }>} [options.fields]
 * @returns {{ items: Array, consumedKeys: string[] }}
 */
const parseSearchParamsValue = ({ searchParams, fields } = {}) => {
  const items = [];
  const consumedKeys = [];

  if (!searchParams || !Array.isArray(fields) || fields.length === 0) {
    return { items, consumedKeys };
  }

  fields.forEach(field => {
    const name = field?.name;
    if (!name || !searchParams.has(name)) {
      return;
    }
    const raw = searchParams.get(name);
    if (raw == null || raw === '') {
      return;
    }
    consumedKeys.push(name);
    const label = field.label != null ? field.label : name;
    items.push({
      name,
      label,
      value: { label: raw, value: raw }
    });
  });

  return { items, consumedKeys };
};

/**
 * 从 URL 参数移除已消费的 key，返回新的 URLSearchParams 或 null（无变化时）。
 * @param {URLSearchParams} searchParams
 * @param {string[]} consumedKeys
 * @returns {URLSearchParams|null}
 */
const stripConsumedUrlParams = (searchParams, consumedKeys) => {
  if (!consumedKeys?.length) {
    return null;
  }
  const next = new URLSearchParams(searchParams);
  let changed = false;
  consumedKeys.forEach(key => {
    if (next.has(key)) {
      next.delete(key);
      changed = true;
    }
  });
  return changed ? next : null;
};

/**
 * 从 searchParams 同步解析筛选初始值数组；可选在 mount 后清理已消费的 URL key。
 *
 * 不管理 Filter 的 value / defaultValue / onChange，由调用方自行 seed。
 *
 * @param {Object} options
 * @param {URLSearchParams} options.searchParams
 * @param {Function} [options.setSearchParams] - 为 function 时 strip 已消费 key（replace: true）
 * @param {Array<{ name: string, label?: string }>} options.fields
 * @returns {Array} searchParamsValue
 *
 * @example
 * const searchParamsValue = useSearchParamsValue({
 *   searchParams,
 *   setSearchParams,
 *   fields: [
 *     { name: 'userId', label: '用户Id' },
 *     { name: 'tenantId', label: '租户Id' }
 *   ]
 * });
 * const [filter, setFilter] = useState(searchParamsValue);
 */
const useSearchParamsValue = ({ searchParams, setSearchParams, fields } = {}) => {
  const snapshotRef = useRef(null);

  if (snapshotRef.current === null) {
    snapshotRef.current = parseSearchParamsValue({ searchParams, fields });
  }

  const [searchParamsValue] = useState(() => snapshotRef.current.items);

  const strippedRef = useRef(false);
  useEffect(() => {
    if (strippedRef.current) {
      return;
    }
    strippedRef.current = true;
    if (typeof setSearchParams !== 'function') {
      return;
    }
    const nextParams = stripConsumedUrlParams(searchParams, snapshotRef.current?.consumedKeys);
    if (nextParams) {
      setSearchParams(nextParams, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  return searchParamsValue;
};

export default useSearchParamsValue;
