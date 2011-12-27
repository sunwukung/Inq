module('form',{
    setup : function(){
        this.canvas = document.createElement('canvas').getContext('2d');
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
    },
    teardown : function(){
        this.canvas = document.createElement('canvas').getContext('2d');
    }
});

// REC -------------------------------------------------------------------------
test('rec',function(){
    ok(q.isF(form.rec),'form.rec is a function');
    ok((form.rec(this.str) === false &&
        form.rec(this.arr) === false &&
        form.rec(this.obj) === false &&
        form.rec(this.bool) === false &&
        form.rec(this.fn) === false), 'form.rec returns false on bad arguments');
    var testRec = (form.rec(10, 10));
    ok(q.isO(testRec), 'form.rec returns Object when provided with appropriate arguments');
    ok((q.objHas(testRec,'width') && q.isN(testRec.width)), 'objects produced by form.rec have a Number property : "width"');
    ok((q.objHas(testRec,'height') && q.isN(testRec.height)), 'objects produced by form.rec have a Number property : "height"');
    ok(q.isF(testRec.rotate) && q.isF(testRec.scale) && q.isF(testRec.draw), 'rectangle objects have following methods: "rotate", "scale" and "draw"');
    ok((testRec.draw() === false &&
        testRec.draw(this.str) === false &&
        testRec.draw(this.num) === false &&
        testRec.draw(this.arr) === false &&
        testRec.draw(this.bool) === false &&
        testRec.draw(this.obj) === false &&
        testRec.draw(this.canvas,[10,10,10]) === false &&
        testRec.draw(this.canvas,[10,'10']) === false &&
        testRec.draw(this.canvas) === true
        ),'rec.draw requires canvas element for first argument and optional array (representing position) as : [Number, Number]');
    testRec.scale(10,20);
    testRec.rotate(45);
    ok((testRec.transforms[0]['type']  === 'scale' && q.isA(testRec.transforms[0]['value']) &&
        testRec.transforms[0]['value'][0] === 10 && testRec.transforms[0]['value'][1] === 20 &&
        testRec.transforms[1]['type']  === 'rotate' && q.isN(testRec.transforms[1]['value']) && testRec.transforms[1]['value'] === 45
        ),'calling rotate or scale with correct arguments adds configuration objects to the transforms array');
    testRec.scale(this.str, this.num);
    testRec.scale(this.arr, this.num);
    testRec.scale(this.obj, this.num);
    testRec.scale(this.bool, this.num);
    testRec.scale(this.fn, this.num);
    testRec.scale(this.num, this.str);
    testRec.scale(this.num, this.arr);
    testRec.scale(this.num, this.obj);
    testRec.scale(this.num, this.bool);
    testRec.scale(this.num, this.fn);
    testRec.rotate(this.str);
    testRec.rotate(this.arr);
    testRec.rotate(this.obj);
    testRec.rotate(this.bool);
    testRec.rotate(this.fn);
    ok(testRec.transforms.length === 2, 'rotate and scale reject incorrect arguments');
});
// CIRCLE ----------------------------------------------------------------------

test('crc',function(){
    ok(q.isF(form.crc),'form.crc is a function');
    ok((form.crc(this.str) === false &&
        form.crc(this.arr) === false &&
        form.crc(this.obj) === false &&
        form.crc(this.bool) === false &&
        form.crc(this.fn) === false),
    'form.crc returns false if not provided a numeric argument');
    var testCircle = form.crc(10);
    ok(q.objHas(testCircle,'radius') && q.isN(testCircle.radius), 'circle objects have a Number property : "radius"');
    ok(q.isO(testCircle),'form.crc returns a circle object if provided with a numeric argument');
    ok(q.isF(testCircle.rotate) && q.isF(testCircle.scale) && q.isF(testCircle.draw), 'circle objects have following methods: "rotate", "scale" and "draw"');
    ok((testCircle.draw() === false &&
        testCircle.draw(this.str) === false &&
        testCircle.draw(this.num) === false &&
        testCircle.draw(this.arr) === false &&
        testCircle.draw(this.bool) === false &&
        testCircle.draw(this.obj) === false &&
        testCircle.draw(this.canvas,[10,10,10]) === false &&
        testCircle.draw(this.canvas,[10,'10']) === false &&
        testCircle.draw(this.canvas) === true
        ),'crc.draw requires canvas element for first argument and optional array (representing position) as : [Number, Number]');
    testCircle.scale(10,20);
    testCircle.rotate(45);
    ok((testCircle.transforms[0]['type']  === 'scale' && q.isA(testCircle.transforms[0]['value']) &&
        testCircle.transforms[0]['value'][0] === 10 && testCircle.transforms[0]['value'][1] === 20 &&
        testCircle.transforms[1]['type']  === 'rotate' && q.isN(testCircle.transforms[1]['value']) && testCircle.transforms[1]['value'] === 45
        ),'calling rotate or scale with correct arguments adds configuration objects to the transforms array');
    testCircle.scale(this.str, this.num);
    testCircle.scale(this.arr, this.num);
    testCircle.scale(this.obj, this.num);
    testCircle.scale(this.bool, this.num);
    testCircle.scale(this.fn, this.num);
    testCircle.scale(this.num, this.str);
    testCircle.scale(this.num, this.arr);
    testCircle.scale(this.num, this.obj);
    testCircle.scale(this.num, this.bool);
    testCircle.scale(this.num, this.fn);
    testCircle.rotate(this.str);
    testCircle.rotate(this.arr);
    testCircle.rotate(this.obj);
    testCircle.rotate(this.bool);
    testCircle.rotate(this.fn);
    ok(testCircle.transforms.length === 2, 'rotate and scale reject incorrect arguments');
});

