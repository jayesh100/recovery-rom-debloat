#recovery-rom-debloat
Node script which generates a recovery zip to remove bloatware from ROM. Useful for Android users who flash ROMs often and dislike having excessive apps on their phone.

#Disclaimer
This script is intended for those who mess around with their Android devices regularly, if you do not know words like _flashing, ROMs, bricking or bootlooping_ - this is *NOT* for you!

This has been tested on an S5 (klte) running Oreo ([ROM here](https://forum.xda-developers.com/galaxy-s5/unified-development/rom-resurrection-remix-os-6-0-0-t3762443)). Flash at your own risk!

#Usage
0. Make sure you have `node` and `zip` installed
1. Run `npm i`
2. Ensure `./src/removalApps.mjs` and `./src/dirs/*` contain all directories which you want removed after flashing the zip
3. `npm run create`
4. Copy zip from `./build/removal.zip` onto phone and flash through recovery
