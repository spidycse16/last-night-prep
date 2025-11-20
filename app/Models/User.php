<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password_hash',
        'username',
        'role',
        'bio',
        'skills',
        'metadata',
        'email_verified',
        'account_status',
        'provider',
        'provider_id',
        'avatar',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password_hash',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password_hash' => 'hashed',
            'skills' => 'array',
            'metadata' => 'array',
            'email_verified' => 'boolean',
        ];
    }

    /**
     * Get the password attribute.
     *
     * @param  string  $value
     * @return string
     */
    public function getPasswordAttribute()
    {
        return $this->password_hash;
    }

    /**
     * Set the password attribute.
     *
     * @param  string  $value
     * @return void
     */
    public function setPasswordAttribute($value)
    {
        $this->password_hash = $value;
    }
}