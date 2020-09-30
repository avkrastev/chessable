<?php

namespace App\Domain\Entity;

class Employee
{
    public static string $tableName = 'employees';

    protected ?int $id;

    public const DEFAULT_ORDER_FIELD = 'id';
    public const DEFAULT_ORDER_TYPE = 'asc';

    public const ALLOWED_ORDER_FIELDS = [
        'id',
        'department_id',
        'first_name',
        'last_name',
        'salary',
        'created_at',
        'updated_at',
    ];
    public const ALLOWED_ORDER_TYPES = ['asc', 'desc'];

    public static array $fillable = ['department_id', 'first_name', 'last_name', 'salary'];

    public function className()
    {
       return static::class;
    }

    public function toArray(): array
    {
        return [
            'id' => $this->id,
            'first_name' => $this->first_name,
            'last_name' => $this->last_name, 
            'salary' => $this->salary,
            'department_id' => $this->department_id,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at
        ];
    }
}
