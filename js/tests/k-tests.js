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
        this.obj = {foo:'bar'};
        this.fn = function(){return 'foo';};
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