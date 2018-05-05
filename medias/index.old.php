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
/*
$imageFile = __DIR__.'/'.$path;
if (!file_exists($imageFile)) {
    return;
}
$size = getimagesize($imageFile);

if (is_mobile_request()) {
    $mdSizeWidthLimit = 400;
    if (intval($size[0]) > $mdSizeWidthLimit) {
        require_once __DIR__.'/until/Image.php';

        $ext = substr($path, strrpos($path, '.') + 1);
        $mdImageFile = __DIR__.'/'.$path.'_md.'.$ext;

        if (!file_exists($mdImageFile)) {
            $blob = Image::factory($imageFile)->resize($mdSizeWidthLimit)->render(null, 80);
            $fb = fopen($mdImageFile, 'wb');
            if ($fb) {
                fwrite($fb, $blob);
                fclose($fb);
            }
        }
        $imageFile = $mdImageFile;
    }
}
*/
$size = getimagesize($imageFile);
$fp = fopen($imageFile, "rb");

if ($size && $fp) {
    header("Content-type: {$size['mime']}");
    fpassthru($fp);
    fclose($fp);
    exit;
}
