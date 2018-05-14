const adminScaffold = props =>
`
  <!doctype html>
  <html lang="en">

    <head>
      <title></title>
      <meta name="description" content="" />
      <meta name="author" content="" />
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8">

      <link href="//fonts.googleapis.com/css?family=Raleway:400,300,600" rel="stylesheet" type="text/css"/>
      <link rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/bootswatch/3.3.7/darkly/bootstrap.min.css" />
      <link rel="icon" type="image/png" href="http://d1tug40blkttrl.cloudfront.net/icons/dot.ico"/>

      <script type="text/javascript">
        window.__locals__=${JSON.stringify({...props.localContext})}
      </script>
    </head>

    <body>
      <div id="app-content">¡LOADING!</div>
      <script type="text/javascript" src="${props.localContext.assetUrl("/assets/admin-bundle.js")}"></script>
    </body>

  </html>
`

export default adminScaffold;
