<?php

namespace App\Mail;

use App\Models\Invoice;
use App\Models\Transaction;
use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Attachment;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Storage;

class TopUpSuccessEmail extends Mailable
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
            subject: 'Payment Confirmed: €' . number_format($this->transaction->amount, 2) . ' Credited to TakeYourGoods Wallet',
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.topup_success',
        );
    }

    /**
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        $attachments = [];

        if ($this->pdfRawContent) {
            $filename = ($this->invoice ? $this->invoice->invoice_number : 'Invoice-' . $this->transaction->id) . '.pdf';
            $attachments[] = Attachment::fromData(fn () => $this->pdfRawContent, $filename)
                ->withMime('application/pdf');
        } elseif ($this->invoice && $this->invoice->pdf_path && Storage::disk('public')->exists($this->invoice->pdf_path)) {
            $attachments[] = Attachment::fromStorageDisk('public', $this->invoice->pdf_path)
                ->as($this->invoice->invoice_number . '.pdf')
                ->withMime('application/pdf');
        }

        return $attachments;
    }
}
