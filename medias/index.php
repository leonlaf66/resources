<?php
require_once __DIR__.'/until/funcs.php';
$config = include(__DIR__.'/etc.php');

ini_set("display_errors","On");
error_reporting(E_ALL);

$path = $_GET['d'] ?? null;
if (! $path) {
    return;
}

$imageFile = $config['cdn'].'/medias/'.$path;

$size = getimagesize($imageFile);
$fp = fopen($imageFile, "rb");

if ($size && $fp) {
    header("Content-type: {$size['mime']}");
    fpassthru($fp);
    fclose($fp);
    exit;
}
