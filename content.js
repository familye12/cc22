function filterVideos() {
  chrome.storage.sync.get(["filterList"], function (result) {
    let filterWords = result.filterList;
    let selectors =
      "ytd-rich-item-renderer, ytd-video-renderer, ytd-compact-video-renderer, ytd-watch-card-compact-video-renderer";
    let videos = document.querySelectorAll(selectors);

    filterWords.forEach((filterWord) => {
      videos.forEach((video) => {
        let title1 = video.querySelector("#video-title");
        let title2 = video.querySelector("yt-formatted-string");
        if (title1) {
          if (
            title1.innerHTML.toUpperCase().includes(filterWord.toUpperCase())
          ) {
            video.style.display = "none";
          }
        } else if (title2) {
          if (
            title2.innerHTML.toUpperCase().includes(filterWord.toUpperCase())
          ) {
            video.style.display = "none";
          }
        }
      });
    });
  });
}

setInterval(filterVideos, 500);
