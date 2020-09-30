<?php

namespace App\Domain\Repository;

use App\Storage\Mysql;
use App\Domain\Entity\Employee;
use App\Domain\Entity\Department;

class EmployeesRepository extends AbstractRepository implements EmployeesRepositoryInterface
{
    private $model;
    private $connection;

    public function __construct(Mysql $db, Employee $model)
    {
        parent::__construct($db, $model);
        $this->model = $model;
        $this->connection = $db->getConnection();
    }

    public function getAll($order = 'id', $orderType = 'DESC', $limit = 100, $offset = 0): array
    {
        $departmentsTable = Department::$tableName;

        $statement = "
            SELECT {$this->model::$tableName}.*, 
                   {$departmentsTable}.name as `department`
            FROM
                {$this->model::$tableName}
            LEFT JOIN {$departmentsTable} ON {$departmentsTable}.id = {$this->model::$tableName}.department_id
            ORDER BY {$order} {$orderType}
            LIMIT {$limit} OFFSET {$offset};";

        try {
            $statement = $this->connection->query($statement);
            $result = $statement->fetchAll(\PDO::FETCH_ASSOC);

            return $result;
        } catch (\PDOException $e) {
            return $e->getMessage();
        }
    }

}
