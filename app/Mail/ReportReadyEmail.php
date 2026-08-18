<?php

namespace App\Mail;

use App\Models\SourcingReport;
use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class ReportReadyEmail extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(
        public User $user,
        public SourcingReport $report
    ) {
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Sourcing Dossier Ready: ' . $this->report->product_name . ' (' . strtoupper($this->report->tier) . ')',
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.report_ready',
        );
    }
}
