const path = require('path');

module.exports = appInfo => {
    console.log("from default");
    const exports = {}
    exports.keys = "King";
    exports.middleware = ['gzip'];
    exports.gzip = {
        threshold: 1024,
    };
    exports.static = {
        prefix: "/public/",
        dir: path.join(appInfo.baseDir, '/app/public'),
        dynamic: true,
        preload: false,
        msxAge: 31536000
    };
    return exports;
}
