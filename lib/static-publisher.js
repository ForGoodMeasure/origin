const async = require('async');
const fs = require('fs');
const exec = require('child_process').exec;

module.exports.makeRoutes = function makeRoutes(config, routes) {

  const PORT = config.global.port;
  const APP_ID = config.global.app_id;
  const ROUTES = config.staticRouteConfig.routes;

  function writeRoute(route, cb) {
    exec(
      `curl -H 'x-static-publisher: true' localhost:${ PORT }${ route }`,
      function(error, stdout, stderr) {
        if (error) {
          process.stderr.write(error);
          return cb(error, null);
        }
        const routeName = route === '/' ? '/index.html' : route;
        fs.writeFileSync(`${ __dirname }/../dist/assets${ routeName }`, stdout);
        process.stdout.write('\t- ' + routeName + '\n');
        cb(null, 'ok');
      }
    );
  }

  function checkServiceHealth(cb) {
    exec(`curl localhost:${ PORT }/health`, function(error, stdout, stderr) {
      if (stdout !== APP_ID) {
        process.stderr.write('Server process is not healthy. Exiting\n');
        return cb('Server Unhealthy');
      }
      return cb(null, 'ok');
    });
  }

  console.log('Creating Static Page Snapshots');

  async.auto({
    checkServiceHealth,
    writeRoute: [
      'checkServiceHealth',
      (results, cb) => async.map(ROUTES, writeRoute, cb)
    ]
  }, (err, res) => {
    if (err) {
      return console.log(err);
    }
    console.log('Success!');
  });
}
