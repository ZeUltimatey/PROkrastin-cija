<?php

namespace App\Services;

use App\Exports\FullExport;
use App\Exports\TransactionExport;
use App\Models\Transaction;
use Barryvdh\DomPDF\Facade\Pdf;
use Maatwebsite\Excel\Facades\Excel;

class ReportsService
{
    static public function download_check(int $transaction_id)
    {
        // Fetch the transaction with related models
        $transaction_model = Transaction::with('bought_products', 'location', 'transactor')->find($transaction_id);

        // Sort the products with a combined comparator
        $sortedProducts = $transaction_model->bought_products->sort(function ($a, $b) {
            // Sort by type: Non-CATS first, CATS last
            if ($a->product_type !== $b->product_type) {
                return $a->product_type === 'CATS' ? 1 : -1;
            }

            // If type is the same, sort by price (descending)
            return $b->price_per_product <=> $a->price_per_product;
        });

        // Replace the unsorted products with the sorted ones
        $transaction_model->setRelation('bought_products', $sortedProducts);

        // Create the PDF with the sorted products
        $pdf = PDF::loadView('transactionPDF', [
            'transaction' => $transaction_model,
            'date' => date('d/m/Y'),
        ]);

        // Set options for the PDF (optional but can help with character encoding)
        $pdf->set_option('isHtml5ParserEnabled', true);
        $pdf->set_option('isPhpEnabled', true); // Enable PHP if you need it for custom calculations

        // Return the PDF as a downloadable file
        return $pdf->download('transaction_report.pdf');
    }

    static public function download_statistics()
    {
        return Excel::download(new FullExport(), 'Murrātava.xlsx');
    }
}
