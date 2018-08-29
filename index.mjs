import { exec } from 'child_process';
import fs from 'fs';
import removeApps from './src/removalApps';

const tmpScriptPath = './res/base/META-INF/com/google/android/updater-script';

Array.prototype.flatten = function () {
  const flat = (element, acc = []) => {
    if (Array.isArray(element)) {
      element.forEach(e => (acc = acc.concat(flat(e))));
      return acc;
    }
    return element;
  };
  return flat(this);
};

const buildRemovalZip = async () => {
  process.stdout.write(`Found ${removeApps.length} apps to remove`);
  process.stdout.write('\nBuilding script');
  const commands = removeApps
    .map(current => [
      `ui_print("Deleting... ${current}");`,
      `delete_recursive("${current}");`,
    ])
    .flatten();
  process.stdout.write('.');
  commands.push(`ui_print("Removed ${commands.length / 2} apps!");`);
  const defaultScript = await fs.readFileSync('./res/default.script', 'utf8');
  const removalScriptToWrite = defaultScript.split('\n');
  removalScriptToWrite.splice(
    removalScriptToWrite.findIndex(e => e === '<INSERT HERE>'),
    1,
    ...commands,
  );
  if (fs.existsSync(tmpScriptPath)) {
    fs.unlinkSync(tmpScriptPath);
  }
  process.stdout.write('.');
  fs.writeFileSync(tmpScriptPath, removalScriptToWrite.join('\n'));
  process.stdout.write('.');
  process.stdout.write('\nScript written. Packaging into zip...');
  exec(
    'cd ./res/base; zip -r ../../build/removal.zip ./',
    (error, stdout, stderr) => {
      if (stderr) {
        process.stderr.write(`Error: ${stderr}`);
      }
      if (error !== null) {
        process.stderr.write(`Error: ${error}`);
      }
      process.stdout.write(
        '\nFinished. You can find the zip inside the build directory\n',
      );
    },
  );
};

buildRemovalZip();
