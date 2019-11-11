  let protocol = window.location.protocol,
    fontStyle = protocol + "//at.alicdn.com/t/font_744535_4gpwivr68vb.css",
    fontJs = protocol + "//at.alicdn.com/t/font_744535_4gpwivr68vb.js";
    version = protocol == "http:" ? "2.0" : "3.0",
    bdMap =
      protocol +
      "//api.map.baidu.com/api?v=" +
      version +
      "&ak=FD424cbf5baeeec41c4cd9bb5a879701"

  let doc = document,
    head = doc.getElementsByTagName("head")[0],
    body = doc.getElementsByTagName("body")[0],
    link = doc.createElement("link")
  link.setAttribute("rel", "stylesheet")
  link.setAttribute("type", "text/css")
  link.setAttribute("href", fontStyle)
  head.appendChild(link)
  let script = doc.createElement("script")
  script.type = "text/javascript"
  script.src = fontJs
  body.appendChild(script)
