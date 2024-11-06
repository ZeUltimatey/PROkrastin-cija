<?php

namespace App\Services;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\MessageBag;

class ValidationService
{
    public bool $success;
    public array $valid_data;
    public MessageBag $errors;

    public function __construct(array $data_to_validate, array $validation_rules)
    {
        // Initialize
        $validator = Validator::make($data_to_validate, $validation_rules);
        $this->valid_data = [];
        $this->errors = new MessageBag();

        // On validation fail - ["errors" => [...]]
        if ($validator->fails()) {
            $this->success = false;
            $this->errors = $validator->errors();
        }

        // On validation success - ["data" => [...]]
        $this->success = true;
        $this->valid_data = $data_to_validate;
    }

    public function error_response()
    {
        if (!$this->success) {
            return response()->json($this->errors, 422); // Unprocessable entity
        }

        return response()->json(["errors" => "Valid data has been mistaken for invalid data."], 400); // Bad request
    }
}
