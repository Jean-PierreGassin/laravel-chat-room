<?php

namespace App\Http\Controllers;

use Symfony\Component\HttpKernel\Response;
use Illuminate\Routing\Controller as BaseController;

class MessageController extends BaseController
{
	protected $user;
	protected $message;
	protected $chatFile;
	protected $chatFilePath;

	public function __construct($user = 'Guest', $message = null) {
		$this->user = $user;
		$this->message = $message;
		$this->chatFilePath = "logs/chat.txt";

		if (!file_exists($this->chatFilePath)) {
			$this->chatFile = fopen($this->chatFilePath, "w+");
		}
	}

	public function index() {
		$chatFile = fopen($this->chatFilePath, "r");

		while (($line = fgets($chatFile)) !== false) {
			return (new Response(null, 404))->send();
		}

		fclose($chatFile);
	}

	public function create() {
		$chatFile = fopen($this->chatFilePath, "w+");

	}
}