// PATH ------------------------------------------------------------------------

test('pth',function(){
    var testPath,
    goodPoints = [[10,10],[30,10],[20,10],[10,20]],
    badPoints = [[10,10],[30,10],[20,10],['10',20]];
    ok(q.isF(form.pth),'form.pth is a function');
    ok((form.pth(this.str) === false &&
        form.pth(this.num) === false &&
        form.pth(this.obj) === false &&
        form.pth(this.bool) === false &&
        form.pth(this.fn) === false &&
        q.isO(form.pth(badPoints,true)) === false),
    'form.pth returns false on bad arguments');
    testPath = form.pth(goodPoints,[10,10]);
    ok(q.objHas(testPath,'points') && q.isA(testPath.points), 'path objects have an Array property : "points"');
    ok(q.isO(testPath),'form.pth returns a curve object if provided with a list of arrays containing three pairs of xy co-ordinates, followed by a single xy pair array');
    ok(q.isF(testPath.rotate) && q.isF(testPath.scale) && q.isF(testPath.draw), 'path objects have following methods: "rotate", "scale" and "draw"');
    ok((testPath.draw() === false &&
        testPath.draw(this.str) === false &&
        testPath.draw(this.num) === false &&
        testPath.draw(this.arr) === false &&
        testPath.draw(this.bool) === false &&
        testPath.draw(this.obj) === false &&
        testPath.draw(this.canvas,[10,10,10]) === false &&
        testPath.draw(this.canvas,[10,'10']) === false &&
        testPath.draw(this.canvas) === true
        ),'path.draw requires canvas element for first argument and optional array (representing position) as : [Number, Number]');
    testPath.scale(10,20);
    testPath.rotate(45);
    ok((testPath.transforms[0]['type']  === 'scale' && q.isA(testPath.transforms[0]['value']) &&
        testPath.transforms[0]['value'][0] === 10 && testPath.transforms[0]['value'][1] === 20 &&
        testPath.transforms[1]['type']  === 'rotate' && q.isN(testPath.transforms[1]['value']) && testPath.transforms[1]['value'] === 45
        ),'calling rotate or scale with correct arguments adds configuration objects to the transforms array');
    testPath.scale(this.str, this.num);
    testPath.scale(this.arr, this.num);
    testPath.scale(this.obj, this.num);
    testPath.scale(this.bool, this.num);
    testPath.scale(this.fn, this.num);
    testPath.scale(this.num, this.str);
    testPath.scale(this.num, this.arr);
    testPath.scale(this.num, this.obj);
    testPath.scale(this.num, this.bool);
    testPath.scale(this.num, this.fn);
    testPath.rotate(this.str);
    testPath.rotate(this.arr);
    testPath.rotate(this.obj);
    testPath.rotate(this.bool);
    testPath.rotate(this.fn);
    ok(testPath.transforms.length === 2, 'rotate and scale reject incorrect arguments');
});

// CRV -------------------------------------------------------------------------

