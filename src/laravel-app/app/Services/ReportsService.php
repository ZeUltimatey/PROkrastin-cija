<?php

namespace App\Services;

use Barryvdh\DomPDF\Facade\Pdf;

class ReportsService
{
    static public function download_check()
    {
        $data = [
            'title' => 'Laravel PDF Example',
            'date' => date('m/d/Y'),
        ];

        $pdf = Pdf::loadView('myPDF', $data);

        return $pdf->download('document.pdf');
    }
}
