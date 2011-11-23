test('library components', function() {
    ok(typeof inq === 'object', 'the inq namespace exists');
});

test('inq',function(){
    ok(typeof inq.rotate === 'function','inq.rotate is a function');
    ok(typeof inq.scale === 'function','inq.scale is a function');
    ok(typeof inq.move === 'function','inq.move is a function');
});


