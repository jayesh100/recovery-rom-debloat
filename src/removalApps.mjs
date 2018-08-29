import { apps as privApps, base as privAppsBase} from './dirs/privApp';
import { apps as appApps, base as appAppsBase } from './dirs/app';

const resolvePath = (apps, base) => apps.map(e => `${base}${e}/`);

export default [].concat(
    resolvePath(privApps, privAppsBase),
    resolvePath(appApps, appAppsBase),
);
