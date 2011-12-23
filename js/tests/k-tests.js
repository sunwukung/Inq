function Parent() {
    this.foo = 'bar';
}

function Child() {
    Parent.apply(this,arguments);
}        

module('k',{
    setup: function(){
        this.str = 'foo';
        this.num = 123;
        this.arr = [1,2,3];
        this.boo = true;
        this.obj = {
            foo:'bar'
        };
        this.fn = function(){
            return 'foo';
        };
    }
});


test('clone',function(){
    ok(q.isF(k.clone),'the k namespace contains a method called clone');
    ok((k.clone(this.str) === this.str && 
        k.clone(this.num) === this.num &&
        k.clone(this.arr) === this.arr &&
        k.clone(this.boo) === this.boo),'clone returns original argument if its not an object');
        
    var n = k.clone(this.obj);
    ok(n !== this.obj, 'clone returns a new object if it is given an object');
    n.foo = 'boo';
    ok(n.foo !== this.obj.foo, 'clone returns an object with unique instance properties');
});

test('inherit',function(){
    var Ca,Pa,Cb,Pb;
    ok(q.isF(k.inherit),'the k namespace contains a method called inherit');
    ok((k.inherit(this.str,Child) === false && 
        k.inherit(this.num,Child) === false &&
        k.inherit(this.arr,Child) === false &&
        k.inherit(this.bool,Child) === false &&
        k.inherit(this.obj,Child) === false &&
        k.inherit(Parent,this.str) === false &&
        k.inherit(Parent,this.num) === false &&
        k.inherit(Parent,this.arr) === false &&
        k.inherit(Parent, this.bool) === false &&
        k.inherit(Parent,this.obj) === false),'inherit returns false if either argument is not a function');
    Pa = new Parent();
    Ca = new Child();
    ok(k.inherit(Parent,Child) === true,'inherit returns true if both arguments are functions');
    ok(Ca.foo === 'bar','child objects inherit properties from parents');
    Ca.foo = 'baz';
    ok(Ca.foo === 'baz' && Pa.foo === 'bar' && Child.hasOwnProperty('foo') === false,'child objects inherit instances of parent properties, but can overwrite them');
});

test('proto',function(){
    ok(q.isF(k.proto),'the k namespace contains a method called proto');
});

test('memo',function(){
    ok(q.isF(k.memo),'the k namespace contains a method called memo');
    ok((k.memo(this.str) === false && 
        k.memo(this.num) === false &&
        k.memo(this.obj) === false &&
        k.memo(this.arr) === false &&
        k.memo(this.bool) === false),'memo returns false if first argument is not an array and the second argument is not a function');
    ok(q.isF(k.memo(this.fn)) === true,'memo returns a new function if provided an arguments array and a callback function');
});

test('map',function(){
    var localArr = [10,20,30,40,50],nA;
    ok(q.isF(k.map),'the k namespace contains a method called map');
    ok((k.map(this.num,this.fn) === false &&
        k.map(this.str,this.fn) === false &&
        k.map(this.obj,this.fn) === false &&
        k.map(this.bool,this.fn) === false &&
        k.map(this.fn,this.fn) === false &&
        k.map(this.arr,this.str) === false &&
        k.map(this.arr,this.num) === false &&
        k.map(this.arr,this.bool) === false &&
        k.map(this.arr,this.obj) === false &&
        k.map(this.arr,this.arr) === false &&
        q.isA(k.map(this.arr,this.fn))), 'k.map returns false unless first argument is an array and the second argument is a function');

    nA = k.map(localArr,function(v){
        return v + (v / 2);
    });//15,30,45,60,75
    ok((nA[0] === 15 &&
        nA[1] === 30 &&
        nA[2] === 45 &&
        nA[3] === 60 &&
        nA[4] === 75) , 'k.map applies the function to each element of the array');

});

test('every',function(){
    var localArr = [10,20,30,40,50],nA;
    ok(q.isF(k.every),'the k namespace contains a method called every');
    ok((k.every(this.num,this.fn, this.num) === false &&
        k.every(this.str,this.fn, this.num) === false &&
        k.every(this.obj,this.fn, this.num) === false &&
        k.every(this.bool,this.fn, this.num) === false &&
        k.every(this.fn,this.fn, this.num) === false && // end of fun
        k.every(this.arr,this.str, this.num) === false &&
        k.every(this.arr,this.num, this.num) === false &&
        k.every(this.arr,this.bool, this.num) === false &&
        k.every(this.arr,this.obj, this.num) === false &&
        k.every(this.arr,this.arr, this.num) === false && // end of array
        k.every(this.arr,this.fn, this.str) === false &&
        k.every(this.arr,this.fn, this.obj) === false &&
        k.every(this.arr,this.fn, this.bool) === false &&
        k.every(this.arr,this.fn, this.arr) === false &&
        k.every(this.arr,this.fn, this.fn) === false && // end of array
        q.isA(k.every(this.arr,this.fn,this.num))), 'k.every returns false unless first argument is an array and the second argument is a function');
    nA = k.every(localArr,function(v){
        return v + (v / 2);
    },3);//15,30,45,60,75
    ok((nA[0] === 15 &&
        nA[1] === 20 &&
        nA[2] === 30 &&
        nA[3] === 60 &&
        nA[4] === 50) , 'k.every applies the function to every element of the array that the last argument is a factor of');

});

