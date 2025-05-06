export const Storage = {
  getData: function (name: string) {
    if (typeof window === 'undefined') return null;

    const data = localStorage.getItem(name);

    if (!data) return null;
    return JSON.parse(data);
  },

  setData: function (name: string, data: any) {
    if (typeof window === 'undefined') return;
    localStorage.setItem(name, JSON.stringify(data));
  },

  removeData: function (name: string) {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(name);
  },

  clear: function () {
    if (typeof window === 'undefined') return;
    localStorage.clear();
  },
};
