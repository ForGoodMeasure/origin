export default function getStageContext(config, req) {
  let nodeEnv = process.env.node_env || 'dev';
  if (req.headers['x-static-publisher'] === 'true') {
    nodeEnv = 'static';
  }
  const stageConfig = config.stage[nodeEnv];
  return Object.assign({}, stageConfig);
}
