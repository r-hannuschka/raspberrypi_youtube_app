const fs   = require('fs');
const path = require('path');

const links = {
    '@app-module' : path.resolve( process.cwd(), './src/app/module')
};

// create symlinks if they not exists allready
for (const key in links ) {
    if ( links.hasOwnProperty(key) ) {
        const linkName = `./node_modules/${key}`;

        try {
            fs.symlinkSync(links[key] , linkName , 'dir');
        } catch ( error ) {
            continue;
        }
    }
}
