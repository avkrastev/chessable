<?php
namespace App\Api\Controllers;

use App\Domain\Repository\EmployeesRepositoryInterface;
use App\Domain\Entity\Employee;

class EmployeesController
{
    private $employeesRepository;

    public function __construct(EmployeesRepositoryInterface $employeesRepository)
    {
        $this->employeesRepository = $employeesRepository;
    }

    /**
     * @return string
     * @throws \Pecee\Exceptions\InvalidArgumentException
     */
    public function show(int $id): string
	{
        $employee = $this->employeesRepository->getById($id);
        if ($employee !== false) {
            return response()->json($employee->toArray());
        }

        // not found
        return response(404)->json([]);
	}

    /**
     * @return string|null
     */
    public function index(): ?string
    {
        // TODO order
        $employees = $this->employeesRepository->getAll();
        
        return response()->json($employees);
    }

    /**
     * @return string|null
     */
    public function store(int $id = null): ?string
    {
        $data = input()->all();

        // Create new record
        if (is_null($id)) {
            $lastInsertedId = $this->employeesRepository->insert($data);
        
            $employee = $this->employeesRepository->getById($lastInsertedId);
            if ($employee !== false) {
                return response(201)->json($employee->toArray());
            }
    
            // TODO not found
            return response(404)->json([]);
        }

        // Update existing record
        $updateId = $this->employeesRepository->update($id, $data);

        $employee = $this->employeesRepository->getById($updateId);
        if ($employee !== false) {
            return response()->json($employee->toArray());
        }

        // TODO not found
        return response(404)->json([]);

    }

    /**
     * @param mixed $id
     * @return string|null
     */
    public function update(int $id): ?string
    {
        return response(202)->json([
            'info' => 'Please use POST instead of PUT/PATCH!'
        ]);
    }

    /**
     * @param mixed $id
     * @return string|null
     */
    public function destroy(int $id): ?string
    {
        $employee = $this->employeesRepository->getById($id);
        if ($employee === false) {
            return response(404)->json([
                'error' => sprintf('The record with ID: %s does not exist!', $id),
            ]);
        }
        
        $response = $this->employeesRepository->delete($id);
        if ($response instanceof \PDOException) {
            $errorMessage = 'Database error!';
            if ($response->getCode() == '23000') {
                $errorMessage = 'The record can not be deleted because it is in use!';
            }

            return response(500)->json([
                'error' => $errorMessage,
            ]);
        }

        if ($response) {
            return response()->json([
                'info' => sprintf('Succesfully deleted records with ID: %s', $id),
            ]);
        }
    }
}