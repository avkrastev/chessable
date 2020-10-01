<?php

namespace App\Domain\Entity;

class Department
{
    public static $tableName = 'departments';

    protected $id;

    public const DEFAULT_ORDER_FIELD = 'id';
    public const DEFAULT_ORDER_TYPE = 'asc';

    public const ALLOWED_ORDER_FIELDS = [
        'id',
        'name',
        'description',
        'created_at',
        'updated_at',
    ];
    
    public const ALLOWED_ORDER_TYPES = ['asc', 'desc'];

    public static $fillable = ['name', 'description'];

    public function className()
    {
       return static::class;
    }

    public function toArray(): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'description' => $this->description,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at
        ];
    }
}
