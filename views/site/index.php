<?php

/* @var $this yii\web\View */

$this->title = 'Handbook';
?>
<meta name="csrf-param" content="_csrf">
<meta name="csrf-token" content="OTDOwBtYk-tsjYLIgTAXrqhKwU-WgneMk_TpFcbE6DwPCIu3XRPJhj202Jn0Z3TP4Ry3ecevOcC-x4ZQkKu8dg==">
<div class="form-group">
    <label for="date_birthday">Выберите дату до которой нужно показать справочник людей:</label>
    <input type="date" class="form-control" id="date_birthday" name="trip-start" onchange="LoaderTable()">
</div>
<div id="table">
</div>
