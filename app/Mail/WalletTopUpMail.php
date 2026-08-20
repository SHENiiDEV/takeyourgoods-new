<?php

namespace App\Mail;

use App\Models\Invoice;
use App\Models\Transaction;
use App\Models\User;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Attachment;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class WalletTopUpMail extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(
        public User $user,
        public Transaction $transaction,
        public ?Invoice $invoice = null,
        public ?string $pdfRawContent = null
    ) {
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'TakeYourGoods AI — Wallet Top-Up Receipt (€' . number_format($this->transaction->amount, 2) . ')',
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.wallet_topup',
            with: [
                'invoiceRef' => $this->invoice?->invoice_number ?? $this->transaction->reference_number ?? ('INV-' . $this->transaction->id),
            ],
        );
    }

    /**
     * In-memory PDF attachment generation.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        $invoiceRef = $this->invoice?->invoice_number ?? $this->transaction->reference_number ?? ('INV-' . $this->transaction->id);

        if ($this->pdfRawContent) {
            $pdfData = $this->pdfRawContent;
        } else {
            $pdf = Pdf::loadView('pdf.wallet_invoice', [
                'transaction' => $this->transaction,
                'user' => $this->user,
                'invoice' => $this->invoice,
                'invoiceNumber' => $invoiceRef,
            ]);
            $pdfData = $pdf->output();
        }

        return [
            Attachment::fromData(fn () => $pdfData, "Invoice_{$invoiceRef}.pdf")
                ->withMime('application/pdf'),
        ];
    }
}
