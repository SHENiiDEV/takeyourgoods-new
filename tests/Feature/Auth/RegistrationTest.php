<?php

namespace Tests\Feature\Auth;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class RegistrationTest extends TestCase
{
    use RefreshDatabase;

    public function test_registration_screen_can_be_rendered(): void
    {
        $response = $this->get('/register');

        $response->assertStatus(200);
    }

    public function test_new_users_can_register(): void
    {
        $response = $this->post('/register', [
            'name' => 'Alexander',
            'surname' => 'Vance',
            'email' => 'test@example.com',
            'password' => 'Password123!',
            'password_confirmation' => 'Password123!',
            'phone' => '+44 20 7946 0991',
            'date_of_birth' => '1990-05-15',
            'street_address' => '126 East Ferry Road',
            'city' => 'London',
            'country' => 'United Kingdom',
            'postcode' => 'E14 9FP',
            'company_name' => 'Vance Logistics Ltd',
            'terms' => true,
        ]);

        $this->assertAuthenticated();
        $response->assertRedirect(route('dashboard', absolute: false));
        $this->assertDatabaseHas('users', [
            'email' => 'test@example.com',
            'name' => 'Alexander',
            'surname' => 'Vance',
            'city' => 'London',
            'country' => 'United Kingdom',
        ]);
    }

    public function test_registration_rejects_restricted_countries(): void
    {
        $response = $this->post('/register', [
            'name' => 'Test',
            'surname' => 'User',
            'email' => 'restricted@example.com',
            'password' => 'Password123!',
            'password_confirmation' => 'Password123!',
            'phone' => '+123456789',
            'date_of_birth' => '1990-05-15',
            'street_address' => 'Sample Street 1',
            'city' => 'City',
            'country' => 'North Korea',
            'postcode' => '00000',
            'terms' => true,
        ]);

        $response->assertSessionHasErrors(['country']);
        $this->assertGuest();
    }

}
