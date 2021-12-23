'use strict';

class Transformers {
  static resource(row, transformer) {
    if(row===null)
      return null;
    const Transformer = use('App/Resources/' + transformer);
    if (row.hasOwnProperty('$attributes')) {
      return new Transformer(row.toJSON()).toArray();
    } else {
      return new Transformer(row).toArray();
    }
  }

  static collection(rows, transformer) {
    if(rows===null)
      return null;
    const Transformer = use('App/Resources/' + transformer);
    let items={};
    if(rows!=null){
      if(Array.isArray(rows)){
        items['data'] = rows.map(function (row) {
          return new Transformer(row).toArray();
        })
      }
      else{
        items['data'] = rows.toJSON().map(function (row) {
          if (row.hasOwnProperty('$attributes')) {
            return new Transformer(row.toJSON()).toArray();
          } else {
            return new Transformer(row).toArray();
          }
        })
      }
    }
    return items;
  }

  static paginate(rows, transformer) {
    const Transformer = use('App/Resources/' + transformer);
    let items = {};
    if(rows!=null && rows.toJSON().data!=null){
      items['data']= rows.toJSON().data.map(function (row) {
        return new Transformer(row).toArray();
      });
    }
    items['meta'] = {
      "total": rows.toJSON().total,
      "perPage": rows.toJSON().perPage,
      "page": rows.toJSON().page,
      "lastPage": rows.toJSON().lastPage,
    }
    return items;
  }

}

module.exports = Transformers;
