<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class ContactMessageMail extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(
        public string $name,
        public string $email,
        public string $contactSubject,
        public string $contactMessage,
        public ?string $ip = null
    ) {
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'New Support Ticket: ' . $this->contactSubject . ' (from ' . $this->name . ')',
            replyTo: [$this->email],
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.contact_message',
        );
    }

    public function attachments(): array
    {
        return [];
    }
}