test('crv',function(){
    var testCurve,
    goodPoints = [
    [[10,10],[30,10],[20,10]],
    [[10,20],[30,20],[20,20]],
    [[10,30],[30,30],[20,30]],
    [[10,10],[30,10],[20,10]]
    ],
    badPoints = [
    [[101,'10'],[30,10],[20,10]],
    [[10,20],[30,20],[20,20]],
    [[10,30],[30,30],[20,30]],
    [[10,10],[30,10],[20,10]]
    ];

    ok(q.isF(form.crv),'form.crv is a function');
    ok((form.crv(this.str) === false &&
        form.crv(this.num) === false &&
        form.crv(this.obj) === false &&
        form.crv(this.bool) === false &&
        form.crv(this.fn) === false &&
        q.isO(form.crv(badPoints,[0,0],true)) === false && //trigger strict validation of curve
        q.isO(form.crv(goodPoints,[0,'0'])) === false),
    'form.crv returns false on bad arguments');
    testCurve = form.crv(goodPoints,[10,10]);
    ok(q.objHas(testCurve,'points') && q.isA(testCurve.points), 'curve objects have an Array property : "points"');
    ok(q.objHas(testCurve,'start') && q.isA(testCurve.start), 'curve objects have an Array property : "start"');
    ok(q.isO(testCurve),'form.crv returns a curve object if provided with a list of arrays containing three pairs of xy co-ordinates, followed by a single xy pair array');
    ok(q.isF(testCurve.rotate) && q.isF(testCurve.scale) && q.isF(testCurve.draw), 'curve objects have following methods: "rotate", "scale" and "draw"');
    ok((testCurve.draw() === false &&
        testCurve.draw(this.str) === false &&
        testCurve.draw(this.num) === false &&
        testCurve.draw(this.arr) === false &&
        testCurve.draw(this.bool) === false &&
        testCurve.draw(this.obj) === false &&
        testCurve.draw(this.canvas,[10,10,10]) === false &&
        testCurve.draw(this.canvas,[10,'10']) === false &&
        testCurve.draw(this.canvas) === true
        ),'crv.draw requires canvas element for first argument and optional array (representing position) as : [Number, Number]');
    testCurve.scale(10,20);
    testCurve.rotate(45);
    ok((testCurve.transforms[0]['type']  === 'scale' && q.isA(testCurve.transforms[0]['value']) &&
        testCurve.transforms[0]['value'][0] === 10 && testCurve.transforms[0]['value'][1] === 20 &&
        testCurve.transforms[1]['type']  === 'rotate' && q.isN(testCurve.transforms[1]['value']) && testCurve.transforms[1]['value'] === 45
        ),'calling rotate or scale with correct arguments adds configuration objects to the transforms array');
    testCurve.scale(this.str, this.num);
    testCurve.scale(this.arr, this.num);
    testCurve.scale(this.obj, this.num);
    testCurve.scale(this.bool, this.num);
    testCurve.scale(this.fn, this.num);
    testCurve.scale(this.num, this.str);
    testCurve.scale(this.num, this.arr);
    testCurve.scale(this.num, this.obj);
    testCurve.scale(this.num, this.bool);
    testCurve.scale(this.num, this.fn);
    testCurve.rotate(this.str);
    testCurve.rotate(this.arr);
    testCurve.rotate(this.obj);
    testCurve.rotate(this.bool);
    testCurve.rotate(this.fn);
    ok(testCurve.transforms.length === 2, 'rotate and scale reject incorrect arguments');
});

// POLY ------------------------------------------------------------------------

test('poly',function(){
    ok(q.isF(form.poly),'form.poly is a function');
    ok((form.poly(this.str) === false &&
        form.poly(this.obj) === false &&
        form.poly(this.bool) === false &&
        form.poly(this.fn) === false &&
        form.poly(this.arr) === false),
    'form.poly returns false on bad arguments');
    var testPoly = form.poly(5,10);
    ok(q.isO(testPoly),'form.poly returns an object "poly" when passed (Number:points, Number:radius)');
    ok(q.objHas(testPoly,'nPoints') && q.isN(testPoly.nPoints), 'poly objects have a Number property : "nPoints"');
    ok(q.objHas(testPoly,'radius') && q.isN(testPoly.radius), 'poly objects have a Number property : "radius"');
    ok(q.isF(testPoly.rotate) && q.isF(testPoly.scale) && q.isF(testPoly.draw), 'poly objects have following methods: "rotate", "scale" and "draw"');
    ok((testPoly.draw() === false &&
        testPoly.draw(this.str) === false &&
        testPoly.draw(this.num) === false &&
        testPoly.draw(this.arr) === false &&
        testPoly.draw(this.bool) === false &&
        testPoly.draw(this.obj) === false &&
        testPoly.draw(this.canvas,[10,10,10]) === false &&
        testPoly.draw(this.canvas,[10,'10']) === false &&
        testPoly.draw(this.canvas) === true
        ),'poly.draw requires canvas element for first argument and optional array (representing position) as : [Number, Number]');
    testPoly.scale(10,20);
    testPoly.rotate(45);
    ok((testPoly.transforms[0]['type']  === 'scale' && q.isA(testPoly.transforms[0]['value']) &&
        testPoly.transforms[0]['value'][0] === 10 && testPoly.transforms[0]['value'][1] === 20 &&
        testPoly.transforms[1]['type']  === 'rotate' && q.isN(testPoly.transforms[1]['value']) && testPoly.transforms[1]['value'] === 45
        ),'calling rotate or scale with correct arguments adds configuration objects to the transforms array');
    testPoly.scale(this.str, this.num);
    testPoly.scale(this.arr, this.num);
    testPoly.scale(this.obj, this.num);
    testPoly.scale(this.bool, this.num);
    testPoly.scale(this.fn, this.num);
    testPoly.scale(this.num, this.str);
    testPoly.scale(this.num, this.arr);
    testPoly.scale(this.num, this.obj);
    testPoly.scale(this.num, this.bool);
    testPoly.scale(this.num, this.fn);
    testPoly.rotate(this.str);
    testPoly.rotate(this.arr);
    testPoly.rotate(this.obj);
    testPoly.rotate(this.bool);
    testPoly.rotate(this.fn);
    ok(testPoly.transforms.length === 2, 'rotate and scale reject incorrect arguments');
});

