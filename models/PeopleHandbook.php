<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "people_handbook".
 *
 * @property int $id
 * @property string|null $name Имя
 * @property string|null $second_name Фамилия
 * @property string|null $address Адрес
 * @property string $date_registration Дата регистрации
 */
class PeopleHandbook extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'people_handbook';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['date_registration'], 'required'],
            [['date_registration'], 'safe'],
            [['name', 'second_name', 'address'], 'string', 'max' => 255],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'name' => 'Имя',
            'second_name' => 'Фамилия',
            'address' => 'Адрес',
            'date_registration' => 'Дата регистрации',
        ];
    }
}
