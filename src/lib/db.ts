// Simple JSON-based data store
interface DataStore {
  [key: string]: any;
}

let store: DataStore = {};

// Load from localStorage if available
if (typeof window !== 'undefined') {
  const stored = localStorage.getItem('app-data-store');
  if (stored) {
    store = JSON.parse(stored);
  }
}

const saveToStorage = () => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('app-data-store', JSON.stringify(store));
  }
};

export const db = {
  // Set a value
  set: (key: string, value: any) => {
    store[key] = value;
    saveToStorage();
    return { data: value, error: null };
  },

  // Get a value
  get: (key: string) => {
    return { data: store[key], error: null };
  },

  // Get multiple values
  getMany: (keys: string[]) => {
    const data = keys.map(key => store[key]).filter(Boolean);
    return { data, error: null };
  },

  // Delete a value
  delete: (key: string) => {
    delete store[key];
    saveToStorage();
    return { error: null };
  },

  // Delete multiple values
  deleteMany: (keys: string[]) => {
    keys.forEach(key => delete store[key]);
    saveToStorage();
    return { error: null };
  },

  // Get all keys matching a prefix
  getByPrefix: (prefix: string) => {
    const data = Object.entries(store)
      .filter(([key]) => key.startsWith(prefix))
      .map(([key, value]) => ({ key, value }));
    return { data, error: null };
  },

  // Get all data
  getAll: () => {
    return { data: store, error: null };
  },

  // Clear all data
  clear: () => {
    store = {};
    saveToStorage();
    return { error: null };
  },

  // Export data
  export: () => {
    return store;
  },

  // Import data
  import: (data: DataStore) => {
    store = data;
    saveToStorage();
    return { error: null };
  },
};

export default db;
