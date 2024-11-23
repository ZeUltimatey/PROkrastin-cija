<?php

namespace App\Http\Controllers;

use App\Services\ReportsService;
use Illuminate\Http\Request;

class ReportController extends Controller
{
    public function generate_check()
    {
        return ReportsService::download_check();
    }
}
