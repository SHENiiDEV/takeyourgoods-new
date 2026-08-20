<?php

namespace App\Services;

use App\Mail\DocumentPaymentMail;
use App\Mail\WalletTopUpMail;
use App\Models\Transaction;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;

class WalletService
{
    public function __construct(protected InvoiceService $invoiceService)
    {
    }

    /**
     * Credit the user's wallet, record transaction, generate B2B invoice and dispatch email.
     */
    public function topUp(User $user, float $amount, ?string $serviceName = null, array $metadata = []): array
    {
        if ($amount <= 0) {
            throw new \InvalidArgumentException('Top-up amount must be strictly greater than zero.');
        }

        if (!$serviceName) {
            $serviceName = match ((int)$amount) {
                149 => 'Starter Sourcing Package Credits (€149.00)',
                499 => 'Pro Supply Chain Sourcing Credits (€499.00)',
                1499 => 'Enterprise Custom Turnkey Sourcing Credits (€1,499.00)',
                default => 'TakeYourGoods B2B Platform Balance Top-Up (€' . number_format($amount, 2) . ')',
            };
        }

        $reference = 'TYG-TXN-' . date('Y') . '-' . strtoupper(Str::random(6));

        $result = DB::transaction(function () use ($user, $amount, $serviceName, $reference, $metadata) {
            $lockedUser = User::where('id', $user->id)->lockForUpdate()->firstOrFail();

            $transaction = Transaction::create([
                'user_id' => $lockedUser->id,
                'type' => 'top_up',
                'amount' => $amount,
                'currency' => 'EUR',
                'service_name' => $serviceName,
                'reference_number' => $reference,
                'status' => 'completed',
                'metadata' => $metadata,
            ]);

            $lockedUser->wallet_balance = (float)$lockedUser->wallet_balance + $amount;
            $lockedUser->save();

            $invoiceData = $this->invoiceService->generateInvoice($transaction, $lockedUser);

            return [
                'transaction' => $transaction,
                'invoice' => $invoiceData['invoice'],
                'pdf_content' => $invoiceData['pdf_content'],
                'user' => $lockedUser,
            ];
        });

        // Send Email confirmation with PDF invoice attached
        try {
            Mail::to($user->email)->send(
                new WalletTopUpMail(
                    $result['user'],
                    $result['transaction'],
                    $result['invoice'],
                    $result['pdf_content']
                )
            );
        } catch (\Throwable $e) {
            Log::warning('Could not send topup confirmation email: ' . $e->getMessage());
        }

        return $result;
    }

    /**
     * Deduct funds from user balance for a sourcing report or service, generate invoice, and dispatch DocumentPaymentMail.
     */
    public function deduct(User $user, float $amount, string $serviceName, array $metadata = []): Transaction
    {
        if ($amount <= 0) {
            throw new \InvalidArgumentException('Deduction amount must be strictly greater than zero.');
        }

        $reference = 'TYG-DED-' . date('Y') . '-' . strtoupper(Str::random(6));

        $result = DB::transaction(function () use ($user, $amount, $serviceName, $reference, $metadata) {
            $lockedUser = User::where('id', $user->id)->lockForUpdate()->firstOrFail();

            if ((float)$lockedUser->wallet_balance < $amount) {
                throw new \Exception('Insufficient wallet balance. Please top up your account.');
            }

            $lockedUser->wallet_balance = (float)$lockedUser->wallet_balance - $amount;
            $lockedUser->save();

            $transaction = Transaction::create([
                'user_id' => $lockedUser->id,
                'type' => 'deduction',
                'amount' => $amount,
                'currency' => 'EUR',
                'service_name' => $serviceName,
                'reference_number' => $reference,
                'status' => 'completed',
                'metadata' => $metadata,
            ]);

            $invoiceData = $this->invoiceService->generateInvoice($transaction, $lockedUser);

            return [
                'transaction' => $transaction,
                'invoice' => $invoiceData['invoice'],
                'pdf_content' => $invoiceData['pdf_content'],
                'user' => $lockedUser,
            ];
        });

        // Send Email notification with PDF invoice attached
        try {
            $projectName = $metadata['product_name'] ?? ($metadata['project_name'] ?? null);
            $projectUrl = isset($metadata['report_id']) ? url('/reports/' . $metadata['report_id']) : url('/dashboard');

            Mail::to($user->email)->send(
                new DocumentPaymentMail(
                    $result['user'],
                    $result['transaction'],
                    $result['invoice'],
                    $projectName,
                    $projectUrl,
                    $result['pdf_content']
                )
            );
        } catch (\Throwable $e) {
            Log::warning('Could not send document payment invoice email: ' . $e->getMessage());
        }

        return $result['transaction'];
    }
}

