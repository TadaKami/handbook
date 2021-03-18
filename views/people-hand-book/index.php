<?php

/* @var $this yii\web\View */

$this->title = 'Add people to handbook';
?>
<div class="form-group" id="div-form">
    <label for="name">Name</label>
    <input type="text" class="form-control" placeholder="Enter the name" id="name">

    <label for="second_name">Second name</label>
    <input type="text" class="form-control" placeholder="Enter the second name" id="second_name">

    <label for="address">Address</label>
    <input type="text" class="form-control" placeholder="Enter ur address" id="address">
    <button class="btn btn-primary" onclick="AddPeople()">Add</button>
</div>
<div id="success"></div>
