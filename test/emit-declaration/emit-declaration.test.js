const fs = require('fs');
const compiler = require('../compiler.js');

test('Can emit valid declaration without sourceMaps', async () => {
  await compiler(require.resolve('./index.js'));

  const declaration = fs.readFileSync(
    require.resolve('./index.css.d.ts'),
    'utf-8'
  );

  expect(declaration).toMatchSnapshot();
});

test('Can emit valid declaration with sourceMap', async () => {
  await compiler(require.resolve('./index.js'), { sourceMap: true });

  const declaration = fs.readFileSync(
    require.resolve('./index.css.d.ts'),
    'utf-8'
  );

  expect(declaration).toMatchInlineSnapshot(`
"// This file is automatically generated.
// Please do not change this file!
interface CssExports {
  'otherClass': string;
  'someClass': string;
  'validClass': string;
}
declare var cssExports: CssExports;
export = cssExports;
"
`);
});

