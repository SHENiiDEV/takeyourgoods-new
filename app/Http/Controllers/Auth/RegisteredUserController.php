<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;

use App\Mail\WelcomeEmail;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $excludedCountries = [
            'Sudan',
            'Dem. Rep. of the Congo',
            'Democratic Republic of the Congo',
            'Congo, Democratic Republic of the',
            'Iran',
            'Iran, Islamic Republic of',
            'Mali',
            'Myanmar',
            'Myanmar (Burma)',
            'Burma',
            'North Korea',
            'Korea, Democratic People\'s Republic of',
            'South Sudan',
            'Syria',
            'Syrian Arab Republic',
            'Yemen',
            'Afghanistan',
            'Belarus',
            'Central African Republic',
            'Cuba',
            'Haiti',
            'Iraq',
            'Russia',
            'Russian Federation',
            'Somalia',
            'Venezuela',
            'Venezuela, Bolivarian Republic of',
            'Zimbabwe',
        ];

        $request->validate([
            'name' => 'required|string|max:255',
            'surname' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'phone' => 'required|string|max:50',
            'date_of_birth' => 'required|date|before:today',
            'street_address' => 'required|string|max:255',
            'city' => 'required|string|max:255',
            'country' => ['required', 'string', 'max:255', \Illuminate\Validation\Rule::notIn($excludedCountries)],
            'postcode' => 'required|string|max:30',
            'company_name' => 'nullable|string|max:255',
            'terms' => 'accepted',
        ], [
            'terms.accepted' => 'You must agree to the Terms & Conditions and Privacy Policy.',
            'country.not_in' => 'We are unable to onboard corporate accounts from this jurisdiction due to compliance restrictions.',
        ]);

        $formattedBillingAddress = trim(
            $request->street_address . ', ' . 
            $request->city . ', ' . 
            $request->postcode . ', ' . 
            $request->country
        );

        $user = User::create([
            'name' => $request->name,
            'surname' => $request->surname,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'phone' => $request->phone,
            'date_of_birth' => $request->date_of_birth,
            'street_address' => $request->street_address,
            'city' => $request->city,
            'country' => $request->country,
            'postcode' => $request->postcode,
            'company_name' => $request->company_name,
            'billing_address' => $formattedBillingAddress,
            'terms_accepted_at' => now(),
            'wallet_balance' => 0.00,
        ]);

        event(new Registered($user));

        // Dispatch Welcome Email
        try {
            Mail::to($user->email)->send(new WelcomeEmail($user));
        } catch (\Throwable $e) {
            Log::warning('Could not send welcome email: ' . $e->getMessage());
        }

        Auth::login($user);

        return redirect(route('dashboard', absolute: false));
    }

}

