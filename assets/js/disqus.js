var disqus_config = function () {
  this.page.url = document.getElementById("disqus_post_url").getAttribute("data");
  this.page.identifier = document.getElementById("disqus_post_identifier").getAttribute("data");
};

(function () {
  if (document.getElementById("disqus_post_identifier") != null && document.getElementById("disqus_post_url") != null) {
    var d = document, s = d.createElement('script');
    s.src = '//troyhunt.disqus.com/embed.js';
    s.setAttribute('data-timestamp', +new Date());
    (d.head || d.body).appendChild(s);
  }
})();