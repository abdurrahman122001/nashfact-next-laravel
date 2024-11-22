<?php

use Laravel\Sanctum\Sanctum;

return [

    /*
    |--------------------------------------------------------------------------
    | Stateful Domains
    |--------------------------------------------------------------------------
    |
    | Requests from the following domains / hosts will receive stateful API
    | authentication cookies. Include local, staging, and production domains
    | that interact with your API via a frontend SPA or client.
    |
    */

    'stateful' => explode(',', env('SANCTUM_STATEFUL_DOMAINS', sprintf(
        '%s%s',
        'localhost,localhost:3000,127.0.0.1,127.0.0.1:8000,::1,mydomain.com,myapp.local',
        Sanctum::currentApplicationUrlWithPort()
    ))),

    /*
    |--------------------------------------------------------------------------
    | Sanctum Guards
    |--------------------------------------------------------------------------
    |
    | These authentication guards will be checked by Sanctum when trying to
    | authenticate a request. Typically, this is set to `web` for first-party
    | SPA or API-based authentication.
    |
    */

    'guard' => ['web'],

    /*
    |--------------------------------------------------------------------------
    | Expiration Minutes
    |--------------------------------------------------------------------------
    |
    | This controls how long issued tokens are valid. If `null`, tokens will
    | not expire by default. Configure this to enforce token expiration for
    | enhanced security.
    |
    */

    'expiration' => env('SANCTUM_TOKEN_EXPIRATION', 120), // Tokens expire after 2 hours (120 minutes)

    /*
    |--------------------------------------------------------------------------
    | Token Prefix
    |--------------------------------------------------------------------------
    |
    | Sanctum can prefix new tokens for security scanning tools to identify
    | leaked tokens in public repositories. Customize this prefix as needed.
    |
    */

    'token_prefix' => env('SANCTUM_TOKEN_PREFIX', 'sanctum_'),

    /*
    |--------------------------------------------------------------------------
    | Sanctum Middleware
    |--------------------------------------------------------------------------
    |
    | When authenticating a first-party SPA with Sanctum, customize the
    | middleware Sanctum uses while processing the request. Adjust these
    | middleware to match your application's security needs.
    |
    */

    'middleware' => [
        'authenticate_session' => Laravel\Sanctum\Http\Middleware\AuthenticateSession::class,
        'encrypt_cookies' => App\Http\Middleware\EncryptCookies::class,
        'verify_csrf_token' => App\Http\Middleware\VerifyCsrfToken::class,
    ],

];
