"use strict";

var fs      = require("graceful-fs"),
    path    = require("path"),
    through = require("through2"),
    falafel = require("falafel"),

    injector = fs.readFileSync(path.join(__dirname, "inject-link.js")) + "\n\n",
    injected;

module.exports = function(file, options) {
    var dir  = path.dirname(file),
        data = "";

    return through(
        function transform(chunk, enc, done) {
            data += chunk.toString();

            done();
        },

        function flush(done) {
            if(data.indexOf(".css") === -1) {
                this.push(data);

                return done();
            }

            var out = falafel(data, function(node) {
                var require, full, url, src;

                // Filter out nodes that don't match require("... .css")
                if(node.type !== "CallExpression") {
                    return;
                }

                if(node.callee.type !== "Identifier" || node.callee.name !== "require") {
                    return;
                }

                if(node.arguments[0].type !== "Literal") {
                    return;
                }

                if(path.extname(node.arguments[0].value).toLowerCase() !== ".css") {
                    return;
                }

                // Determine URL
                require = node.arguments[0].value;
                full    = path.resolve(dir, require);

                if(!fs.existsSync(full)) {
                    throw new Error("Unable to find " + full);
                }

                url = path.relative(options.root || dir, full).replace(/\\/g, "/");
                src = "injectLink(\"" + url + "\")";

                if(!injected) {
                    src = injected = injector + src;
                }

                node.update(src);
            });
    
            this.push(out.toString());

            return done();
        }
    );
};
