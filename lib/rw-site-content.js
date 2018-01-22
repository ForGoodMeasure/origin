import AWS from 'aws-sdk';
import fs from 'fs';
import async from 'async';
import dotty from 'dotty';
import packageJson from '../package.json';
import staticRoutes from '../static-routes.json';

const s3 = new AWS.S3();
const lambda = new AWS.Lambda({region: 'us-west-1'});
const CONTENT_LOCATION = `${__dirname}/../assets/content/content.json`;

const s3Params = config => ({
  Bucket: config.global.aws_s3_bucket,
  Key: 'content/content.json'
});
const errorUndefined = () => new Error('Behavior is undefined for this stage value');

function getContentFromDisc(callback) {
  fs.readFile(CONTENT_LOCATION, (err, res) => {
    if (err) {
      return callback(err);
    }
    callback(null, JSON.parse(res));
  });
}
function getContentFromS3(config, callback) {
  s3.getObject(s3Params(config), (err, res) => {
    if (err) {
      return callback(err);
    }
    const rawData = dotty.get(res, 'Body');
    callback(null, JSON.parse(rawData))
  });
}
const mergeContent = (path, data) => (staleContent, cb) => {
  if (!path) {
    return cb(null, JSON.stringify({
      ...staleContent,
      ...data
    }));
  }
  cb(null, JSON.stringify({
    ...staleContent,
    [path]: data
  }));
}

export function fetchSiteContent(config, callback) {
  switch(process.env.node_env) {
    case 'dev':
    case 'ec2':
      getContentFromDisc(callback);
      break;
    case 'static':
    case 'lambda':
      getContentFromS3(config, callback);
      break;
    default:
      callback(errorUndefined());
  }
}

export function updateSiteContent(config, {path, data}, callback) {
  switch(process.env.node_env) {
    case 'local':
    case 'dev':
      async.waterfall([
        async.apply(getContentFromDisc),
        mergeContent(path, data),
        (content, cb) => fs.writeFile(CONTENT_LOCATION, content, cb)
      ], callback);
      break;
    case 'lambda':
      async.waterfall([
        async.apply(getContentFromS3),
        mergeContent(path, data),
        (content, cb) => s3.putObject({...s3Params(config), Body: content}, cb)
      ], callback);
      break;
    default:
      callback(errorUndefined());
  }
}

export function publishSite(config, callback) {
  switch(process.env.node_env) {
    case 'lambda':
      lambda.invoke({
        FunctionName: 'StaticPublisher',
        Payload: JSON.stringify({
          config,
          packageConfig: packageJson.config,
          routes: staticRoutes
        })
      }, callback);
      break;
    default:
      callback(errorUndefined());
  }
}
