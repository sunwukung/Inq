<?php 
$css = $js = '';
include 'partials/header.php'; 
?>
<canvas id="ezl" width="900" height="900"></canvas>
<script>
(function(){
    var sqr = form.rec(50,50),
        crc = form.crc(50),
        ctx = document.getElementById('ezl').getContext('2d');

    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.strokeStyle = 'rgba(0,0,0,100)';
    ctx.fillStyle = 'rgba(0,0,0,0)';
    ctx.stroke();
    //sqr.rotate(45);
    //sqr.draw(ctx,[200,200]);
    crc.scale(2,3);
    crc.rotate(45);
    crc.draw(ctx,[200,200]);
}());

</script>

<?php include 'partials/footer.php'; ?>
