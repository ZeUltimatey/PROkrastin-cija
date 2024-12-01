<?php

namespace App\Exports;

use App\Models\Product;
use App\Models\Transaction;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithColumnWidths;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithStyles;
use Maatwebsite\Excel\Concerns\WithTitle;
use Illuminate\Support\Carbon;
use PhpOffice\PhpSpreadsheet\Style\Border;

class StatisticsExport implements FromCollection, WithHeadings, WithColumnWidths, WithTitle, WithStyles
{
    /**
     * Return the data for the export.
     */
    public function collection()
    {
        // Get the total sum of all transaction prices
        $totalPriceSum = Transaction::sum('total_pricing');

        // Get the total number of transactions
        $transactionCount = Transaction::count();

        // Get the number of unique users involved in the transactions
        $clientCount = Transaction::distinct('transactor_id')->count('transactor_id');

        // Get the total number of products
        $productCount = Product::count();

        // Prepare the summary data and recent transactions
        $summary = [
            ['Kopā pārdotais', $totalPriceSum],
            ['Pasūtījumu skaits', $transactionCount],
            ['Pircēju skiats', $clientCount],
            ['Produktu skaits', $productCount]
        ];

        return new Collection($summary);
    }

    /**
     * Define the headings for the exported sheet.
     *
     * @return array
     */
    public function headings(): array
    {
        return [
            'Statistika', 'Vērtība' // For the summary section
        ];
    }
    public function columnWidths(): array
    {
        return [
            'A' => 20, // Column A (ID)
            'B' => 9 // Column B (User ID)
        ];
    }

    /**
     * Set the worksheet name
     *
     * @return string
     */
    public function title(): string
    {
        return 'Murrātavas statistika';  // Name of the worksheet
    }

    public function styles(\PhpOffice\PhpSpreadsheet\Worksheet\Worksheet $sheet)
    {
        // Get the highest row and column in the sheet
        $highestRow = $sheet->getHighestRow(); // Returns the row number of the last row with data
        $highestColumn = $sheet->getHighestColumn(); // Returns the letter of the last column with data

        // Apply the border style to the entire range
        $styleArray = [
            'borders' => [
                'allBorders' => [
                    'borderStyle' => Border::BORDER_THIN,
                    'color' => ['argb' => '000000'], // Black border color
                ],
            ],
        ];

        // Apply style dynamically based on the highest row and column
        $sheet->getStyle('A1:' . $highestColumn . $highestRow)->applyFromArray($styleArray); // Apply to all cells with data

        // Make the headings bold (apply to the first row)
        $sheet->getStyle('A1:' . $highestColumn . '1')->getFont()->setBold(true); // Apply bold to the first row (headings)

        // Apply Euro format to cell B2
        $sheet->getStyle('B2')->getNumberFormat()->setFormatCode('€#,##0.00'); // Euro format (two decimal places)
    }
}
