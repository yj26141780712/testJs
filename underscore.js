(function(root) {
    let nativeKeys = Object.keys;
    let push = Array.prototype.push;
    let _ = function(obj) {
        if (obj instanceof _) return obj; // obj是 _的实例对象返回obj
        if (!(this instanceof _)) return new _(obj); // this不是 _的实例对象 返回 _的实例对象
        this._wrapped = obj;
    }

    _.keys = function(obj) { // keys 方法
        if (!_.isObject(obj)) return [];
        if (nativeKeys) return nativeKeys(obj);
        var keys = [];
        for (var key in obj)
            if (_.has(obj, key)) keys.push(key);
        return keys;
    }

    let optimizeCb = function(func, context, argCount) { // 回调优化,当方法未传入上下文对象时直接返回该方法
        if (context === void 0) return func;
        switch (argCount == null ? 3 : argCount) {
            case 1:
                return function(value) {
                    return func.call(context, value);
                }
            case 3:
                return function(value, index, obj) {
                    return func.call(context, value, index, obj);
                }
            case 4:
                return function(memo, value, index, obj) {
                    return func.call(context, memo, value, index, obj);
                }
        }
    }

    _.each = function(obj, iteratee, context) { // 对象 迭代器  上下文对象
        iteratee = optimizeCb(iteratee, context);
        let i, length;
        if (_.isArray(obj)) {
            for (let i = 0; i < obj.length; i++) {
                iteratee(obj[i], i, obj);
            }
        } else {
            let keys = _.keys(obj);
            length = (keys || obj).length;
            for (i = 0; i < length; i++) {
                iteratee(obj[keys[i]], keys[i], obj);
            }
        }
        return obj;
    }
    _.map = function(obj, iteratee, context) {
        let keys = _.keys(obj);
        let length = (keys || obj).length;
        let result = Array(length);
        _.each(obj, function(value, index, obj) {
            result[index] = iteratee(value, index, obj);
        });
        return result;
        //iteratee = optimizeCb(iteratee, context);
    }

    let createReduce = function(dir) { //dir 累加方向
        let reducer = function(obj, iteratee, memo, init) {
            let keys = _.keys(obj);
            let length = (keys || obj).length;
            let index = dir > 0 ? 0 : length - 1;
            if (!init) {
                memo = obj[keys ? keys[index] : index];
                index += dir;
            }
            for (; index >= 0 && index < length; index += dir) {
                let currentKey = keys ? keys[index] : index;
                memo = iteratee(memo, obj[currentKey], currentKey, obj);
            }
            return memo;
        }
        return function(obj, iteratee, memo, context) {
            let memoInit = arguments.length >= 3;
            iteratee = optimizeCb(iteratee, context, 4);
            return reducer(obj, iteratee, memo, memoInit);
        }
    }

    _.reduce = createReduce(1);


    // iteratee.call(context, )
    _.isArray = function(obj) {
        return toString.call(obj) === '[object Array]';
    }
    _.isObject = function(obj) {
        // return toString.call(obj) === '[object Object]';
        var type = typeof obj;
        return type === 'function' || type === 'object' && !!obj;
    }

    // Add some isType methods: isArguments, isFunction, isString, isNumber, isDate, isRegExp, isError.
    _.each(['Function', 'String', 'Number', 'Date', 'Arguments', 'RegExp', 'Error'], function(value) {
        return _['is' + value] = function(obj) {
            return toString.call(obj) === '[object ' + value + ']';
        }
    });

    _.functions = _.methods = function(obj) {
        var names = [];
        for (var key in obj) {
            if (_.isFunction(obj[key])) names.push(key);
        }
        return names.sort();
    };

    _.chain = function(obj) {
        let instance = _(obj);
        instance._chain = true;
        return instance;
    }
    _.value = function() {

    }

    let result = function(instance, obj) {
        return instance._chain ? _(obj).chain() : obj;
    }

    _.mixin = function(obj) { // 取出对象上的方法挂载到原型对象上
        _.each(_.functions(obj), function(name) {
            var func = _[name] = obj[name];
            _.prototype[name] = function() {
                // _func(obj,iteratee ...) obj iteratee ...  _.(obj).func(iteratee,...)
                // _wrapped 加上 arguments 组合后的参数 传入调用
                var args = [this._wrapped];
                push.apply(args, arguments);
                return result(this, func.apply(_, args));
            };
        });
    }
    _.mixin(_);
    _.prototype.value = function() {
        return this._wrapped;
    };
    root._ = _;
})(this)