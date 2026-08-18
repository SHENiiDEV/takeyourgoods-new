<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class LegalController extends Controller
{
    public function terms(): Response
    {
        return Inertia::render('Legal/Terms', [
            'company' => config('services.company'),
        ]);
    }

    public function privacy(): Response
    {
        return Inertia::render('Legal/Privacy', [
            'company' => config('services.company'),
        ]);
    }

    public function refund(): Response
    {
        return Inertia::render('Legal/Refund', [
            'company' => config('services.company'),
        ]);
    }
}
