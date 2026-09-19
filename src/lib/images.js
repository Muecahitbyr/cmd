const modules = import.meta.glob('../assets/images/*', { eager: true, import: 'default' });

const map = {};
for (const path in modules) {
  const filename = path.split('/').pop();
  map[filename] = modules[path];
}

export function img(filename) {
  return map[filename];
}
