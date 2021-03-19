<?php

namespace app\controllers;

use app\models\PeopleHandbook;
use yii\db\Exception;
use function GuzzleHttp\Psr7\str;
use app\controllers\SiteController;

class PeopleHandBookController extends \yii\web\Controller
{
    public function actionIndex()
    {
        return $this->render('index');
    }
    #region Список методов контроллера
        // actionAddEditPeople - метод добавления/редактирования людей
        // actionFindPeople - выгрузить весь массив людей, если не передана дата
        // actionDeletePeople - функция для удаления людей по идентификатору
        // actionTest - Метод для тестирования
    #endregion

    /**
     * actionAddEditPeople - метод добавления/редактирования людей
     * Входные данные:
     *      people_id           - идентификатор человека
     *      name                - Имя человека
     *      second_name         - Фамилия человека
     *      address             - Адрес проживания
     *      date_birthday       - Дата регистрации
     * @return array[]
     */
    public function actionAddEditPeople()
    {
        $data = array();
        $errors = array();
        try {
            $post_data = $_GET;
            $name = $post_data['name']?:'Empty name';
            $second_name = $post_data['second_name']?:'Empty second name';
            $data = $post_data;
            if (!isset($post_data['address']) || empty($post_data['address'])){
                throw new Exception('Адрес не может быть пустым');
            }
            $address = $post_data['address'];
            if(isset($post_data['people_id']) && !empty($post_data['people_id'])){
                $people  = PeopleHandbook::findOne(['id'=>$post_data['people_id']]);
                if(empty($people)){
                    throw new Exception('Человек не найден');
                }
            }else{
                $find_people = PeopleHandbook::find()
                    ->where(['name'=>$name, 'second_name'=>$second_name])
                    ->limit(1)
                    ->one();
                if(!empty($find_people)){
                    throw new Exception('Такой человек уже существует');
                }
                unset($find_people);
                $people = new PeopleHandbook();
            }
            $people->name = $name;
            $people->second_name = $second_name;
            $people->address = $address;
            /**
             * Пришла дата регистрации?
             *      Да?     Конвертируем в формат даты MySQL и записываем в поле даты регистрации
             *      Нет?    В поле даты регистрации записываем текущую дату
             */
            $people->date_birthday = (isset($post_data['date_birthday']) && !empty($post_data['date_birthday']))?date('Y-m-d',strtotime($post_data['date_birthday'])):date('Y-m-d');
            if(!$people->save()){
                throw new Exception($people->getErrors());
            }
            $people->refresh();
            $data['people_id'] = $people->id;
            $data['name'] = $people->name;
            $data['second_name'] = $people->second_name;
            $data['address'] = $people->address;
            $data['date_birthday'] = $people->date_birthday;
            unset($people, $post_data);

        } catch (\Throwable $exception) {
            $errors[] = 'Method ' . __FUNCTION__ . ' generate exception';
            $errors['message'] = $exception->getMessage();
            $errors[] = $exception->getLine();
        }
        \Yii::$app->response->format = \yii\web\Response::FORMAT_JSON;
        return [
            'data' => $data,
            'errors' => $errors,
        ];
    }

    /**
     * actionFindPeople - выгрузить весь массив людей, если не передана дата
     * Входные данные:
     *      date_birthday - поиск людей до переданной даты
     *
     * Выходные данные:
     *      people_id           - идентификатор человека
     *      name                - Имя человека
     *      second_name         - Фамилия человека
     *      address             - Адрес проживания
     *      date_birthday       - Дата регистрации
     * @param null $date_birthday - Дата регистрации
     * @return array
     */
    public function actionFindPeople($date_birthday = null)
    {
        $data = array();
        $errors = array();
        $date_birthday=null;
        try {
            if(isset($_GET['date_birthday']) && !empty($_GET['date_birthday'])){
                $date_birthday = date('Y-m-d',strtotime($_GET['date_birthday']));
            }
            $peoples_handbook = PeopleHandbook::find()
                ->select(['id as people_id', 'name', 'second_name', 'date_birthday'])
                ->filterWhere(['<=','date_birthday',$date_birthday])
                ->asArray()
                ->all();
            if(empty($peoples_handbook)){
                throw new Exception('Ничего не найдено');
            }
            $counter = 0;
            foreach ($peoples_handbook as $people) {
                $data[$counter]['#'] = $people['people_id'];
                $data[$counter]['Имя'] = $people['name'];
                $data[$counter]['Фамилия'] = $people['second_name'];
                $data[$counter]['Дата рождения'] = $people['date_birthday'];
                $counter++;
            }

        } catch (\Throwable $exception) {
            $errors[] = 'Method ' . __FUNCTION__ . ' generate exception';
            $errors[] = $exception->getMessage();
            $errors[] = $exception->getLine();
        }
        \Yii::$app->response->format = \yii\web\Response::FORMAT_JSON;
        return [
            'data' => $data,
            'errors' => $errors,
        ];
    }

    /**
     * actionDeletePeople - функция для удаления людей по идентификатору
     *
     * @param null $people_id - идентификатор удаляемого человека
     * @return array[]
     */
    public static function actionDeletePeople($people_id = null)
    {
        $data = array();
        $errors = array();
        try {
            $delete_people = PeopleHandbook::deleteAll(['id'=>$people_id]);
        } catch (\Throwable $exception) {
            $errors[] = 'Method ' . __FUNCTION__ . ' generate exception';
            $errors[] = $exception->getMessage();
            $errors[] = $exception->getLine();
        }
        return array('data' => $data, 'errors' => $errors);
    }

    /**
     * actionTest - Метод для тестирования
     * @return array
     */
    public static function actionTest()
    {
        $data = array();
        $errors = array();
        $date_birthday = null;
        try {
            if(isset($_GET['date_birthday']) && !empty($_GET['date_birthday'])){

                $date_birthday = date('Y-m-d',strtotime($_GET['date_birthday']));
            }else{
                $date_birthday = null;
            }
            $peoples_handbook = PeopleHandbook::find()
                ->select(['id as people_id', 'name', 'second_name', 'date_birthday'])
                ->filterWhere(['<=','date_birthday',$date_birthday])
                ->asArray()
                ->all();
            $counter = 0;
            foreach ($peoples_handbook as $people) {
                $data[$counter]['#'] = $people['people_id'];
                $data[$counter]['Имя'] = $people['name'];
                $data[$counter]['Фамилия'] = $people['second_name'];
                $data[$counter]['Дата рождения'] = $people['date_birthday'];
                $counter++;
            }

        } catch (\Throwable $exception) {
            $errors[] = 'Method ' . __FUNCTION__ . ' generate exception';
            $errors[] = $exception->getMessage();
            $errors[] = $exception->getLine();
        }
        \Yii::$app->response->format = \yii\web\Response::FORMAT_JSON;
        return [
            'data' => $data,
            'errors' => $errors,
        ];
    }


}
