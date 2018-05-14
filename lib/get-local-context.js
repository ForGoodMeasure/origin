import { getContent } from './content-manager';

const getLocalContext = ({stageContext, content, storeState={}}) => ({
  assetUrl(assetPath) {
    return [stageContext.assetBase, assetPath].join('');
  },
  resourceUrl(resourcePath) {
    return [stageContext.resourceBase, resourcePath].join('')
  },
  ghostUrl(resourcePath) {
    return [stageContext.ghostBase, resourcePath].join('')
  },
  getContent(namespace, key) {
    return getContent(content, namespace, key);
  },
  stageContext,
  content,
  storeState
});

export default getLocalContext;
