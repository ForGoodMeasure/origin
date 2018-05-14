import AWS from 'aws-sdk';
import fs from 'fs';
import async from 'async';
import dotty from 'dotty';

import config from '../config.json';
import content from '../dist/assets/content/content.json';

const s3 = new AWS.S3();
const lambda = new AWS.Lambda({region: 'us-west-1'});
const CONTENT_LOCATION = `${__dirname}/../../content/content.json`;
const s3Params = {
  Bucket: config.global.aws_s3_bucket,
  Key: 'content/content.json'
};
const staticRoutes = config.staticRoutes;

const errorUndefined = () => new Error('Behavior is undefined for this stage value');

function getContentFromDisc(callback) {
  fs.readFile(CONTENT_LOCATION, (err, res) => {
    if (err) {
      return callback(err);
    }
    callback(null, JSON.parse(res));
  });
}
function getContentFromS3(callback) {
  s3.getObject(s3Params, (err, res) => {
    if (err) {
      return callback(err);
    }
    const rawData = dotty.get(res, 'Body');
    callback(null, JSON.parse(rawData))
  });
}
function getContentFromBundle(callback) {
  callback(null, content)
}
const mergeContent = (path, data) => (staleContent, cb) => {
  cb(null, JSON.stringify({
    ...staleContent,
    [path]: data
  }));
}

export function fetchSiteContent(stageContext, callback) {
  switch(stageContext.stage) {
    case 'dev':
    case 'prod':
    case 'static':
    case 'lambda':
    case 'staging':
      getContentFromBundle(callback);
      break;
    default:
      callback(errorUndefined());
  }
}

export function updateSiteContent(stageContext, {path, data}, callback) {
  switch(stageContext.stage) {
    case 'local':
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
        (content, cb) => s3.putObject({...s3Params, Body: content}, cb)
      ], callback);
      break;
    default:
      callback(errorUndefined());
  }
}

export function publishSite(stageContext, callback) {
  // TODO - rewrite this
  switch(stageContext.stage) {
    case 'lambda':
      lambda.invoke({
        FunctionName: 'StaticPublisher',
        Payload: JSON.stringify({
          stageContext,
          packageConfig: "",
          routes: staticRoutes
        })
      }, callback);
      break;
    default:
      callback(errorUndefined());
  }
}
