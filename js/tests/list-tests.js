module('list',{
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

test('map',function(){
    var localArr = [10,20,30,40,50],nA;
    ok(q.isF(list.map),'the list namespace contains a method called map');
    ok((list.map(this.num,this.fn) === false &&
        list.map(this.str,this.fn) === false &&
        list.map(this.obj,this.fn) === false &&
        list.map(this.bool,this.fn) === false &&
        list.map(this.fn,this.fn) === false &&
        list.map(this.arr,this.str) === false &&
        list.map(this.arr,this.num) === false &&
        list.map(this.arr,this.bool) === false &&
        list.map(this.arr,this.obj) === false &&
        list.map(this.arr,this.arr) === false &&
        q.isA(list.map(this.arr,this.fn))), 'list.map returns false unless first argument is an array and the second argument is a function');

    nA = list.map(localArr,function(v){
        return v + (v / 2);
    });//15,30,45,60,75
    ok((nA[0] === 15 &&
        nA[1] === 30 &&
        nA[2] === 45 &&
        nA[3] === 60 &&
        nA[4] === 75) , 'list.map applies the function to each element of the array');

});

test('every',function(){
    var localArr = [10,20,30,40,50],nA;
    ok(q.isF(list.every),'the list namespace contains a method called every');
    ok((list.every(this.num,this.fn, this.num) === false &&
        list.every(this.str,this.fn, this.num) === false &&
        list.every(this.obj,this.fn, this.num) === false &&
        list.every(this.bool,this.fn, this.num) === false &&
        list.every(this.fn,this.fn, this.num) === false && // end of fun
        list.every(this.arr,this.str, this.num) === false &&
        list.every(this.arr,this.num, this.num) === false &&
        list.every(this.arr,this.bool, this.num) === false &&
        list.every(this.arr,this.obj, this.num) === false &&
        list.every(this.arr,this.arr, this.num) === false && // end of array
        list.every(this.arr,this.fn, this.str) === false &&
        list.every(this.arr,this.fn, this.obj) === false &&
        list.every(this.arr,this.fn, this.bool) === false &&
        list.every(this.arr,this.fn, this.arr) === false &&
        list.every(this.arr,this.fn, this.fn) === false && // end of array
        q.isA(list.every(this.arr,this.fn,this.num))), 'list.every returns false unless first argument is an array and the second argument is a function');
    nA = list.every(localArr,function(v){
        return v + (v / 2);
    },3);//15,30,45,60,75
    ok((nA[0] === 15 &&
        nA[1] === 20 &&
        nA[2] === 30 &&
        nA[3] === 60 &&
        nA[4] === 50) , 'list.every applies the function to every element of the array that the last argument is a factor of');

});

test('stripe',function(){
    var localArr = [10,20,30,40,50],nA;
    ok(q.isF(list.stripe),'the list namespace contains a method called stripe');
    ok((list.stripe(this.num, this.fn, this.fn) === false &&
        list.stripe(this.str, this.fn, this.fn) === false &&
        list.stripe(this.obj, this.fn, this.fn) === false &&
        list.stripe(this.bool, this.fn, this.fn) === false &&
        list.stripe(this.fn, this.fn, this.fn) === false &&
        list.stripe(this.arr,this.str, this.fn) === false &&
        list.stripe(this.arr,this.num, this.fn) === false &&
        list.stripe(this.arr,this.bool, this.fn) === false &&
        list.stripe(this.arr,this.obj, this.fn) === false &&
        list.stripe(this.arr,this.arr, this.fn) === false &&
        list.stripe(this.arr,this.fn, this.str) === false &&
        list.stripe(this.arr,this.fn, this.num) === false &&
        list.stripe(this.arr,this.fn, this.bool) === false &&
        list.stripe(this.arr,this.fn, this.obj) === false &&
        list.stripe(this.arr,this.fn, this.arr) === false &&
        q.isA(list.stripe(this.arr,this.fn, this.fn))), 'list.stripe returns false unless first argument is an array and the second argument is a function');
    nA = list.stripe(localArr,
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
        nA[4] === 75) , 'list.stripe applies alternating functions to alternating elements of the array');

});

test('chunk',function(){
    var localArr = [10,20,30,40,50,60], arrayA, arrayB;
    ok(q.isF(list.chunk),'the list namespace contains a method called chunk');
    ok((list.chunk(this.num, this.fn, this.fn) === false &&
        list.chunk(this.str, this.fn, this.fn) === false &&
        list.chunk(this.obj, this.fn, this.fn) === false &&
        list.chunk(this.bool, this.fn, this.fn) === false &&
        list.chunk(this.fn, this.fn, this.fn) === false &&//false on bad 1st
        list.chunk(this.arr, this.str, this.fn) === false &&
        list.chunk(this.arr, this.num, this.fn) === false &&
        list.chunk(this.arr, this.bool, this.fn) === false &&
        list.chunk(this.arr, this.obj, this.fn) === false &&
        list.chunk(this.arr, this.arr, this.fn) === false &&//false on bad 2nd
        list.chunk(this.arr, this.fn, this.str) === false &&
        list.chunk(this.arr, this.fn, this.fn) === false &&
        list.chunk(this.arr, this.fn, this.bool) === false &&
        list.chunk(this.arr, this.fn, this.obj) === false &&
        list.chunk(this.arr, this.fn, this.arr) === false &&//false on bad 3rd
        q.isA(list.chunk(localArr,this.fn, 2))), 'list.chunk returns false unless first argument is an array, the second argument is a function and the last argument is an integer');
    ok(list.chunk(this.arr,this.fn, 7) === false, 'list.chunk returns false if number of elements in third argument is not a factor of first.length');
    //output test
    arrayA = list.chunk(localArr,
        function(arr){
            return arr[0] + arr[1];
        },
        2
        );//[30,70,110]
    arrayB = list.chunk(localArr,
        function(arr){
            return arr[0] + arr[1] + arr[2];
        },
        3
        );//[60,150]
    ok((arrayA[0] === 30 &&
        arrayA[1] === 70 &&
        arrayA[2] === 110 &&
        arrayB[0] === 60 &&
        arrayB[1] === 150) , 'list.chunk applies functions to array chunks of size defined by last argument');

});

test('filter',function(){
    ok(q.isF(list.filter), 'list namespace contains a method called filter');
    ok((list.filter(this.num,this.fn) === false &&
        list.filter(this.str,this.fn) === false &&
        list.filter(this.obj,this.fn) === false &&
        list.filter(this.bool,this.fn) === false &&
        list.filter(this.fn,this.fn) === false &&
        list.filter(this.arr,this.str) === false &&
        list.filter(this.arr,this.num) === false &&
        list.filter(this.arr,this.bool) === false &&
        list.filter(this.arr,this.obj) === false &&
        list.filter(this.arr,this.arr) === false &&
        q.isA(list.filter(this.arr,this.fn))), 'list.filter returns false unless first argument is an array and the second argument is a function');
    var a = [1,2,'3',4],fOne;
    fOne = list.filter(a, function(i){
        return q.isN(i)?true:false;
    });
    ok((q.isA(fOne) && fOne.length === 3 &&
        (q.isN(fOne[0]) && q.isN(fOne[1]) && q.isN(fOne[2]))),
    'list.filter returns only those items in the list that pass the validation function');
});

test('valid',function(){
    ok(q.isF(list.valid), 'list namespace contains a method called valid');
    ok((list.valid(this.num,this.fn) === false &&
        list.valid(this.str,this.fn) === false &&
        list.valid(this.obj,this.fn) === false &&
        list.valid(this.bool,this.fn) === false &&
        list.valid(this.fn,this.fn) === false &&
        list.valid(this.arr,this.str) === false &&
        list.valid(this.arr,this.num) === false &&
        list.valid(this.arr,this.bool) === false &&
        list.valid(this.arr,this.obj) === false &&
        list.valid(this.arr,this.arr) === false), 'list.valid returns false unless first argument is an array and the second argument is a function');
    ok(list.valid([1,2,3,4,5],function(i){
        return q.isN(i);
    }), 'list.valid returns true when all elements conform to the criteria expressed in fn');
    ok(list.valid([1,2,3,4,'5'],function(i){
        return q.isN(i);
    }) === false, 'list.valid returns false when all elements conform to the criteria expressed in fn');
});

test('make', function(){
    ok(q.isF(list.make), 'list namespace contains function:build');
    ok((list.make(this.str) === false &&
        list.make(this.bool) === false &&
        list.make(this.obj) === false &&
        list.make(this.arr) === false &&
        list.make(this.num) === false &&
        list.make(this.fn) === false &&
        q.isA(list.make(5,this.fn))), 'list.build returns false unless: list.build(Number, Function)');
    var testList = list.make(5, function(i, n){
        return 10 * i;
    });
    ok((q.isA(testList) &&
        testList.length === 5 &&
        q.isN(testList[0]) &&
        q.isN(testList[1]) &&
        q.isN(testList[2]) &&
        q.isN(testList[3]) &&
        q.isN(testList[4])), 'list.build returns an array of length n as expressed by fn');
});

test('mix', function(){
    ok(q.isF(list.mix), 'list namespace contains function: mix');
    ok((list.mix(this.str, this.arr) === false &&
        list.mix(this.num, this.arr) === false &&
        list.mix(this.bool, this.arr) === false &&
        list.mix(this.obj, this.arr) === false &&
        list.mix(this.fn, this.arr) === false &&
        list.mix(this.arr, this.str) === false &&
        list.mix(this.arr, this.num) === false &&
        list.mix(this.arr, this.obj) === false &&
        list.mix(this.arr, this.fn) === false &&
        list.mix([1,2,3],[1,2,3,4]) === false
        ), 'list.mix returns false unless passed two arrays of equal length');
    var testList = list.mix([1,2,3],['a','b','c']);
    ok((testList[0] === 1 && testList[1] === 'a' &&
        testList[2] === 2 && testList[3] === 'b' &&
        testList[4] === 3 && testList[5] === 'c'), 'list.mix generates a new array by adding alternate members to a single array');
});