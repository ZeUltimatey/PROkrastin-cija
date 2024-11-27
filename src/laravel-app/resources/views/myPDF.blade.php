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
        }

        .container {
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            border: 1px solid #ccc;
        }

        .header {
            text-align: center;
            margin-bottom: 30px;
        }

        .details,
        .products {
            margin-top: 20px;
        }

        .details th, .details td,
        .products th, .products td {
            padding: 8px;
            border: 1px solid #ddd;
        }

        .details th, .products th {
            text-align: left;
            background-color: #f2f2f2;
        }

        .location th, .location td {
            padding: 8px;
            border: 1px solid #ddd;
        }
    </style>
</head>
<body>
<div class="container">
    <div class="header">
        <h1>Transakcijas Pārskats</h1>
        <p>Datums: {{ $date }}</p>
    </div>

    <div class="details">
        <table style="width:100%">
            <tr>
                <th>Transakcijas ID</th>
                <td>{{ $transaction->id }}</td>
            </tr>
            <tr>
                <th>Transakcijas Datums</th>
                <td>{{ $transaction->created_at->format('d/m/Y') }}</td>
            </tr>
            <tr>
                <th>Vispārējā summa</th>
                <td>${{ number_format($transaction->total_pricing, 2) }}</td>
            </tr>
        </table>
    </div>

    <div class="products">
        <h3>Pirktās Preces</h3>
        <table style="width:100%">
            <thead>
            <tr>
                <th>Preces Nosaukums</th>
                <th>Daudzums</th>
                <th>Cena</th>
                <th>Summa</th>
            </tr>
            </thead>
            <tbody>
            @foreach ($transaction->bought_products as $product)
                <tr>
                    <td>{{ $product->display_name }}</td>
                    <td>{{ $product->amount }}</td>
                    <td>${{ number_format($product->price_per_product, 2) }}</td>
                    <td>${{ number_format($product->total_price, 2) }}</td>
                </tr>
            @endforeach
            </tbody>
        </table>
    </div>

    <div class="location">
        <h3>Piegādes Adrese</h3>
        @if ($transaction->location)
            <table style="width:100%">
                <tr>
                    <th>Norādītā atrašanās vieta</th>
                    <td>{{ $transaction->location->location_name ?? 'N/A' }}</td>
                </tr>
                <tr>
                    <th>Pilsēta</th>
                    <td>{{ $transaction->location->city }}</td>
                </tr>
                <tr>
                    <th>Iela</th>
                    <td>{{ $transaction->location->street }}</td>
                </tr>
                <tr>
                    <th>Dzīvokļa Numurs</th>
                    <td>{{ $transaction->location->apartment_number ?? 'N/A' }}</td>
                </tr>
                <tr>
                    <th>Pasta Indekss</th>
                    <td>{{ $transaction->location->zip_code }}</td>
                </tr>
            </table>
        @else
            <p>Jums jāierodas un jāsaņem preces individuāli.</p>
        @endif
    </div>

    <div class="transactor">
        <h3>Pircēja Informācija</h3>
        <table style="width:100%">
            <tr>
                <th>Vārds</th>
                <td>{{ $transaction->transactor->name }} {{ $transaction->transactor->surname }}</td>
            </tr>
            <tr>
                <th>E-pasts</th>
                <td>{{ $transaction->transactor->email }}</td>
            </tr>
            <tr>
                <th>Telefons</th>
                <td>{{ $transaction->transactor->phone_number ?? 'N/A' }}</td>
            </tr>
        </table>
    </div>
</div>
</body>
</html>
