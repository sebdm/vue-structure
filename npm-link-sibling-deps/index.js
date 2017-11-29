"use strict";

const shelljs = require("shelljs");
const path = require("path");
const fs = require("fs");
const rimraf = require("rimraf");

module.exports = function linkSiblingDeps(options) {
  const startingInSibling = fs.existsSync(
    path.join(options.startingDirectory, "package.json")
  );
  const startingInName = !startingInSibling
    ? null
    : JSON.parse(
        fs.readFileSync(path.join(options.startingDirectory, "package.json"))
      ).name;
  const topDirectories =
    options.topFoldersAbsolute === true
      ? options.topFolders
      : options.topFolders.map(d => path.join(options.topFoldersRoot, d));

  const packages = {};
  const hasLinked = {};

  topDirectories.forEach(topDirectory => {
    fs
      .readdirSync(topDirectory)
      .filter(file => fs.statSync(path.join(topDirectory, file)).isDirectory())
      .filter(file => {
        return fs.existsSync(path.join(topDirectory, file, "package.json"));
      })
      .map(file => {
        let pkgJson = JSON.parse(
          fs.readFileSync(path.join(topDirectory, file, "package.json"))
        );
        let name = pkgJson.name;
        return {
          name,
          path: path.join(topDirectory, file),
          siblingDeps: [],
          pkgJson
        };
      })
      .reduce((o, pkg) => {
        return Object.assign(o, { [pkg.name]: pkg });
      }, packages);
  });

  linkPackage(packages[startingInName]);

  function linkPackage(pkg, dependenciesOrigin = {}) {
    if (hasLinked[pkg.name]) {
      return false;
    }

    hasLinked[pkg.name] = true;

    const deps = pkg.pkgJson.dependencies;
    const devDeps = pkg.pkgJson.devDependencies;

    if (!dependenciesOrigin[pkg.name]) {
      dependenciesOrigin[pkg.name] = {
        full: pkg.path,
        modulePath: pkg.path,
        module: pkg.name
      };
    }

    const ownDependenciesOrigin = getDependenciesOriginPathMap(
      pkg.path,
      pkg.pkgJson.dependencies,
      packages
    );
    Object.assign(
      ownDependenciesOrigin,
      getDependenciesOriginPathMap(
        pkg.path,
        pkg.pkgJson.devDependencies,
        packages
      )
    );

    for (let key in ownDependenciesOrigin) {
      if (dependenciesOrigin[key]) {
        ownDependenciesOrigin[key] = dependenciesOrigin[key];
      } else {
        dependenciesOrigin[key] = ownDependenciesOrigin[key];
      }
    }

    if (deps) {
      for (let key in deps) {
        if (packages[key]) {
          linkPackage(packages[key], dependenciesOrigin);
          if (pkg.siblingDeps.indexOf(key) < 0) {
            pkg.siblingDeps.push(key);
          }
        }
      }
    }

    if (devDeps) {
      for (let key in devDeps) {
        if (packages[key]) {
          linkPackage(packages[key], dependenciesOrigin);
          if (pkg.siblingDeps.indexOf(key) < 0) {
            pkg.siblingDeps.push(key);
          }
        }
      }
    }

    if (!fs.existsSync(path.join(pkg.path, "node_modules"))) {
      fs.mkdirSync(path.join(pkg.path, "node_modules"));
    }

    console.log(
      "==============================================================================="
    );

    console.log(pkg.name);

    let uninstalledExternalpackagesString = Object.keys(ownDependenciesOrigin)
      .filter(function(key) {
        if (fs.existsSync(path.join(pkg.path, "node_modules", key))) {
          return false;
        }

        return !packages[key];
      })
      .join(" ");

    if (uninstalledExternalpackagesString) {
      console.log("installing: ", uninstalledExternalpackagesString);

      shelljs.cd(pkg.path);
      shelljs.exec(`npm install ${uninstalledExternalpackagesString}`);
      shelljs.cd(options.topFoldersRoot);
    }

    for (var key in ownDependenciesOrigin) {
      var dep = ownDependenciesOrigin[key];
      if (dep.modulePath !== pkg.path) {
        const p = path.join(pkg.path, "node_modules", dep.module);
        rimraf.sync(p);

        console.log(
          "==============================================================================="
        );
        console.log(`from: ${p}`);
        console.log(`target: ${dep.full}`);

        try {
          fs.symlinkSync(dep.full, p, "dir");
        } catch (ex) {
          console.log("EXCEPTION");
          console.log(ex);
          console.log(dep);
        }
      }
    }

    return true;
  }

  function getDependenciesOriginPathMap(originPath, deps, packages) {
    const result = {};
    for (let key in deps) {
      if (packages[key]) {
        result[key] = {
          full: packages[key].path,
          modulePath: packages[key].path,
          module: key
        };
      } else {
        result[key] = {
          full: path.join(originPath, "node_modules", key),
          modulePath: originPath,
          module: key
        };
      }
    }

    return result;
  }
};
