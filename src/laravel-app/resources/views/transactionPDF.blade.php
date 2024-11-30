<!DOCTYPE html>
<html lang="lv">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Transakcijas Pārskats</title>
    <style>
        @font-face {
            font-family: 'DejaVu Sans';
            src: url('{{ public_path('fonts/DejaVuSans.ttf') }}') format('truetype');
        }

        body {
            font-family: 'DejaVu Sans', sans-serif;
            font-size: 14px;
            margin: 0;
            padding: 0;
            color: #333;
        }

        .container {
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
        }

        .header {
            text-align: center;
            margin-bottom: 20px;
        }

        .header h1 {
            font-size: 20px;
            margin-bottom: 5px;
        }

        .header p {
            margin: 3px 0;
            font-size: 14px;
        }

        .section {
            margin-bottom: 20px;
        }

        .section h3 {
            font-size: 16px;
            margin-bottom: 10px;
        }

        .products table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 10px;
        }

        .products table th,
        .products table td {
            padding: 8px 0;
        }

        .products table th {
            border-bottom: 2px solid #333;
        }

        .products table th.right-align,
        .products table td.right-align {
            text-align: right;
        }

        .totals-row {
            font-weight: bold;
            border-top: 2px solid #333;
            margin-top: 10px;
            padding-top: 5px;
        }

        .totals-row td {
            padding-top: 5px;
        }

        .legal-notice {
            margin-top: 30px;
            font-size: 12px;
            color: #555;
            line-height: 1;
        }

        .address, .buyer {
            margin-bottom: 20px;
        }

        .address p, .buyer p {
            margin: 5px 0;
        }
    </style>
</head>
<body>
<div class="container">
    <div class="header">
        <h1>Transakcijas Pārskats</h1>
        <p>Datums: {{ $date }}</p>
        <p>Samaksāts: {{ $transaction->created_at->format('d/m/Y') }}</p>
        <p>Transakcijas Nr: {{ str_pad($transaction->id ?? '0', 6, '0', STR_PAD_LEFT) }}</p>
        <p>PVN Reģistrācijas Nr: LV40103987321</p>
    </div>

    <!-- Buyer Information Section -->
    <div class="buyer section">
        <p><strong>Vārds:</strong> {{ $transaction->transactor->name }} {{ $transaction->transactor->surname }}</p>
        <p><strong>E-pasts:</strong> {{ $transaction->transactor->email }}</p>
    </div>

    <!-- Products Section -->
    <div class="products section">
        <h3>Pasūtītās preces</h3>
        <table>
            <thead>
            <tr>
                <th>Preces Nosaukums</th>
                <th class="right-align">Skaits</th>
                <th class="right-align">PVN (par katru)</th>
                <th class="right-align">Cena (ar PVN)</th>
                <th class="right-align">Summa (ar PVN)</th>
            </tr>
            </thead>
            <tbody>
            @foreach ($transaction->bought_products as $product)
                <tr style="{{ $product->product_type == 'CATS' ? 'font-style: italic;' : '' }}">
                    <td>{{ $product->display_name }} {{ $product->type }}</td>
                    <td class="right-align">{{ $product->amount }}</td>
                    <td class="right-align">{{ number_format($product->price_per_product * 0.21, 2, ',', ' ') }} €</td>
                    <td class="right-align">{{ number_format($product->price_per_product, 2, ',', ' ') }} €</td>
                    <td class="right-align">{{ number_format($product->total_price, 2, ',', ' ') }} €</td>
                </tr>
            @endforeach
            </tbody>
            <tfoot>
            <tr class="totals-row">
                <td>Kopā:</td>
                <td class="right-align"></td>
                <td class="right-align"></td>
                <td class="right-align"></td>
                <td class="right-align"><strong>{{ number_format($transaction->total_pricing, 2, ',', ' ') }} €</strong></td>
            </tr>
            </tfoot>
        </table>
    </div>

    <!-- Address Section -->
    <div class="address section">
        @if ($transaction->location)
            <p><strong>Piegādes adrese:</strong> {{ $transaction->location->city }}, {{ $transaction->location->street }}{{ ', ' . $transaction->location->apartment_number ?? '' }} {{ $transaction->location->zip_code }}</p>
        @else
            <p><strong>Saņemšanas vieta:</strong> Torņa iela 4, Centra rajons, Rīga, LV-1050</p>
        @endif
    </div>

    <!-- Legal Notice Section -->
    <div class="legal-notice">
        <p>SIA "Murrātava", Torņa iela 4, Centra rajons, Rīga, LV-1050</p>
        <p>Reģistrācijas Nr: 40103987321</p>
        <p>PVN Reģistrācijas Nr: LV40103987321</p>
        <p>Bankas Rekvizīti: Swedbank Latvia, LV80HABA0551039435901</p>
    </div>
</div>
</body>
</html>
