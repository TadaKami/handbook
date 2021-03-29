<?php

/* @var $this yii\web\View */

$this->title = 'Add people to handbook';
?>
<div class="form-group" id="div-form">
    <input type="hidden" id="people_id" value="<?=isset($_GET[1]['people_id'])?$_GET[1]['people_id']:''?>">

    <label for="name">Name</label>
    <input type="text" class="form-control" placeholder="Enter the name" id="name" value="<?=isset($_GET[1]['name'])?$_GET[1]['name']:''?>">

    <label for="second_name">Second name</label>
    <input type="text" class="form-control" placeholder="Enter the second name" id="second_name" value="<?= isset($_GET[1]['second_name'])?$_GET[1]['second_name']:''?>">

    <label for="address">Address</label>
    <input type="text" class="form-control" placeholder="Enter ur address" id="address" value="<?=isset($_GET[1]['address'])?$_GET[1]['address']:''?>">

    <label for="date_birthday">Выберите дату до которой нужно показать справочник людей:</label>
    <input type="date" class="form-control" id="date_birthday" name="trip-start" value="<?=isset($_GET[1]['date_birthday'])?$_GET[1]['date_birthday']:''?>">

    <button class="btn btn-primary" onclick="AddPeople()" id="btnChAd"><?=isset($_GET[1]['people_id'])?'Change':'Add'?></button>
</div>
<div id="success"></div>