// STAR ------------------------------------------------------------------------

test('star', function(){
    ok(q.isF(form.star),'the form namespace contains a method: star');
    ok((form.star(this.str, this.num, this.num) === false &&
        form.star(this.obj, this.num, this.num) === false &&
        form.star(this.bool, this.num, this.num) === false &&
        form.star(this.fn, this.num, this.num) === false &&
        form.star(this.arr, this.num, this.num) === false && // reject bad first
        form.star(this.num, this.str, this.num) === false &&
        form.star(this.num, this.obj, this.num) === false &&
        form.star(this.num, this.bool, this.num) === false &&
        form.star(this.num, this.fn, this.num) === false &&
        form.star(this.num, this.arr, this.num) === false &&
        form.star(this.num, this.num, this.str) === false &&
        form.star(this.num, this.num, this.obj) === false &&
        form.star(this.num, this.num, this.bool) === false &&
        form.star(this.num, this.num, this.fn) === false &&
        form.star(this.num, this.num, this.arr) === false &&
        form.star(2, this.num, this.num) === false //minimum of 3 points in a star
        ),
    'form.star returns false on bad arguments');
    var testStar = form.star(3,2,5);
    ok(q.isO(testStar),'form.star returns an object of type "star" when passed (Number:points, Number:radius1, Number:radius2)');
    ok(q.objHas(testStar,'nPoints') && q.isN(testStar.nPoints), 'star objects have a Number property : "nPoints"');
    ok(q.objHas(testStar,'radius1') && q.isN(testStar.radius1), 'star objects have a Number property : "radius1"');
    ok(q.objHas(testStar,'radius2') && q.isN(testStar.radius2), 'star objects have a Number property : "radius2"');
    ok(q.isF(testStar.rotate) && q.isF(testStar.scale) && q.isF(testStar.draw), 'star objects have following methods: "rotate", "scale" and "draw"');
    ok((testStar.draw() === false &&
        testStar.draw(this.str) === false &&
        testStar.draw(this.num) === false &&
        testStar.draw(this.arr) === false &&
        testStar.draw(this.bool) === false &&
        testStar.draw(this.obj) === false &&
        testStar.draw(this.canvas,[10,10,10]) === false &&
        testStar.draw(this.canvas,[10,'10']) === false &&
        testStar.draw(this.canvas) === true
        ),'star.draw requires canvas element for first argument and optional array (representing position) as : [Number, Number]');
    testStar.scale(10,20);
    testStar.rotate(45);
    ok((testStar.transforms[0]['type']  === 'scale' && q.isA(testStar.transforms[0]['value']) &&
        testStar.transforms[0]['value'][0] === 10 && testStar.transforms[0]['value'][1] === 20 &&
        testStar.transforms[1]['type']  === 'rotate' && q.isN(testStar.transforms[1]['value']) && testStar.transforms[1]['value'] === 45
        ),'calling rotate or scale with correct arguments adds configuration objects to the transforms array');
    testStar.scale(this.str, this.num);
    testStar.scale(this.arr, this.num);
    testStar.scale(this.obj, this.num);
    testStar.scale(this.bool, this.num);
    testStar.scale(this.fn, this.num);
    testStar.scale(this.num, this.str);
    testStar.scale(this.num, this.arr);
    testStar.scale(this.num, this.obj);
    testStar.scale(this.num, this.bool);
    testStar.scale(this.num, this.fn);
    testStar.rotate(this.str);
    testStar.rotate(this.arr);
    testStar.rotate(this.obj);
    testStar.rotate(this.bool);
    testStar.rotate(this.fn);
    ok(testStar.transforms.length === 2, 'rotate and scale reject incorrect arguments');
});

