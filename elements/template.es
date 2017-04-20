// INTERESTING! Converting `Template` to a class increases size by ~16 octets

//class Template {

//  constructor ( name = 'snuggsi' ) {
//    return Object.assign (this.factory (...name), { bind: this.bind })
//  }

//  bind (context) {
//    context = Array.isArray (context) ? context : [context]
//  }

//  factory (name) {
//    return (
//      document.querySelector ('template[name='+name+']').cloneNode (true)
//        || document.createElement ('template'))
//  }
//}

const Template = function ( name = 'snuggsi' ) {

  this.dependents = []

  return Object.assign
    (document.querySelector ('template[name='+name+']'), { bind } )

  function bind (context) {
    this.dependents = this.dependents || []


    context = Array.isArray (context) ? context : [context]

    const
      records   = []
    , dependant = undefined

    while
      (dependent = this.dependents.pop ())
        dependent.remove ()


    for (const item of context) {
      let
        clone  = this.cloneNode (true)
      , tokens = (new TokenList (clone ))

      tokens.bind (item)
      records.push (clone.content)
    }

    records.map
      (function (record) { this.dependents.push (...record.childNodes) }, this)

    this.after (...records)

    return this
  }
}
