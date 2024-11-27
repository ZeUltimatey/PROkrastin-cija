<?php

namespace App\Http\Controllers;

use App\Services\ReportsService;
use Illuminate\Http\Request;

class ReportController extends Controller
{
    public function generate_check(Request $request)
    {
        $transaction_id = (int)$request->get('transaction_id');
        return ReportsService::download_check($transaction_id);
    }
}
