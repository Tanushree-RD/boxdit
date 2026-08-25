function buildCdnPosterUrl(uid, slug, cacheBustingKey) {
  // uid e.g. "film:1380671" -> "1380671"
  const idStr = uid.replace(/\D/g, "");
  if (!idStr) return null;
  const parts = idStr.split("").join("/");
  const v = cacheBustingKey ? `?v=${cacheBustingKey}` : "";
  return `https://a.ltrbxd.com/resized/film-poster/${parts}/${idStr}-${slug}-0-230-0-345-crop.jpg${v}`;
}

async function testConstructedPoster() {
  const url = buildCdnPosterUrl("film:1380671", "dont-say-good-luck", "6744a648");
  console.log("Constructed CDN URL:", url);
  const res = await fetch(url);
  console.log("CDN response status:", res.status, "Content-type:", res.headers.get("content-type"), "Length:", res.headers.get("content-length"));
}

testConstructedPoster();
