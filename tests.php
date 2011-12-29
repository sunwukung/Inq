<?php
$types = array('form','calc','shade','k', 'list');
$type = (isset($_GET['type']) && in_array($_GET['type'],$types))?$_GET['type']:'inq';

$css = '<link rel="stylesheet" href="http://code.jquery.com/qunit/git/qunit.css" type="text/css" media="screen" />';
$js = '<script src="http://code.jquery.com/jquery-latest.js"></script>';
$js .= '<script type="text/javascript" src="http://code.jquery.com/qunit/git/qunit.js"></script>';
$js .= '<script type="text/javascript" src="/js/tests/'.$type.'-tests.js"></script>';

include 'partials/header.php';
?>
<h1 id="qunit-header"><?php echo ucfirst(strtolower($type));?> Tests</h1>
<h2 id="qunit-banner"></h2>
<div id="qunit-testrunner-toolbar"></div>
<h2 id="qunit-userAgent"></h2>
<ol id="qunit-tests"></ol>
<?php include 'partials/footer.php'; ?>