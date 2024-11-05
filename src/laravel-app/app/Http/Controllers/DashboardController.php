<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;

class DashboardController extends Controller
{
    public function index()
    {
        // Get the total sum of all transaction prices
        $totalPriceSum = Transaction::sum('total_pricing');

        // Get the total number of transactions
        $transactionCount = Transaction::count();

        // Get the number of unique users involved in the transactions
        $clientCount = Transaction::distinct('transactor_id')->count('transactor_id');

        // Get the total number of products
        $productCount = Product::count();

        // Get the transactions from the last 7 days and join with users table
        $recent = Transaction::where('transactions.created_at', '>=', Carbon::now()->subDays(7))
            ->join('users', 'transactions.transactor_id', '=', 'users.id')
            ->select('transactions.id as id', 'users.display_name', 'transactions.total_pricing', 'transactions.created_at')
            ->get();

        return response()->json([
            'earnings' => $totalPriceSum,
            'transactions' => $transactionCount,
            'clients' => $clientCount,
            'products' => $productCount,
            'recent' => $recent
        ], 200); // OK
    }
}
