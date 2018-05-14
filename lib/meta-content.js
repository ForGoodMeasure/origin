export default ({
  title,
  description,
  image,
  url
}) => `

<!-- Place this data between the <head> tags of your website -->
<title>${ title }</title>
<meta name="description" content="${ description }" />

<!-- Schema.org markup for Google+ -->
<meta itemprop="name" content="${ title }">
<meta itemprop="description" content="${ description }">
<meta itemprop="image" content="${ image }">

<!-- Twitter Card data -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:site" content="@iavbetterangels">
<meta name="twitter:title" content="${ title }">
<meta name="twitter:description" content="${ description }">
<!-- Twitter summary card with large image must be at least 280x150px -->
<meta name="twitter:image:src" content="${ image }">

<!-- Open Graph data -->
<meta property="og:title" content="${ title }" />
<meta property="og:type" content="article" />
<meta property="og:image" content="${ image }" />
<meta property="og:description" content="${ description }" />
<meta property="og:site_name" content="Better Angels" />
<meta property="og:url" content="${ url }" />
`;
