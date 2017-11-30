
export default function getStageContext(config, req) {
  const nodeEnv = process.env.node_env;

  if (!nodeEnv) {
    throw 'Please set node_env';
    return;
  }

  const stageConfig = config.stage[nodeEnv];
  return Object.assign({}, stageConfig);
}
