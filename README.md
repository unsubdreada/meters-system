    Дисклеймер: Это мой первый одиночный пет-проект 🤓

# Meters-System

## 🤔 Идея и описание

Когда я начал погружение во фронт-енд разработку, я долго задавался вопросом: как практиковать свои полученные навыки? Мне хотелось написать какой-нибудь проект, который был бы полезен в повседневной жизни и которым я мог бы поделиться с близкими.

В голову приходило много идей, но додумать их я не мог. Но как-то в мою голову пришла очередная мысль...

Для экономии денежных средств мы передаём показания счётчиков в управляющие компании, чтобы те выставляли счета за фактически потребленные ресурсы. В один из дней когда я снимал показания, я понял, что процесс можно значительно упростить. Обычно это выглядело так: сначала я записывал показания в смартфон, затем переносил их в Excel-таблицу. Этот процесс был неудобен, так как отнимал много времени и часто я забывал снять показания в срок.

Так родилась идея создать веб-сервис в котором можно было бы хранить показания счетчиков, просматривать их историю, анализировать потребление ресурсов, настроить напоминания о необходимости снять показания, и что самое важное, делиться ими с родственниками (как пример). Продумав что я хочу получить сам от себя, я начал воплощать всё это в жизнь!

Что я бы хотел?

- Регистрация и авторизация - необходима для сохранения адресов, счётчиков и показания к конкретному пользователю в базе данных;
- Добавление адреса;
- Добавление счётчика;
- Добавление показаний;
- Возможность делиться адресом с другими пользователями - например, если в семье есть человек, который наделен обязанностью подавать показания за несколько квартир (своя, родителей, бабушек/дедушек);
- Напоминания о сроке подачи показаний.

## 🛠 Технологии

Реализовать я решил на следующем стеке:

**Фронт-енд**:

- _Сборщик_: ![Vite](https://github.com/unsubdreada/meters-system/raw/main/public/.github/Vite.svg)
- _База_: <img src="https://github.com/unsubdreada/meters-system/raw/main/public/.github/HTML.svg" alt="HTML" width="48" height="48"> <img src="https://github.com/unsubdreada/meters-system/raw/main/public/.github/CSS.svg" alt="CSS" width="48" height="48"> <img src="https://github.com/unsubdreada/meters-system/raw/main/public/.github/JS.svg" alt="JS" width="48" height="48">

- _Фреймворки и библиотеки_: <img src="https://github.com/unsubdreada/meters-system/raw/main/public/.github/VUEJS.svg" alt="VUEJS" width="48" height="48"> <img src="https://github.com/unsubdreada/meters-system/raw/main/public/.github/PINIA.svg" alt="PINIA" width="48" height="48"> <img src="https://github.com/unsubdreada/meters-system/raw/main/public/.github/TAILWINDCSS.svg" alt="TAILWINDCSS" width="48" height="48"> **<a href="https://heroicons.com/">Heroicons<a/>**

**Бэк-енд**:

<img src="https://github.com/unsubdreada/meters-system/raw/main/public/.github/APPWRITE.svg" alt="APPWRITE" width="256">

Так как я обучаюсь на фронт-енд разработчика, с бэк-ендом я мало знаком, поэтому я использовал бэкенд-как-сервис (BaaS) - **Appwrite**.

Его функционала мне вполне хватает:

- Есть возможность настройки аутентификации;
- База данных;
- Хранилище.

## 🤖 Функции

На данный момент, мной реализованы следующие функции:

1. **_Аутентификация_**: Пользователь регистрируется используя имя, электронную почту и пароль.
2. **_Добавление/удаление карточки адреса_**: Адресс привязывается по userId к пользователю.
3. **_Добавление/удаление в адресе счётчика_**: Выбор типа счётчика (холодная и горячая вода, электричество, газ), присваивание ему заводского номера и имени (для удобства).
4. **_Добавление/удаление показаний_**.
5. **_История показаний_**: Таблица с возможностью выбрать счетчик по которому нужно посмотреть историю.
6. **_Возможность поделиться адресом с пользователем_**.

   > Будет дополняться...

## 🏗 Установка

### 1️⃣ Клонируйте репозиторий

```bash
git clone https://github.com/unsubdreada/meters-system.git
cd meters-system
```

### 2️⃣ Установите зависимости

```bash
npm install
```

или

```bash
yarn install
```

### 3️⃣ Настройка Appwrite

- Перейдите в консоль **<a href="https://cloud.appwrite.io/">Appwrite<a/>**
- Авторизуйтесь
- Создайте проект
- Создайте в проекте web-приложение
- Создайте базу данных
- Создайте в базе данных две коллекции со следующими аттрибутами

#### Addresses:

|  Attribute  |    Type    |  Size   | Default | Required | Array  |
| :---------: | :--------: | :-----: | :-----: | :------: | :----: |
|  `userID`   |  `string`  | **256** | **✖**  |  **✔**  | **✖** |
|   `city`    |  `string`  | **128** | **✖**  |  **✔**  | **✖** |
|  `street`   |  `string`  | **128** | **✖**  |  **✔**  | **✖** |
|   `house`   |  `string`  | **10**  | **✖**  |  **✔**  | **✖** |
| `apartment` |  `string`  | **10**  | **✖**  |  **✔**  | **✖** |
| `addressId` |  `string`  | **128** | **✖**  |  **✔**  | **✖** |
| `createdAt` | `datetime` |  **-**  | **✖**  |  **✔**  | **✖** |

#### Meters:

| Attribute |  Type  |         Elements          | Required | Array  |
| :-------: | :----: | :-----------------------: | :------: | :----: |
|  `type`   | `enum` | `ХВС` `ГВС` `Газ` `Эл-во` |  **✔**  | **✖** |

|   Attribute   |    Type    |  Size   | Default | Required | Array  |
| :-----------: | :--------: | :-----: | :-----: | :------: | :----: |
| `meterNumber` |  `string`  | **128** | **✖**  |  **✔**  | **✖** |
|  `addressId`  |  `string`  | **128** | **✖**  |  **✔**  | **✖** |
|    `name`     |  `string`  | **10**  | **✖**  |  **✔**  | **✖** |
|  `createdAt`  | `datetime` | **✖**  | **✖**  |  **✔**  | **✖** |
|  `readings`   |  `string`  | **256** | **✖**  |  **✖**  | **✔** |

### 4️⃣ Создание переменных окружения .env

В корне проекта создайте файл **.env** в котором укажите следующие переменные:

```bash
VITE_APPWRITE_PROJECT_ID=
VITE_APPWRITE_ENDPOINT=
VITE_APPWRITE_API_KEY=
VITE_APPWRITE_DB_ID=
VITE_APPWRITE_COLLECTION_ADDRESSES=
VITE_APPWRITE_COLLECTION_METERS=
```

### 5️⃣ Запуск локального сервера

```bash
npm run dev
```

## 🚀 Использование

После установки и запуска локального сервера, откройте веб-браузер и перейдите по адресу `http"//localhost:3000`

> p.s.: порт может быть другим
