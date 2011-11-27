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

test('each',function(){
    var localArr = [10,20,30,40,50],nA;
    ok(q.isF(k.each),'the k namespace contains a method called each');
    ok((k.each(this.num,this.fn) === false &&
        k.each(this.str,this.fn) === false &&
        k.each(this.obj,this.fn) === false &&
        k.each(this.bool,this.fn) === false &&
        k.each(this.fn,this.fn) === false &&
        k.each(this.arr,this.str) === false &&
        k.each(this.arr,this.num) === false &&
        k.each(this.arr,this.bool) === false &&
        k.each(this.arr,this.obj) === false &&
        k.each(this.arr,this.arr) === false &&
        q.isA(k.each(this.arr,this.fn))), 'k.each returns false unless first argument is an array and the second argument is a function');

    nA = k.each(localArr,function(v){
        return v + (v / 2);
    });//15,30,45,60,75
    ok((nA[0] === 15 &&
        nA[1] === 30 &&
        nA[2] === 45 &&
        nA[3] === 60 &&
        nA[4] === 75) , 'k.each applies the function to each element of the array');

});

test('other',function(){
    var localArr = [10,20,30,40,50],nA;
    ok(q.isF(k.other),'the k namespace contains a method called other');
    ok((k.other(this.num, this.fn, this.fn) === false &&
        k.other(this.str, this.fn, this.fn) === false &&
        k.other(this.obj, this.fn, this.fn) === false &&
        k.other(this.bool, this.fn, this.fn) === false &&
        k.other(this.fn, this.fn, this.fn) === false &&
        k.other(this.arr,this.str, this.fn) === false &&
        k.other(this.arr,this.num, this.fn) === false &&
        k.other(this.arr,this.bool, this.fn) === false &&
        k.other(this.arr,this.obj, this.fn) === false &&
        k.other(this.arr,this.arr, this.fn) === false &&
        k.other(this.arr,this.fn, this.str) === false &&
        k.other(this.arr,this.fn, this.num) === false &&
        k.other(this.arr,this.fn, this.bool) === false &&
        k.other(this.arr,this.fn, this.obj) === false &&
        k.other(this.arr,this.fn, this.arr) === false &&
        q.isA(k.other(this.arr,this.fn, this.fn))), 'k.other returns false unless first argument is an array and the second argument is a function');
    nA = k.other(localArr,
    function(v){return v + (v / 2);},
    function(v){return v - (v / 2);}
            );//15,10,45,20,75
    ok((nA[0] === 15 &&
        nA[1] === 10 &&
        nA[2] === 45 &&
        nA[3] === 20 &&
        nA[4] === 75) , 'k.other applies alternating functions to alternating elements of the array');

});