function getYouTubeEmbedURL(videoURL) {
  const videoIDMatch = videoURL.match(
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  );
  if (videoIDMatch && videoIDMatch[1]) {
    const videoID = videoIDMatch[1];
    return `https://www.youtube.com/embed/${videoID}`;
  } else {
    return false;
  }
}
