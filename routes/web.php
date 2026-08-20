<?php

use App\Http\Controllers\BillingController;
use App\Http\Controllers\LegalController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SourcingReportController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Public Landing, Info & Legal Pages
Route::get('/', function () {
    return Inertia::render('Welcome', [
        'company' => config('services.company'),
    ]);
})->name('home');

Route::get('/how-it-works', [\App\Http\Controllers\ContactController::class, 'howItWorks'])->name('how-it-works');
Route::get('/contact', [\App\Http\Controllers\ContactController::class, 'contact'])->name('contact');
Route::post('/contact', [\App\Http\Controllers\ContactController::class, 'send'])->name('contact.send');
Route::get('/support', [\App\Http\Controllers\ContactController::class, 'support'])->name('support');
Route::get('/about', [\App\Http\Controllers\ContactController::class, 'about'])->name('about');

Route::get('/terms', [LegalController::class, 'terms'])->name('terms');
Route::get('/privacy', [LegalController::class, 'privacy'])->name('privacy');
Route::get('/refund', [LegalController::class, 'refund'])->name('refund');


// Authenticated Routes
Route::middleware(['auth'])->group(function () {
    // Sourcing Dashboard & Reports
    Route::get('/dashboard', [SourcingReportController::class, 'index'])->name('dashboard');
    Route::get('/reports/create', [SourcingReportController::class, 'create'])->name('reports.create');
    Route::post('/reports', [SourcingReportController::class, 'store'])->name('reports.store');
    Route::get('/reports/{report}', [SourcingReportController::class, 'show'])->name('reports.show');
    Route::get('/reports/{report}/pdf', [SourcingReportController::class, 'downloadPdf'])->name('reports.pdf');

    // Wallet & Billing
    Route::get('/billing', [BillingController::class, 'index'])->name('billing.index');
    Route::post('/billing/top-up', [BillingController::class, 'topUp'])->name('billing.top-up');
    Route::get('/invoices/{invoice}/download', [BillingController::class, 'downloadInvoice'])->name('invoices.download');
    Route::get('/wallet/invoice/{transaction}', [BillingController::class, 'downloadInvoiceByTransaction'])->name('wallet.invoice');


    // User Profile
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';

