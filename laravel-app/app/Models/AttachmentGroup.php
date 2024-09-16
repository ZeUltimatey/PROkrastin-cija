<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AttachmentGroup extends Model
{
    protected $table = 'attachment_groups';
    protected $primaryKey = 'attachments_id';
    public $incrementing = true;
    public $timestamps = true;

}
