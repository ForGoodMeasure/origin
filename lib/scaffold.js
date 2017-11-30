import metaContent from './meta-content';

const Scaffold = (props, reactContent) =>
`
  <!doctype html>
  <html lang="en">
    <head>

      ${ metaContent(props.metaContent) }
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      <meta name="author" content="" />
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">

      <link href="//fonts.googleapis.com/css?family=Raleway:400,300,600" rel="stylesheet" type="text/css"/>
      <link rel="icon" type="image/png" href="${ props.localContext.assetUrl(props.localContext.stageContext.favicon_url) }"/>

      <!- StyledComponents ->
        <style type="text/css">${ props.styleSheet.getStyleTags() }</style>
      <!- StyledComponents ->

      <script type="text/javascript">
        window.__locals__=${ JSON.stringify({...props.localContext, imageUrls: props.imageUrls}) }
      </script>

      <!-- Global site tag (gtag.js) - Google Analytics -->
      <script async src="https://www.googletagmanager.com/gtag/js?id=UA-93943838-2"></script>
      <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', ${ props.localContext.stageContext.ga_id });
      </script>
    </head>
    <body>
      <div id="app-content">${ reactContent }</div>
      <script src="https://apis.google.com/js/api.js"></script>
      <script type="text/javascript" src="${ props.localContext.assetUrl("/js/browser-bundle.js") }"></script>
    </body>

  </html>
`

export default Scaffold;
