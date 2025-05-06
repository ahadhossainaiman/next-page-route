export const Session = {
  getData: function (name: string) {
    if (typeof window === 'undefined') return null;

    const data = sessionStorage.getItem(name);

    if (!data) return null;
    return JSON.parse(data);
  },

  setData: function (name: string, data: any) {
    if (typeof window === 'undefined') return;
    sessionStorage.setItem(name, JSON.stringify(data));
  },

  removeData: function (name: string) {
    if (typeof window === 'undefined') return;
    sessionStorage.removeItem(name);
  },

  clear: function () {
    if (typeof window === 'undefined') return;
    sessionStorage.clear();
  },
};
