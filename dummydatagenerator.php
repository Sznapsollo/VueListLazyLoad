<?php
error_reporting(E_ALL);
ini_set('display_errors', '1');

function generateRandomString($length = 10) {
	$characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
	$charactersLength = strlen($characters);
	$randomString = '';
	for ($i = 0; $i < $length; $i++) {
		$randomString .= $characters[rand(0, $charactersLength - 1)];
	}
	return $randomString;
}

$request = file_get_contents('php://input');

$input = json_decode($request);
$pathPrefix = dirname(__DIR__).'/';

$startRow = 0;
$endRow = 100;

if(isset($input->startRow) && is_numeric($input->startRow) && isset($input->endRow) && is_numeric($input->endRow)) {
	$startRow = $input->startRow;
	$endRow = $input->endRow;
}

// i know this looks strange but i have my reasons to have exactly this structure ;-)
$returnObject = new stdClass();
$returnObject->response = new stdClass();

for($i=$startRow; $i < $endRow; $i++) {
	$item = new stdClass();
	$item->_id = $i;
	$item->_schemaName = generateRandomString();
	$returnObject->response->data[] = $item;
	$returnObject->response->totalRows = 550;
}

echo json_encode($returnObject);
?>