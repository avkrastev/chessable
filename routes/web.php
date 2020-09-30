
<?php
/**
 * This file contains all the routes for the project
 */

use App\Api\Router;

Router::group(['namespace' => '\App\Api\Controllers'], function () {
    Router::resource('/departments', 'DepartmentsController');
    Router::resource('/employees', 'EmployeesController');

    Router::options('/department/getMaxSalary', 'DepartmentsController@getMaxSalary');
    Router::get('/department/getMaxSalary', 'DepartmentsController@getMaxSalary');
    Router::options('/department/showDepartmentsWithHighestSalaries', 'DepartmentsController@showDepartmentsWithHighestSalaries');
    Router::post('/department/showDepartmentsWithHighestSalaries', 'DepartmentsController@showDepartmentsWithHighestSalaries');
});
