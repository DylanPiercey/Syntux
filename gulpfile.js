var fs = require("fs"),
    gulp = require("gulp"),
    cssmin = require("cssmin");
    jsReg = /\.js$/,
    cssReg = /\.css$/;
    highlightDir = __dirname + "/node_modules/highlight.js",

    languageTemplate = fs.readFileSync(__dirname + "/lib/language.js", "utf8"),
    languages = fs.readdirSync(highlightDir + "/lib/languages")
      .filter(jsReg.test.bind(jsReg))
      .map(function (file) { return file.replace(jsReg, "") }),

    styleTemplate = fs.readFileSync(__dirname + "/lib/style.js", "utf8"),
    styles = fs.readdirSync(highlightDir + "/styles")
      .filter(cssReg.test.bind(cssReg))
      .map(function (file) { return file.replace(cssReg, "") });

try { fs.mkdirSync(__dirname + "/style"); } catch (e) {}

gulp.task("build", function() {
  styles.forEach(function (name) {
    var css = JSON.stringify(cssmin(fs.readFileSync(highlightDir + "/styles/" + name + ".css", "utf8")));
    fs.writeFileSync(__dirname + "/style/" + name + ".js",
      styleTemplate
        .replace(/__style__/g, JSON.stringify(
          fs.readFileSync(highlightDir + '/styles/' + name + '.css').toString()
        ))
    );
  })

  languages.forEach(function (name) {
    fs.writeFileSync(__dirname + "/" + name + ".js",
      languageTemplate
        .replace(/__language__/g, JSON.stringify(name))
        .replace(/__parser__/g, "require(\"highlight.js/lib/languages/" + name + ".js\")")
    );
  });
});
