const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const targets = [path.join(root, 'index.html'), path.join(root, 'assets')];
const forbidden = [
  '台词',
  '评委',
  '答辩',
  '演示优先',
  '内部演示',
  '演示数据',
  '模拟扫码',
  '施工裁判',
  '当前讲解',
  '赛前冲刺',
  '对照稿子',
  '注入示例',
];
const extensions = new Set(['.html', '.js', '.css']);

function collect(target) {
  const stat = fs.statSync(target);
  if (stat.isFile()) return [target];
  return fs.readdirSync(target, { withFileTypes: true }).flatMap((entry) => {
    if (entry.name === 'vendor') return [];
    return collect(path.join(target, entry.name));
  });
}

const findings = [];
for (const file of targets.flatMap(collect).filter((item) => extensions.has(path.extname(item)))) {
  const lines = fs.readFileSync(file, 'utf8').split(/\r?\n/);
  lines.forEach((line, index) => {
    forbidden.forEach((word) => {
      if (line.includes(word)) {
        findings.push(`${path.relative(root, file)}:${index + 1} 发现“${word}”`);
      }
    });
  });
}

if (findings.length) {
  console.error('正式界面文案检查失败：');
  findings.forEach((finding) => console.error(`- ${finding}`));
  process.exit(1);
}

console.log('正式界面文案检查通过。');
