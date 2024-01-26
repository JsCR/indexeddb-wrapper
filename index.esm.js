/**
 *
 * @class IndexedDBWrapper
 *
 * @property #IDBTransactionMode
 * @property #IDBTransactionOptions
 * @property #IDBCursor
 * @property #IDBCursorWithValue
 *
 * @method IndexedDBObjectStoreDataAdd
 * @method IndexedDBObjectStoreDataClear
 * @method IndexedDBObjectStoreDataCount
 * @method IndexedDBObjectStoreDataCreateIndex
 * @method IndexedDBObjectStoreDataDelete
 * @method IndexedDBObjectStoreDataDeleteIndex
 * @method IndexedDBObjectStoreDataGet
 * @method IndexedDBObjectStoreDataGetAll
 * @method IndexedDBObjectStoreDataGetAllKeys
 * @method IndexedDBObjectStoreDataGetKey
 * @method IndexedDBObjectStoreDataIndex
 * @method IndexedDBObjectStoreDataOpenCursor
 * @method IndexedDBObjectStoreDataPut
 * @method IndexedDBDataUpdate
 * */
class IndexedDBWrapper {

  static #IDBTransactionMode = {
    READ_WRITE: 'readwrite',
    READ_ONLY: 'readonly',
    VERSION_CHANGE: 'versionchange',
  };
  static #IDBTransactionOptions = {
    durability: {
      DEFAULT: 'default',
      STRICT: 'strict',
      RELAXED: 'relaxed',
    }
  };

  /**
   * IDBCursor
   * 迭代对象存储和索引。
   * @link https://developer.mozilla.org/zh-CN/docs/Web/API/IDBCursor
   */
  #IDBCursor;

  /**
   * IDBCursorWithValue
   * 迭代对象存储和索引并返回游标的当前值。
   * @link https://developer.mozilla.org/en-US/docs/Web/API/IDBCursorWithValue
   */
  #IDBCursorWithValue;

  /**
   * IDBDatabase
   * 表示一个数据库连接。这是在数据库中获取事务的唯一方式。
   * @link https://developer.mozilla.org/zh-CN/docs/Web/API/IDBDatabase
   */
    // _IDBDatabase;
  #IDBDatabase;

  /**
   * IDBFactory
   * 提供数据库访问。这是全局对象 indexedDB 实现的接口，因此是 API 的入口。
   * @link https://developer.mozilla.org/zh-CN/docs/Web/API/IDBFactory
   */
  #IDBFactory;

  /**
   * IDBIndex
   * 也是为了允许访问 IndexedDB 数据库中的数据子集，但使用索引来检索记录而不是主键。这有时比使用 IDBObjectStore 更快。
   * @link https://developer.mozilla.org/zh-CN/docs/Web/API/IDBIndex
   */
  #IDBIndex;

  /**
   * IDBKeyRange
   * 定义可用于从特定范围内的数据库检索数据的键范围。
   * @link https://developer.mozilla.org/zh-CN/docs/Web/API/IDBKeyRange
   */
  #IDBKeyRange;

  /**
   * IDBObjectStore
   * 表示允许访问通过主键查找的 IndexedDB 数据库中的一组数据的对象存储区。
   * @link https://developer.mozilla.org/zh-CN/docs/Web/API/IDBObjectStore
   */
  #IDBObjectStore;
  #IDBObjectStore_READ_ONLY;
  #IDBObjectStore_READ_WRITE;

  /**
   * IDBOpenDBRequest
   * 表示一个打开数据库的请求。
   * @link https://developer.mozilla.org/en-US/docs/Web/API/IDBOpenDBRequest
   */
    // _IDBOpenDBRequest = IndexedDB.open(DBName, 1),
  #IDBOpenDBRequest;

  /**
   * IDBRequest
   * 处理数据库请求并提供对结果访问的通用接口。
   * @link https://developer.mozilla.org/zh-CN/docs/Web/API/IDBRequest
   */

  /**
   * IDBRequest.error Read only
   * Returns a DOMException in the event of an unsuccessful request, indicating what went wrong.
   *
   * IDBRequest.result Read only
   * Returns the result of the request. If the request is not completed, the result is not available and an InvalidStateError exception is thrown.
   *
   * IDBRequest.source Read only
   * The source of the request, such as an IDBIndex or an IDBObjectStore. If no source exists (such as when calling IDBFactory.open), it returns null.
   *
   * IDBRequest.readyState Read only
   * The state of the request. Every request starts in the pending state. The state changes to done when the request completes successfully or when an error occurs.
   *
   * IDBRequest.transaction Read only
   * The transaction for the request. This property can be null for certain requests, for example those returned from IDBFactory.open unless an upgrade is needed. (You're just connecting to a database, so there is no transaction to return).
   * */
  #IDBRequest;

  /**
   * IDBTransaction
   * 表示一个事务。在数据库上创建一个事务，指定作用域（例如要访问的存储对象），并确定所需的访问类型（只读或读写）。
   * @link https://developer.mozilla.org/zh-CN/docs/Web/API/IDBTransaction
   */
    // IDBTransaction = w().IDBTransaction || w().webkitIDBTransaction || w().mozIDBTransaction || w().OIDBTransaction || w().msIDBTransaction,
  #IDBTransaction_READ_ONLY;
  #IDBTransaction_READ_WRITE;

  /**
   * IndexedDB
   * 是 WindowOrWorkerGlobalScope 的一个只读属性，它集成了为应用程序提供异步访问索引数据库的功能的机制。
   * @link https://developer.mozilla.org/zh-CN/docs/Web/API/indexedDB
   */
    // IndexedDB = w().indexedDB || w().webkitIndexedDB || w().mozIndexedDB || w().OIndexedDB || w().msIndexedDB,
  #IndexedDB;


  #IDBTransaction_VERSION_CHANGE;
  #localStorage = {
    setItem( key, value ) {
      var times = 0;
      // naive storage space management
      for( ; ; ) {
        try {
          // doc: https://developer.mozilla.org/en-US/docs/Web/API/Storage
          console.log( ++times );
          localStorage.setItem( key, value );
          break;
        } catch( ex ) {
          // handle: Uncaught DOMException: Failed to execute 'setItem' on 'Storage': Setting the value of 'XXX' exceeded the quota
          //localStorage.removeItem( localStorage.key( 0 ) );
          console.log( ex );
        }
      }
    }, getItem( key ) {
      return localStorage.getItem( key );
    }
  };

  DBName = 'HistoryAPI.state';
  Version = NaN;
  ObjectStoreName = 'helloStore';
  keyPath = 'keyPath';
  Promise;
  constructor( {
    DBName,
    ObjectStoreName,
    keyPath = 'id',
    autoIncrement = false,
    deleteObjectStore = false,
    deleteDatabase = false,
  } ) {
    this.Promise = new Promise( ( resolve, reject ) => {
      this.foo = 'bar';
      this.DBName = DBName;
      this.ObjectStoreName = ObjectStoreName;
      // this.Version = Version;
      this.keyPath = keyPath;
      this.#IndexDBVersion();
      this.#IndexDBJustify();
      deleteDatabase ?
      this.#IndexedDBDelete().then( $event => {
        resolve( $event );
      } ).catch( $event => {
        reject( $event );
      } ).finally() :
      this.#IndexedDBOpenWrapper
      ( { keyPath, autoIncrement, deleteObjectStore } )
      .then( $result => {
        resolve( $result );
      } ).catch( $error => {
        reject( $error );
      } ).finally();
    });
    return this;
  }

  #IndexedDBInitIDBTransaction() {
    // Promise.allSettled( [ this.Promise ] ).then( results => {
    //   results.forEach( ( item, key, array ) =>{
    //     console.log( item, item.status );
    //   } );
    // } ).catch().finally();
    this.#IDBTransaction_READ_ONLY = this.#IDBDatabase.transaction( [ this.ObjectStoreName ], this.constructor.#IDBTransactionMode.READ_ONLY );
    this.#IDBTransaction_READ_WRITE = this.#IDBDatabase.transaction( [ this.ObjectStoreName ], this.constructor.#IDBTransactionMode.READ_WRITE );
    this.#IDBTransaction_READ_ONLY.onabort = this.#IDBTransaction_READ_WRITE.onabort = function( $event ) {
      this.status = 'abort';
      //console.log('onabort', $event);
    };
    this.#IDBTransaction_READ_ONLY.oncomplete = this.#IDBTransaction_READ_WRITE.oncomplete = function( $event ) {
      this.status = 'complete';
      //console.log('oncomplete', $event);
    };
    this.#IDBTransaction_READ_ONLY.onerror = this.#IDBTransaction_READ_WRITE.onerror = function( $event ) {
      this.status = 'error';
      //console.log('onerror', $event);
    };
    //this.#IDBTransaction_VERSION_CHANGE = this.#IDB.transaction([ this.ObjectStoreName ], this.constructor.#IDBTransactionMode.VERSION_CHANGE);
    // console.log(this.#IDBTransaction_READ_ONLY);
    // console.log(this.#IDBTransaction_READ_WRITE);
    //console.log(this.#IDBTransaction_VERSION_CHANGE);
  }

  #IndexedDBInitIDBObjectStore() {
    this.#IDBObjectStore_READ_ONLY = this.#IDBTransaction_READ_ONLY.objectStore( this.ObjectStoreName );
    this.#IDBObjectStore_READ_WRITE = this.#IDBTransaction_READ_WRITE.objectStore( this.ObjectStoreName );
  }

  /**
   * 0.判断浏览器是否支持IndexDB
   */
  #IndexDBJustify() {
    for( const name of [ 'indexedDB', 'webkitIndexedDB', 'mozIndexedDB', 'OIndexedDB', 'msIndexedDB' ] ) {
      if( name in window ) {
        this.#IndexedDB = window[ name ];
        break;
      }
    }

    if( Object.prototype.toString.call( this.#IndexedDB ) === '[object Undefined]' ) {
      throw new DOMException( 'indexedDB Not Supported' )
    }
  }

  /**
   * 数据库版本
   */
  #IndexDBVersion() {
    var localStorageKeyName = `IndexedDB[${ this.DBName }][${ this.ObjectStoreName }]`;
    console.log( this.Version, isNaN( this.Version ) );
    if( isNaN( this.Version ) ) {
      '[object Null]' === Object.prototype.toString.call( this.#localStorage.getItem( localStorageKeyName ) ) && this.#localStorage.setItem( localStorageKeyName, 1 );
      this.Version = this.#localStorage.getItem( localStorageKeyName );
    }
  }

  /**
   * 1.数据库版本变更
   */
  #IndexedDBVersionChange( $event, { keyPath, autoIncrement, deleteObjectStore } ) {
    this.#IDBDatabase.objectStoreNames.contains( this.ObjectStoreName ) || deleteObjectStore ||
    ( this.#IDBObjectStore = this.#IDBDatabase.createObjectStore( this.ObjectStoreName, { keyPath, autoIncrement } ) );
  }

  /**
   * IDBVersionChangeEvent
   * 作为 IDBOpenDBRequest.onupgradeneeded (en-US) 事件的处理程序的结果，IDBVersionChangeEvent 接口表示数据库的版本已经发生了改变。
   * @link https://developer.mozilla.org/en-US/docs/Web/API/IDBVersionChangeEvent
   */
