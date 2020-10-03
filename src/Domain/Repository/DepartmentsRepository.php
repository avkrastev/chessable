<?php

namespace App\Domain\Repository;

use App\Storage\Mysql;
use App\Domain\Entity\Employee;
use App\Domain\Entity\Department;

class DepartmentsRepository extends AbstractRepository implements DepartmentsRepositoryInterface
{
    private $model;
    private $connection;
    
    public function __construct(Mysql $db, Department $model)
    {
        parent::__construct($db, $model);
        $this->model = $model;
        $this->connection = $db->getConnection();
    }

    public function getMaxSalaryPerDepartment(): array
    {
        $employeesTable = Employee::$tableName;

        $statement = "
            SELECT 
                {$this->model::$tableName}.name AS `department_name`, 
                IF(MAX({$employeesTable}.salary) IS NULL, 0, MAX({$employeesTable}.salary)) AS `salaries_sum`
            FROM
                {$this->model::$tableName}
            LEFT JOIN {$employeesTable} ON {$employeesTable}.department_id = {$this->model::$tableName}.id
            GROUP BY {$this->model::$tableName}.id;";

        try {
            $statement = $this->connection->query($statement);
            $result = $statement->fetchAll(\PDO::FETCH_ASSOC);

            return $result;
        } catch (\PDOException $e) {
            return $e->getMessage();
        }
    }

    public function showDepartmentsWithHighestSalaries($employeesNumber, $salary): array
    {
        $employeesTable = Employee::$tableName;

        $statement = "
            SELECT 
                {$this->model::$tableName}.*
            FROM
                {$this->model::$tableName}
            JOIN (SELECT * FROM {$employeesTable} WHERE salary > {$salary} GROUP BY department_id HAVING COUNT(*) > {$employeesNumber}) e 
            ON e.department_id = {$this->model::$tableName}.id
            GROUP BY {$this->model::$tableName}.id;";

        try {
            $statement = $this->connection->query($statement);
            $result = $statement->fetchAll(\PDO::FETCH_ASSOC);

            return $result;
        } catch (\PDOException $e) {
            return $e->getMessage();
        }
    }
}
