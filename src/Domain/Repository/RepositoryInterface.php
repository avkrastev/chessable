<?php

namespace App\Domain\Repository;

interface RepositoryInterface
{
    public function getAll($order = 'id', $orderType = 'DESC', $limit = 100, $offset = 0): array;

    public function getById(int $id);

    public function insert(array $data);

    public function update(int $id, array $data);

    public function delete(int $id);
    
    public function count();

    public function beginTransaction();

    public function rollbackTransaction();

    public function commitTransaction();
}
