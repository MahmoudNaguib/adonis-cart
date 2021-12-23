const {hooks} = require('@adonisjs/ignitor')

hooks.after.providersBooted(() => {
  /*const View = use('View')
  View.global('test', 'test value1');*/


  /*const Response = use('Adonis/Src/Response')
  const Request = use('Adonis/Src/Request')

  Response.macro('resource', function (row,transformer) {
    const Transformer = use('App/Transformers/'+transformer);
    console.log(row);

  })
  Response.macro('collection', function (rows,transformer) {
    const Transformer = use('App/Transformers/'+transformer);
    console.log(rows);
    /!*rows = rows.map(function (item) {
      return new Transformer(item).toArray();
    });*!/
    this.status(200).json(rows)
  })*/


  /*const Context = use('Adonis/Src/HttpContext')
  Context.macro('resource', function (row, transformer) {
    const Transformer = use('App/Transformers/' + transformer);
    return new Transformer(row).toArray();
  })*/


})
