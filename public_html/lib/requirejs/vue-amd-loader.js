define([], function() {
  // Get the text from a URL
  function fetchText(url, callback) {
    var request = new XMLHttpRequest();
    request.open('GET', url, true);

    request.onload = function() {
      if (request.status >= 200 && request.status < 400) {
        // Success!
        callback(null, request.responseText);
      } else {
        // We reached our target server, but it returned an error
        callback("Loaded, but error " + url);
      }
    };

    request.onerror = function() {
      // There was a connection error of some sort
      callback("Error loading " + url);
    };

    request.send();
  }

  // Parse the result text
  function parseText(source, parsers) {
    var div = document.createElement('div');
    div.innerHTML = source;

    // Strip out the tags
    var style    = div.querySelector("style");
    var template = div.querySelector("template");
    var script   = div.querySelector("script");

    // Add the template and style to the document
    if (parsers && style) {
      let lang = style.getAttribute("lang");
      let parser = parsers[lang];

      if (lang && parser) {
        style.innerHTML = parser(style.innerHTML);
      }
    }

    document.getElementsByTagName('head')[0].appendChild(style);

    if (parsers && template) {
      let lang = style.getAttribute("lang");
      let parser = parsers[lang];

      if (lang && parser) {
        template.innerHTML = parser(template.innerHTML);
      }
    }

    document.getElementsByTagName('body')[0].appendChild(template);

    var code = script.innerHTML || "";

    return code;
  }

  // Load the resource
  function load(name, req, onload, config) {
    var url = req.toUrl(name + '.vue');

    fetchText(url, function(err, text) {
      if (err) {
        onload.error(err);
        return;
      }

      var code = parseText(text, config.parsers);
      onload.fromText(code);
    });
  }

  return { load: load };
});