test('stripe',function(){
    var localArr = [10,20,30,40,50],nA;
    ok(q.isF(k.stripe),'the k namespace contains a method called stripe');
    ok((k.stripe(this.num, this.fn, this.fn) === false &&
        k.stripe(this.str, this.fn, this.fn) === false &&
        k.stripe(this.obj, this.fn, this.fn) === false &&
        k.stripe(this.bool, this.fn, this.fn) === false &&
        k.stripe(this.fn, this.fn, this.fn) === false &&
        k.stripe(this.arr,this.str, this.fn) === false &&
        k.stripe(this.arr,this.num, this.fn) === false &&
        k.stripe(this.arr,this.bool, this.fn) === false &&
        k.stripe(this.arr,this.obj, this.fn) === false &&
        k.stripe(this.arr,this.arr, this.fn) === false &&
        k.stripe(this.arr,this.fn, this.str) === false &&
        k.stripe(this.arr,this.fn, this.num) === false &&
        k.stripe(this.arr,this.fn, this.bool) === false &&
        k.stripe(this.arr,this.fn, this.obj) === false &&
        k.stripe(this.arr,this.fn, this.arr) === false &&
        q.isA(k.stripe(this.arr,this.fn, this.fn))), 'k.stripe returns false unless first argument is an array and the second argument is a function');
    nA = k.stripe(localArr,
        function(v){
            return v + (v / 2);
        },
        function(v){
            return v - (v / 2);
        }
        );//15,10,45,20,75
    ok((nA[0] === 15 &&
        nA[1] === 10 &&
        nA[2] === 45 &&
        nA[3] === 20 &&
        nA[4] === 75) , 'k.stripe applies alternating functions to alternating elements of the array');

});

test('chunk',function(){
    var localArr = [10,20,30,40,50,60], arrayA, arrayB;
    ok(q.isF(k.chunk),'the k namespace contains a method called chunk');
    ok((k.chunk(this.num, this.fn, this.fn) === false &&
        k.chunk(this.str, this.fn, this.fn) === false &&
        k.chunk(this.obj, this.fn, this.fn) === false &&
        k.chunk(this.bool, this.fn, this.fn) === false &&
        k.chunk(this.fn, this.fn, this.fn) === false &&//false on bad 1st
        k.chunk(this.arr, this.str, this.fn) === false &&
        k.chunk(this.arr, this.num, this.fn) === false &&
        k.chunk(this.arr, this.bool, this.fn) === false &&
        k.chunk(this.arr, this.obj, this.fn) === false &&
        k.chunk(this.arr, this.arr, this.fn) === false &&//false on bad 2nd
        k.chunk(this.arr, this.fn, this.str) === false &&
        k.chunk(this.arr, this.fn, this.fn) === false &&
        k.chunk(this.arr, this.fn, this.bool) === false &&
        k.chunk(this.arr, this.fn, this.obj) === false &&
        k.chunk(this.arr, this.fn, this.arr) === false &&//false on bad 3rd
        q.isA(k.chunk(localArr,this.fn, 2))), 'k.chunk returns false unless first argument is an array, the second argument is a function and the last argument is an integer');
    ok(k.chunk(this.arr,this.fn, 7) === false, 'k.chunk returns false if number of elements in third argument is not a factor of first.length');
    //output test
    arrayA = k.chunk(localArr,
        function(arr){
            return arr[0] + arr[1];
        },
        2
        );//[30,70,110]
    arrayB = k.chunk(localArr,
        function(arr){
            return arr[0] + arr[1] + arr[2];
        },
        3
        );//[60,150]
    ok((arrayA[0] === 30 &&
        arrayA[1] === 70 &&
        arrayA[2] === 110 &&
        arrayB[0] === 60 &&
        arrayB[1] === 150) , 'k.chunk applies functions to array chunks of size defined by last argument');

});

test('filter',function(){
    ok(q.isF(k.filter), 'k namespace contains a method called filter');
    ok((k.filter(this.num,this.fn) === false &&
        k.filter(this.str,this.fn) === false &&
        k.filter(this.obj,this.fn) === false &&
        k.filter(this.bool,this.fn) === false &&
        k.filter(this.fn,this.fn) === false &&
        k.filter(this.arr,this.str) === false &&
        k.filter(this.arr,this.num) === false &&
        k.filter(this.arr,this.bool) === false &&
        k.filter(this.arr,this.obj) === false &&
        k.filter(this.arr,this.arr) === false &&
        q.isA(k.filter(this.arr,this.fn))), 'k.filter returns false unless first argument is an array and the second argument is a function');
    var a = [1,2,'3',4],fOne;
    fOne = k.filter(a, function(i){
        return q.isN(i)?true:false;
    });
    ok((q.isA(fOne) && fOne.length === 3 &&
        (q.isN(fOne[0]) && q.isN(fOne[1]) && q.isN(fOne[2]))),
    'k.filter returns only those items in the list that pass the validation function');
});

test('valid',function(){
    ok(q.isF(k.valid), 'k namespace contains a method called valid');
    ok((k.valid(this.num,this.fn) === false &&
        k.valid(this.str,this.fn) === false &&
        k.valid(this.obj,this.fn) === false &&
        k.valid(this.bool,this.fn) === false &&
        k.valid(this.fn,this.fn) === false &&
        k.valid(this.arr,this.str) === false &&
        k.valid(this.arr,this.num) === false &&
        k.valid(this.arr,this.bool) === false &&
        k.valid(this.arr,this.obj) === false &&
        k.valid(this.arr,this.arr) === false), 'k.valid returns false unless first argument is an array and the second argument is a function');
    ok(k.valid([1,2,3,4,5],function(i){return q.isN(i);}), 'k.valid returns true when all elements conform to the criteria expressed in fn');
    ok(k.valid([1,2,3,4,'5'],function(i){return q.isN(i);}) === false, 'k.valid returns false when all elements conform to the criteria expressed in fn');
});