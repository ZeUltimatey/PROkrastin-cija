<?php

namespace App\Exports;

use App\Models\Transaction;
use Illuminate\Support\Facades\DB;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithColumnWidths;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithStyles;
use Maatwebsite\Excel\Concerns\WithTitle;
use PhpOffice\PhpSpreadsheet\Style\Border;

class TransactionExport implements FromCollection, WithHeadings, WithColumnWidths, WithTitle, WithStyles
{
    /**
     * Return a collection of data to be exported with joined data
     *
     * @return \Illuminate\Support\Collection
     */
    public function collection()
    {
        // Use SQLite's string concatenation operator (||) instead of CONCAT
        return Transaction::select(
            'transactions.id',
            'users.id as user_id',
            DB::raw('users.name || " " || users.surname as transactor_name'),
            DB::raw('
                locations.city || ", " ||
                locations.street || " " ||
                IFNULL(locations.apartment_number, "") || " " ||
                locations.zip_code as location_address
            '), // Combine location fields
            DB::raw('ROUND(transactions.total_pricing * 0.21, 2) as PVN'), // Round PVN to 2 decimals
            'transactions.total_pricing',
        )
            ->leftJoin('users', 'users.id', '=', 'transactions.transactor_id')
            ->leftJoin('locations', 'locations.id', '=', 'transactions.location_id')
            ->get();
    }

    /**
     * Define the headings for the exported sheet
     *
     * @return array
     */
    public function headings(): array
    {
        return [
            'Transakcijas numurs',
            'Pircēja ID',
            'Pircējs',
            'Adrese',
            'PVN (kopā)',
            'Kopā'
        ];
    }

    public function columnWidths(): array
    {
        return [
            'A' => 20, // Column A (ID)
            'B' => 9, // Column B (User ID)
            'C' => 20, // Column C (Transactor Name)
            'D' => 40, // Column D (Location Address)
            'E' => 11, // Column E (PVN)
            'F' => 9, // Column F (Total Pricing)
        ];
    }

    /**
     * Set the worksheet name
     *
     * @return string
     */
    public function title(): string
    {
        return 'Visas transakcijas';  // Name of the worksheet
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

        // Apply Euro format to columns E and F (PVN and Total Pricing)
        $sheet->getStyle('E2:E' . $highestRow) // Column E (PVN)
        ->getNumberFormat()->setFormatCode('€#,##0.00'); // Euro format (two decimal places)

        $sheet->getStyle('F2:F' . $highestRow) // Column F (Total Pricing)
        ->getNumberFormat()->setFormatCode('€#,##0.00'); // Euro format (two decimal places)
    }

}
