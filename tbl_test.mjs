// Reproduce tableToMarkdown con un DOM mínimo simulado
function tableToMarkdown(rows) {
  if (!rows.length) return '';
  const esc = c => c.trim().replace(/\|/g, '\\|');
  const header = rows[0].map(esc);
  const sep = header.map(() => '---');
  const body = rows.slice(1).map(r => r.map(esc));
  const line = cells => '| ' + cells.join(' | ') + ' |';
  return [line(header), line(sep)].concat(body.map(line)).join('\n');
}
const out = tableToMarkdown([
  ['Componente','PC Local','PC Colab'],
  ['Hostname','local-cpu-host','ed355698b496'],
  ['Var','a|b','c'],
]);
console.log(out);
import assert from 'assert';
assert(out.split('\n').length === 4, 'debe haber 4 lineas');
assert(out.includes('a\\|b'), 'debe escapar el pipe');
assert(out.split('\n')[1] === '| --- | --- | --- |', 'separador GFM');
console.log('\nOK');
