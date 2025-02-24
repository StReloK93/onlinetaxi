<?php

namespace App\Services;

use App\Models\User;

class UserService
{
    public function updateUserName(User $user, string $name): User
    {
        $user->update([
            'name' => $name,
        ]);

        return $user->fresh();
    }

    public function getAuthUser(User $user): User
    {
        return $user;
    }
}
