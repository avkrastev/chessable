<?php

namespace App\Domain\Repository;

interface DepartmentsRepositoryInterface extends RepositoryInterface
{
    public function getMaxSalaryPerDepartment(): array;

    public function showDepartmentsWithHighestSalaries($employeesNumber, $salary): array;
}
