const DEFAULT_PROPS = {
  title: "Typeed",
  description: "Typeed is a advanced rich text editor for the web.",
  image: "./maskable_icon.png",
};

export default function Head() {
  const { title, description, image } = DEFAULT_PROPS;
  return (
    <>
      <title>{title}</title>

      <meta name="robots" content="follow, index" />
      <meta name="description" content={description} />

      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:site_name" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" name="image" content={image} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={title} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
      ></meta>
    </>
  );
}
