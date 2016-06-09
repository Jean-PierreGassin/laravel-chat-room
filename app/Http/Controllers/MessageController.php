<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Routing\Controller as BaseController;

class MessageController extends BaseController
{
	protected $user;
	protected $message;

	public function __construct($user = 'Guest', $message = null) {
		$this->user = $user;
		$this->message = $message;
	}

	public function index() {
		// fetch db logs of chats and return them

		// return (new Response($line, 200))->send();
	}

	public function create() {
		// return (new Response(null, 404))->send();
	}
}
