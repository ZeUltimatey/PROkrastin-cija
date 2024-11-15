<?php

namespace App\Services;

use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\MessageBag;

class PaginateService
{
    public Collection $resource_collection;
    public array $query_parameters;

    public function __construct(Request $request, $collections)
    {
        $this->query_parameters = $request->except('page');
        $this->resource_collection = collect();
        foreach ($collections as $collection)
        {
            $this->resource_collection = $this->resource_collection->merge($collection);
        }
    }

    public function get_page(int $page, int $products_per_page = 10)
    {
        $total = $this->resource_collection->count();
        $last_page = (int) ceil($total / $products_per_page);
        $page = max(1, min($page, $last_page));
        $offset = ($page - 1) * $products_per_page;

        $data = $this->resource_collection->slice($offset, $products_per_page);

        $first_url = $this->build_url(1);
        $last_url = $this->build_url($last_page);
        $next_url = $page < $last_page ? $this->build_url($page + 1) : null;
        $prev_url = $page > 1 ? $this->build_url($page - 1) : null;

        // Prepare pagination links with ellipses
        $links = [];
        $range = 2; // Number of pages to show around the current page
        $display_pages = [];

        // Always show the first and last pages
        $display_pages[] = 1;
        if ($last_page > 1) {
            $display_pages[] = $last_page;
        }

        // Add pages around the current page
        for ($i = max($page - $range, 2); $i <= min($page + $range, $last_page - 1); $i++) {
            $display_pages[] = $i;
        }

        // Sort and remove duplicates to get a unique list of pages
        $display_pages = array_unique($display_pages);
        sort($display_pages);

        // Build links with ellipses
        $previous_page = null;
        foreach ($display_pages as $p) {
            if ($previous_page && $p > $previous_page + 1) {
                $links[] = [
                    'url' => null,
                    'label' => '...',
                    'active' => false,
                ];
            }

            $links[] = [
                'url' => $this->build_url($p),
                'label' => (string) $p,
                'active' => $p === $page,
            ];

            $previous_page = $p;
        }

        // Add "previous" and "next" to the links array
        array_unshift($links, [
            'url' => $prev_url,
            'label' => '&laquo; Previous',
            'active' => false,
        ]);

        $links[] = [
            'url' => $next_url,
            'label' => 'Next &raquo;',
            'active' => false,
        ];

        return [
            'data' => $data->values(),
            'links' => [
                'first' => $first_url,
                'last' => $last_url,
                'next' => $next_url,
                'prev' => $prev_url,
            ],
            'meta' => [
                'current_page' => $page,
                'from' => $offset + 1,
                'to' => min($offset + $products_per_page, $total),
                'last_page' => $last_page,
                'per_page' => $products_per_page,
                'total' => $total,
                'links' => $links,
            ],
        ];
    }

    public function build_url(int $page)
    {
        $this->query_parameters['page'] = $page;
        return url()->current() . '?' . http_build_query($this->query_parameters);
    }
}
