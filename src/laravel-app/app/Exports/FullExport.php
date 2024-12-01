<?php

namespace App\Exports;

use Maatwebsite\Excel\Concerns\WithMultipleSheets;

class FullExport implements WithMultipleSheets
{
    /**
     * Define the sheets that will be included in the export.
     *
     * @return array
     */
    public function sheets(): array
    {
        return [
            new StatisticsExport(),  // First sheet: Summary Data
            new TransactionExport(), // Second sheet: Recent Transactions
        ];
    }
}