// _IDBOpenDBRequest.onblocked = $event => {
//   console.log($event);
// };

// _IDBOpenDBRequest.onupgradeneeded = $event => {
//   console.log($event);
// };

// _IDBOpenDBRequest.onerror = $event => {
//   console.log($event);
// };

// _IDBOpenDBRequest.onsuccess = $event => {
//   console.log($event);
// };

// _IDBOpenDBRequest.oncomplete = $event => {
//   console.log($event);
// };

// _IDBOpenDBRequest.onversionchange = $event => {
//   console.log($event);
// };

// _IDBOpenDBRequest.onreadystatechange = $event => {
//   console.log($event);
// };

  /**
   * 1.数据库版本变更
   */
  #IndexedDBVersionChangeEvent( $event, { keyPath, autoIncrement, deleteObjectStore, resolve, reject } ) {
    this.#IDBDatabase.objectStoreNames.contains( this.ObjectStoreName ) ? (
      deleteObjectStore ? (
        this.#IDBDatabase.deleteObjectStore( this.ObjectStoreName ), // 删除表
          this.#IDBDatabase.close(),
          resolve( $event )
      ) : reject( $event )
    ) : (
      ( this.#IDBObjectStore = this.#IDBDatabase.createObjectStore( this.ObjectStoreName, { keyPath, autoIncrement } ) ),
        resolve( $event, this.#IDBObjectStore )
    );
  }

  /**
   * 1.创建并打开数据库
   */
  #IndexedDBOpen( { keyPath, autoIncrement, deleteObjectStore } ) {
    return new Promise( ( resolve, reject ) => {
      this.#IDBOpenDBRequest = this.#IndexedDB.open( this.DBName, this.Version );
      this.#IDBOpenDBRequest.onupgradeneeded = ( $event ) => {
        // 数据库创建或升级的时候会触发
        console.log( 'onupgradeneeded' );
        // console.log( $event );
        this.#IDBDatabase = $event.target.result; // 数据库对象
        this.#IndexedDBVersionChange( $event, { keyPath, autoIncrement, deleteObjectStore } );
        resolve( $event );
      };

      this.#IDBOpenDBRequest.onsuccess = ( $event ) => {
        //console.log('onsuccess');
        console.log( '数据库打开成功...' );
        resolve( $event );
      };

      this.#IDBOpenDBRequest.onblocked = ( $event ) => {
        console.log( 'onblocked' );
        console.log( $event );
        reject( $event );
      };

      this.#IDBOpenDBRequest.onerror = ( $event ) => {
        console.log( 'onerror' );
        console.log( '数据库打开失败...' );
        reject( $event );
      };

      this.#IDBOpenDBRequest.oncomplete = $event => {
        console.log( 'oncomplete', $event );
      };

      this.#IDBOpenDBRequest.onreadystatechange = $event => {
        console.log( 'onreadystatechange', $event );
      };
    } );
  }

  #IndexedDBOpenWrapper( { keyPath, autoIncrement, deleteObjectStore } ) {
    return new Promise( ( resolve, reject ) => {
      this.#IndexedDBOpen( { keyPath, autoIncrement, deleteObjectStore } )
      .then( $event => {
        // console.log( this.#localStorage );
        this.#IDBDatabase = $event.target.result; // 数据库对象
        if( $event instanceof IDBVersionChangeEvent ) {
          console.log( 'IDBVersionChangeEvent' );
          this.#IndexedDBVersionChangeEvent( $event, { keyPath, autoIncrement, deleteObjectStore, resolve, reject } );
        } else {
          this.#IDBDatabase.objectStoreNames.contains( this.ObjectStoreName ) ? (
            this.#IndexedDBInitIDBTransaction(),
            this.#IndexedDBInitIDBObjectStore(),
            resolve( $event )
          ) : ( () => { throw new Error( '找不到ObjectStore' ) } )();
        }
      } ).catch( $event => {
        reject( $event );
      } ).finally();
    } )
  }

  /**
   * 2.删除数据库
   */
  #IndexedDBDelete() {
    return new Promise( ( resolve, reject ) => {
      this.#IDBOpenDBRequest = this.#IndexedDB.deleteDatabase( this.DBName );
      this.#IDBOpenDBRequest.onsuccess = ( $event ) => {
        console.log( 'onsuccess' );
        console.log( '数据库打开成功...' );
        resolve( $event );
      };

      this.#IDBOpenDBRequest.oncomplete = $event => {
        console.log( 'oncomplete', $event );
      };

      this.#IDBOpenDBRequest.onerror = ( $event ) => {
        console.log( 'onerror' );
        console.log( '数据库打开失败...' );
        reject( $event );
      };

      this.#IDBOpenDBRequest.onreadystatechange = $event => {
        console.log( 'onreadystatechange', $event );
      };
    } );
  }

  #ShortHandOperate( ReadWrite = 0, method = 'count', args = [] ) {
    //console.log(this.#IDBObjectStore_READ_WRITE, this.#IDBObjectStore_READ_ONLY);
    if(
      !this.#IDBObjectStore_READ_WRITE ||
      !this.#IDBObjectStore_READ_ONLY ||
      this.#IDBObjectStore_READ_WRITE.transaction.status ||
      this.#IDBObjectStore_READ_ONLY.transaction.status
    ) {
      this.#IndexedDBInitIDBTransaction();
      this.#IndexedDBInitIDBObjectStore();
    }
    var i = ReadWrite ? this.#IDBObjectStore_READ_WRITE : this.#IDBObjectStore_READ_ONLY, u;
    return ( u = i[ method ].apply( i, args )/*, console.log( u instanceof IDBRequest )*/, u );
  }

  /**
   * 3. 增加数据
   */
  IndexedDBObjectStoreDataAdd( data, key = null ) {
    return new Promise( ( resolve, reject ) => {
      var args = [ data ];
      key && args.push( key );
      this.#IDBRequest = this.#ShortHandOperate(1, 'add', args);
      this.#IDBRequest.onsuccess = function($event) {
        resolve($event);
      };

      this.#IDBRequest.onerror = function($event) {
        reject($event);
        throw new Error($event.target.error);
      };
    })
  }

  /**
   * 4. 清空数据
   */
  IndexedDBObjectStoreDataClear() {
    return new Promise( ( resolve, reject ) => {
      var args = [ ];
      this.#IDBRequest = this.#ShortHandOperate(1, 'clear', args);
      this.#IDBRequest.onsuccess = function($event) {
        resolve($event);
      };

      this.#IDBRequest.onerror = function($event) {
        reject($event);
        throw new Error($event.target.error);
      };
    })
  }

  /**
   * 5. 统计行数
   */
  IndexedDBObjectStoreDataCount() {
    return new Promise( ( resolve, reject ) => {
      var args = [];
      this.#IDBRequest = this.#ShortHandOperate();
      this.#IDBRequest.onsuccess = function( $event ) {
        resolve( $event );
      };

      this.#IDBRequest.onerror = function( $event ) {
        reject( $event );
        throw new Error( $event.target.error );
      };
    } )
  }

  /**
   * 6. 创建索引
   */
  IndexedDBObjectStoreDataCreateIndex( indexName, keyPath, unique, multiEntry ) {
    ConstraintError
    InvalidAccessError
    InvalidStateError
    SyntaxError
    TransactionInactiveError
  }

  /**
   * 6. 删除数据
   */
  IndexedDBObjectStoreDataDelete( id ) {
    return new Promise( ( resolve, reject ) => {
      var args = [ id ];
      this.#IDBRequest = this.#ShortHandOperate( 1, 'delete', args );
      this.#IDBRequest.onsuccess = function( $event ) {
        resolve( $event );
      };

      this.#IDBRequest.onerror = function( $event ) {
        reject( $event );
        throw new Error( $event.target.error );
      };
    } )
  }

  /**
   * 6. 删除数据
   */
  IndexedDBObjectStoreDataDeleteIndex( indexName ) {
    return new Promise( ( resolve, reject ) => {
      var args = [ indexName ];
      this.#IDBRequest = this.#ShortHandOperate( 1, 'deleteIndex', args );
      this.#IDBRequest.onsuccess = function( $event ) {
        resolve( $event );
      };

      this.#IDBRequest.onerror = function( $event ) {
        reject( $event );
        throw new Error( $event.target.error );
      };
    } )
  }


  /**
   * 7.查找数据
   */
  IndexedDBObjectStoreDataGet( key ) {
    return new Promise( ( resolve, reject ) => {
      var args = [ key ];
      this.#IDBRequest = this.#ShortHandOperate( 1, 'get', args );
      this.#IDBRequest.onsuccess = function( $event ) {
        resolve( $event );
      };

      this.#IDBRequest.onerror = function( $event ) {
        reject( $event );
        throw new Error( $event.target.error );
      };
    } )
  }


  /**
   * 7.查找数据
   */
  IndexedDBObjectStoreDataGetAll( query = null, count = null ) {
    return new Promise( ( resolve, reject ) => {
      var args = [];
      query && args.push( query );
      count && query && args.push( count );
      this.#IDBRequest = this.#ShortHandOperate( 1, 'getAll', args );
      this.#IDBRequest.onsuccess = function( $event ) {
        resolve( $event );
      };

      this.#IDBRequest.onerror = function( $event ) {
        reject( $event );
        throw new Error( $event.target.error );
      };
    } )
  }


  /**
   * 7.查找数据
   */
  IndexedDBObjectStoreDataGetAllKeys( query = null, count = null ) {
    return new Promise( ( resolve, reject ) => {
      var args = [];
      query && args.push( query );
      count && query && args.push( count );
      this.#IDBRequest = this.#ShortHandOperate( 1, 'getAllKeys', args );
      this.#IDBRequest.onsuccess = function( $event ) {
        resolve( $event );
      };

      this.#IDBRequest.onerror = function( $event ) {
        reject( $event );
        throw new Error( $event.target.error );
      };
    } )
  }


  /**
   * 7.查找数据
   */
  IndexedDBObjectStoreDataGetKey( key ) {
    return new Promise( ( resolve, reject ) => {
      var args = [ key ];
      this.#IDBRequest = this.#ShortHandOperate( 1, 'getKey', args );
      this.#IDBRequest.onsuccess = function( $event ) {
        resolve( $event );
      };

      this.#IDBRequest.onerror = function( $event ) {
        reject( $event );
        throw new Error( $event.target.error );
      };
    } )
  }


  /**
   * 7.查找数据
   */
  IndexedDBObjectStoreDataIndex( name ) {
    return new Promise( ( resolve, reject ) => {
      var args = [ name ];
      this.#IDBRequest = this.#ShortHandOperate( 1, 'index', args );
      this.#IDBRequest.onsuccess = function( $event ) {
        resolve( $event );
      };

      this.#IDBRequest.onerror = function( $event ) {
        reject( $event );
        throw new Error( $event.target.error );
      };
    } )
  }


  /**
   * 7.查找数据
   */
  IndexedDBObjectStoreDataOpenCursor( query = null, direction = 'next' ) {
    return new Promise( ( resolve, reject ) => {
      var args = [ ];
      query && args.push( query );
      [ 'nextunique', 'prev', 'prevunique' ].includes( direction ) && query && args.push( direction );
      this.#IDBRequest = this.#ShortHandOperate( 1, 'openCursor', args );
      this.#IDBRequest.onsuccess = function( $event ) {
        resolve( $event );
      };

      this.#IDBRequest.onerror = function( $event ) {
        reject( $event );
        throw new Error( $event.target.error );
      };
    } )
  }

  /**
   * 9. 放入(增加/改变)数据
   */
  IndexedDBObjectStoreDataPut( data, key = null ) {
    return new Promise( ( resolve, reject ) => {
      var args = [ data ];
      key && args.push( key );
      this.#IDBRequest = this.#ShortHandOperate( 1, 'put', args );
      this.#IDBRequest.onsuccess = function( $event ) {
        resolve( $event );
      };

      this.#IDBRequest.onerror = function( $event ) {
        reject( $event );
        throw new Error( $event.target.error );
      };
    } )
  }


  /**
   * 8.改变数据
   */
  IndexedDBDataUpdate( data, key = null ) {
    return new Promise( ( resolve, reject ) => {
      var args = [ data ];
      key && args.push( key );
      this.#IDBRequest = this.#ShortHandOperate( 1, 'update', args );
      this.#IDBRequest.onsuccess = function( $event ) {
        resolve( $event );
      };

      this.#IDBRequest.onerror = function( $event ) {
        reject( $event );
        throw new Error( $event.target.error );
      };
    } )
  }

  get IDBObjectStoreIndexNames() {
    this.#IndexedDBInitIDBTransaction();
    this.#IndexedDBInitIDBObjectStore();
    return this.#IDBObjectStore_READ_ONLY.indexNames;
  }
}

































// var w = () => { return window; }, DBVersion = 1.0, DBName = 'HistoryAPI.state', DBMode = 'readwrite',












// IDBTransaction.READ_WRITE = 'readwrite';
// IDBTransaction.READ_ONLY = 'readonly';
// IDBTransaction.VERSION_CHANGE = 'versionchange';
// _IDBOpenDBRequest = IndexedDB.deleteDatabase("HistoryAPI.state");







function IndexedDBWrapperWrapper(
  DBName = 'HistoryAPI.state',
  ObjectStoreName = 'VueData',
  keyPath = 'path',
  autoIncrement = false,
  deleteDatabase = false,
  deleteObjectStore = false,
) {
  return new IndexedDBWrapper({
    DBName,
    ObjectStoreName,
    keyPath,
    autoIncrement,
    deleteDatabase,
    deleteObjectStore,
  });
}










export { IndexedDBWrapper, IndexedDBWrapperWrapper };
