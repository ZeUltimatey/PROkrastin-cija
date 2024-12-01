<?php

namespace App\Http\Controllers;

use App\Http\Requests\GenerateTransactionFileRequest;
use App\Http\Resources\UserResource;
use App\Models\Transaction;
use App\Services\ReportsService;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class ReportController extends Controller
{
    public function generate_check(GenerateTransactionFileRequest $request)
    {
        // Sense
        $user = new UserResource(Auth::user());

        // Get the transaction in question
        $transaction_id = (int)$request->get('transaction_id');
        $transaction_model = Transaction::find($transaction_id);

        // Check if the user has permission to download this transaction
        $allowed = false;
        if ($user->user_role == 'Admin') { $allowed = true; }
        else if ($user->id == $transaction_model->transactor_id) { $allowed = true; }

        // Download transaction if it was allowed to do so
        if ($allowed) { return ReportsService::download_check($transaction_id); }
        return response()->json(['error' => 'No permission to view this transaction.'], 403); // Forbidden
    }

    public function generate_statistics(Request $request)
    {
        // Retrieve the export type from the request (default to 'xlsx' if not provided)
        $exportType = $request->input('export_type', 'xlsx');

        // Pass the export_type to the download_statistics method in the ReportsService
        return ReportsService::download_statistics($exportType);
    }
}
