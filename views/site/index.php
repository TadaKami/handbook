<?php

/* @var $this yii\web\View */

$this->title = 'Handbook';
?>

<div class="form-group">
    <label for="date_registration">Выберите дату до которой нужно показать справочник зарегестрированных людей:</label>
    <input type="date" class="form-control" id="date_registration" name="trip-start" min="2018-01-01" onchange="LoaderTable()">
</div>
<div id="table">
</div>
