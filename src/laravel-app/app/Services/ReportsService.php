<?php

namespace App\Services;

use App\Models\Transaction;
use Barryvdh\DomPDF\Facade\Pdf;

class ReportsService
{
    static public function download_check(int $transaction_id)
    {
        // Fetch the transaction with related models
        $transaction_model = Transaction::with('bought_products', 'location', 'transactor')->find($transaction_id);

        // Ensure proper encoding and font that supports Latvian characters
        $pdf = PDF::loadView('myPDF', [
            'transaction' => $transaction_model,
            'date' => date('m/d/Y'),
        ]);

        // Set options for the PDF (optional but can help with character encoding)
        $pdf->set_option('isHtml5ParserEnabled', true);
        $pdf->set_option('isPhpEnabled', true); // Enable PHP if you need it for custom calculations

        // Return the PDF as a downloadable file
        return $pdf->download('transaction_report.pdf');
    }
}
