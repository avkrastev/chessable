<?php
namespace App\Api\Controllers;

use App\Domain\Repository\DepartmentsRepositoryInterface;
use App\Domain\Entity\Departments;

class DepartmentsController
{
    private $departmentsRepository;

    public function __construct(DepartmentsRepositoryInterface $departmentsRepository)
    {
        $this->departmentsRepository = $departmentsRepository;
    }

    /**
     * @return string
     * @throws \Pecee\Exceptions\InvalidArgumentException
     */
    public function show(int $id): string
	{
        $department =  $this->departmentsRepository->getById($id);
        if ($department !== false) {
            return response()->json($department->toArray());
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
        $departments = $this->departmentsRepository->getAll();
        
        return response()->json($departments);
    }

    /**
     * @return string|null
     */
    public function store(int $id = null): ?string
    {
        $data = input()->all();

        // Create new record
        if (is_null($id)) {
            $lastInsertedId = $this->departmentsRepository->insert($data);
        
            $department =  $this->departmentsRepository->getById($lastInsertedId);
            if ($department !== false) {
                return response(201)->json($department->toArray());
            }
    
            // TODO not found
            return response(404)->json([]);
        }

        // Update existing record
        $updateId = $this->departmentsRepository->update($id, $data);

        $department =  $this->departmentsRepository->getById($updateId);
        if ($department !== false) {
            return response()->json($department->toArray());
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
        $department =  $this->departmentsRepository->getById($id);
        if ($department == false) {
            return response(404)->json([
                'error' => sprintf('The record with ID: %s does not exist!', $id),
            ]);
        }
        
        $response = $this->departmentsRepository->delete($id);
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

    public function getMaxSalary() 
    {
        $departments =  $this->departmentsRepository->getMaxSalaryPerDepartment();
        
        if ($departments instanceof \PDOException) {
            return response(500)->json([
                'error' => $response->getMessage(),
            ]);
        }

        return response()->json($departments);
    }

    public function showDepartmentsWithHighestSalaries()
    {
        $data = input()->all();

        if (!isset($data['employeesNumber']) || !isset($data['salary'])) {
            return response(400)->json([]);
        }
        
        $departments =  $this->departmentsRepository->showDepartmentsWithHighestSalaries($data['employeesNumber'], $data['salary']);

        if ($departments instanceof \PDOException) {
            return response(500)->json([
                'error' => $response->getMessage(),
            ]);
        }

        return response()->json($departments);
    }
}