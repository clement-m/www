<?php
session_start();

$s = isset($_SESSION['session']) ? $_SESSION['session'] : "";
require_once 'LIB/twig/lib/Twig/Autoloader.php';
Twig_Autoloader::register();
$loader= new Twig_Loader_Filesystem('SRC/Views');
$twig = new Twig_Environment($loader, array('cache' => 'SRC/cache'));
$template= $twig->loadTemplate('index.html.twig');
echo $template->render(array('session' => $s));
