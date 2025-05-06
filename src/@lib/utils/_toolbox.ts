export const Toolbox = {
  toLowerText: function (text: string): string {
    return text?.toLowerCase();
  },

  toCapitalizeText: function (text: string): string {
    return text
      ?.split(' ')
      ?.map((word) => word?.charAt(0)?.toUpperCase() + word?.slice(1)?.toLowerCase())
      ?.join(' ');
  },

  toUpperText: function (text: string): string {
    return text?.toUpperCase();
  },

  isEmpty: function (value: any): boolean {
    return (
      value === null ||
      value === undefined ||
      value === '' ||
      (Array.isArray(value) && value.length === 0) ||
      (typeof value === 'object' && Object.keys(value).length === 0)
    );
  },

  isNotEmpty: function (value: any): boolean {
    return (
      value !== null &&
      value !== undefined &&
      value !== '' &&
      !(Array.isArray(value) && value.length === 0) &&
      !(typeof value === 'object' && Object.keys(value).length === 0)
    );
  },

  toSafeNumber: function (value: any): number {
    return this.isNotEmpty(value) ? Number(value) : 0;
  },

  isValidObject: function (value: any): boolean {
    return typeof value === 'object' && value !== null;
  },

  toSafeObject: function (value: any): any {
    return this.isNotEmpty(value) ? value : {};
  },

  toCleanObject: function (obj: { [key: string]: any }): any {
    if (this.isValidObject(obj)) {
      Object.keys(obj).forEach((key) => {
        if (this.isEmpty(obj[key])) delete obj[key];
      });
    }

    return this.toSafeObject(obj);
  },

  toCleanArray: function <T = any>(array: T[]): T[] {
    return array.filter((x) => this.isNotEmpty(x));
  },

  slugify: function (text: string) {
    return text
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]/g, '');
  },

  debounce: function (func: (...args: any[]) => void, delay: number = 500) {
    let timeoutId: NodeJS.Timeout | undefined;

    return function (this: any, ...args: any[]) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
  },

  isDynamicPath: function (paths: any[], pathname: string): boolean {
    return paths.some((path) => {
      if (typeof path === 'string') {
        return pathname.startsWith(path);
      } else if (typeof path === 'function') {
        const pattern = new RegExp(
          path
            .toString()
            .replace(/^\/\^/, '^')
            .replace(/\/\$/, '$')
            .replace(/\\\/\(\[\?\]\)/g, '.*'),
          'i',
        );

        return pattern.test(pathname);
      } else {
        return false;
      }
    });
  },

  appendPagination: function (path: string, page = 1, limit = 10): string {
    return `${path}?page=${page}&limit=${limit}`;
  },

  parseQueryParams: function <T = any>(url: string): T {
    const queryString = url.split('?')[1];
    if (!queryString) return {} as T;

    const query: Record<string, any> = {};
    const pairs = queryString.split('&');

    for (const pair of pairs) {
      const [key, value] = pair.split('=');

      if (!value) continue;
      if (!isNaN(Number(value))) query[key] = Number(value);
      else query[key] = value;
    }

    return query as T;
  },

  queryNormalizer: function (options: any): any {
    const pureOption = this.toCleanObject(options);

    if (pureOption?.query) return options.query;

    const queries: any = [];
    Object.entries(pureOption).forEach(([key, value]: any) => {
      const valueType = Array.isArray(value) ? 'array' : typeof value;

      if (valueType === 'array') {
        return value.map((option: any) => queries.push(`${key}=${option}`));
      } else if (valueType === 'object') {
        return queries.push(`${key}=${JSON.stringify(value)}`);
      } else {
        return queries.push(`${key}=${value}`);
      }
    });

    return queries.join('&');
  },

  generateKey: function (length: number, type?: 'lower' | 'upper' | 'numeric' | 'key'): string {
    let result = '';
    const characters =
      type === 'lower'
        ? 'abcdefghijklmnopqrstuvwxyz'
        : type === 'upper'
          ? 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
          : type === 'numeric'
            ? '0123456789'
            : type === 'key'
              ? 'abcdefghijklmnopqrstuvwxyz0123456789'
              : 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const charactersLength = characters.length;

    for (let i = 0; i < length; i++) result += characters.charAt(Math.floor(Math.random() * charactersLength));

    return result;
  },

  generateSlug: function (selector: string): string {
    const sanitizeSelector = selector?.replace(/[^a-zA-Z0-9\s-]+/g, '');
    const trimSelector = sanitizeSelector?.trim();

    const key = this.generateKey(8, 'key');
    const slug = this.toLowerText(trimSelector)
      ?.replace(/\s+/g, '-')
      ?.replace(/-+/g, '-')
      ?.replace(/^-+|-+$/g, '');

    return selector && `${slug}-${key}`;
  },
};
