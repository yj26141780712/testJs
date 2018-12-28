(function(root) {
    let _ = function(obj) {
        if (obj instanceof _) return obj; // obj是 _的实例对象返回obj
        if (!(this instanceof _)) return new _(obj); // this不是 _的实例对象 返回 _的实例对象
        console.log(obj);
        console.log(123);
        this._wrapped = obj;
    }
    root._ = _;
})(this)