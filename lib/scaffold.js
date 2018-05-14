import metaContent from './meta-content';

const Scaffold = (props, reactContent) =>
`
  <!doctype html>
  <html lang="en" ${ props.metaContent.isArticle && 'itemscope itemtype="http://schema.org/Article"' }>
    <head>

      ${ metaContent(props.metaContent) }
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      <meta name="author" content="" />
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">

      <link href="//fonts.googleapis.com/css?family=Raleway:400,300,600" rel="stylesheet" type="text/css"/>
      <link rel="icon" type="image/png" href="${ props.localContext.assetUrl('/images/ba-icon.png') }"/>

      <!- StyledComponents ->
        <style type="text/css">${props.styleSheet.getStyleTags()}</style>
      <!- StyledComponents ->

      <script type="text/javascript">
        window.__locals__=${JSON.stringify({...props.localContext, imageUrls: props.imageUrls})}
      </script>

      <!-- Global site tag (gtag.js) - Google Analytics -->
      <script async src="${ props.localContext.stageContext.ga_id ? `https://www.googletagmanager.com/gtag/js?id=${  props.localContext.stageContext.ga_id  }` : "" }"></script>
      <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', ${  props.localContext.stageContext.ga_id  });
      </script>

    </head>
    <body>
      <script type="text/javascript" src="${props.localContext.ghostUrl('/public/ghost-sdk.js?v=c7701668c2')}"></script>
      <div id="app-content">${ reactContent }</div>
      <script src="https://apis.google.com/js/api.js"></script>
      <script type="text/javascript" src="${props.localContext.resourceUrl(`/assets/browser-bundle-${ props.localContext.stageContext.bundleType }.js`)}"></script>
      <script src="https://checkout.stripe.com/checkout.js"></script>
    </body>

  </html>
`

export default Scaffold;
