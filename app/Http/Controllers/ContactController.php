<?php

namespace App\Http\Controllers;

use App\Mail\ContactMessageMail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;
use Inertia\Response;

class ContactController extends Controller
{
    /**
     * Display Contact Us page with dynamic company credentials.
     */
    public function contact(): Response
    {
        return Inertia::render('Public/Contact', [
            'company' => [
                'name' => config('services.company.name', env('COMPANY_NAME', 'COLCHESTER LTD')),
                'number' => config('services.company.number', env('COMPANY_NUMBER', '16113808')),
                'address' => config('services.company.address', env('COMPANY_ADDRESS', 'Dept 6898 126 East Ferry Road, Canary Wharf, London, England, E14 9FP')),
                'email' => config('mail.from.address', env('MAIL_FROM_ADDRESS', 'info@takeyourgoods.co.uk')),
            ],
        ]);
    }

    /**
     * Handle support ticket form submission.
     */
    public function send(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'subject' => 'required|string|max:255',
            'message' => 'required|string|min:10|max:5000',
        ]);

        $recipient = config('mail.from.address', env('MAIL_FROM_ADDRESS', 'info@takeyourgoods.co.uk'));

        try {
            Mail::to($recipient)->send(
                new ContactMessageMail(
                    name: $request->name,
                    email: $request->email,
                    contactSubject: $request->subject,
                    contactMessage: $request->message,
                    ip: $request->ip()
                )
            );
        } catch (\Throwable $e) {
            Log::error('Could not send contact message email: ' . $e->getMessage());
        }

        return redirect()->back()->with('success', 'Your inquiry has been received! Our trade desk will respond within 4 business hours.');
    }

    /**
     * Display How It Works interactive workflow page.
     */
    public function howItWorks(): Response
    {
        return Inertia::render('Public/HowItWorks', [
            'company' => config('services.company'),
        ]);
    }

    /**
     * Display Support & Help Desk page with FAQ accordion.
     */
    public function support(): Response
    {
        return Inertia::render('Public/Support', [
            'company' => [
                'name' => config('services.company.name', env('COMPANY_NAME', 'COLCHESTER LTD')),
                'number' => config('services.company.number', env('COMPANY_NUMBER', '16113808')),
                'address' => config('services.company.address', env('COMPANY_ADDRESS', 'Dept 6898 126 East Ferry Road, Canary Wharf, London, England, E14 9FP')),
                'email' => config('mail.from.address', env('MAIL_FROM_ADDRESS', 'info@takeyourgoods.co.uk')),
            ],
        ]);
    }

    /**
     * Display About Us corporate page.
     */
    public function about(): Response
    {
        return Inertia::render('Public/About', [
            'company' => config('services.company'),
        ]);
    }
}
