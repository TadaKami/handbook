<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "people_handbook".
 *
 * @property int $id
 * @property string|null $name Имя
 * @property string|null $second_name Фамилия
 * @property string $address Адрес
 * @property string $date_birthday Дата рождения
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
            [['address', 'date_birthday'], 'required'],
            [['date_birthday'], 'safe'],
            [['name', 'second_name', 'address'], 'string', 'max' => 255],
            [['name', 'second_name'], 'unique', 'targetAttribute' => ['name', 'second_name']],
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
            'date_birthday' => 'Дата рождения',
        ];
    }
}
