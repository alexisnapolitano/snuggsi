  // http://w3c.github.io/webcomponents/spec/imports/#h-interface-import

// Preloading -
//   - https://w3c.github.io/preload/

// Markup based async loader
// - <link rel="preload" as="style" href="async_style.css" onload="this.rel='stylesheet'"

void (Element => {

  'loading' === document.readyState

    ? document.addEventListener // could this be `.onload = f()` ?
        ('DOMContentLoaded', preload)

    : preload ()


  function preload () {
    for (let link of document.querySelectorAll ('link[id*="-"]'))
      load (link)
  }

  function load (link, xhr) {

    // HTML Imports
    (xhr = new XMLHttpRequest)
      .open ('GET', link.href)

    xhr.responseType = 'document'
    xhr.send ()

    xhr.onload = function (clone, node) {
      const
        content = this.responseXML

      , next = link.nextSibling

      , template =
          content.querySelector ('template')

      , tags =
          document.getElementsByTagName (link.id)

      , clones =
          content.querySelectorAll ('style,link,script')

      , reflect = node => attr =>
          (node [attr] = node [attr])


      for (node of tags)
        stamp.call (node, template)


      for (node of clones) {
        ['src', 'href']
          .map (reflect (node))

        'style' == node.as // createstylesheet
          && node.relList.add ('stylesheet')

        link.parentNode.insertBefore (node, next)

        'script' == node.as // create script
          &&
            link.parentNode.insertBefore
              (clone = document.createElement ('script'), next)
          &&
            (clone.src = node.href)
      }
    }
  }


  function stamp (template, insert, replacement) {

    template = template.cloneNode (true)


    insert = (replacement, name, slot) =>

      (name = replacement.getAttribute ('slot')) &&

      (slot = (template.content || template)
         .querySelector ('slot[name='+name+']'))
           .parentNode
           .replaceChild (replacement, slot)


    for (replacement of this.querySelectorAll ('[slot]'))
      insert (replacement)


    this.innerHTML = template.innerHTML
  }

}) (window.HTMLLinkElement)

