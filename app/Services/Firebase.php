<?php

namespace App\Services;

use Kreait\Firebase\Factory;
use Kreait\Firebase\Messaging\CloudMessage;
use Kreait\Firebase\Messaging\Notification;
use Kreait\Firebase\Messaging\TopicSubscription;
use Kreait\Messaging\Message;
use Kreait\Firebase\Messaging\FcmOptions;

class Firebase
{
	private $messaging;
	public function __construct()
	{
		$factory = (new Factory)->withServiceAccount(base_path('storage/google/firebase.json'));
		$this->messaging = $factory->createMessaging();
	}


	public function sendOneUser($token, $notification, $url)
	{
		$message = CloudMessage::withTarget('token', $token)
			->withNotification(Notification::create(...$notification))->withData(['url' => $url]);
		return $this->messaging->send($message);

	}

	public function sendManyUser($tokens, $notification, $url)
	{
		$message = CloudMessage::new()
			->withNotification(Notification::create(...$notification))->withData(['url' => $url]);

		$this->messaging->sendMulticast($message, $tokens);
	}


	public function sendTopic($topic, $notification, $url)
	{
		$message = CloudMessage::withTarget('topic', $topic)
			->withNotification(Notification::create(...$notification))->withData(['url' => $url]);

		return $this->messaging->send($message);
	}


	public function tokenInformation($token)
	{
		$appInstance = $this->messaging->getAppInstance($token);
		return $appInstance->rawData();
	}


	public function subscribeToTopic($topic , $token)
	{
		$this->messaging->subscribeToTopic($topic, $token);
	}

	public function unSubscribeToTopic($topic, $token)
	{
		$this->messaging->unsubscribeFromTopic($topic, $token);
	}


	public function clearAllTopics($token)
	{
		$this->messaging->unsubscribeFromAllTopics($token);
	}
}

