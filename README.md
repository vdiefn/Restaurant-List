# 我的餐廳名單

## 功能
- 使用者可以註冊帳號，註冊的資料包括：名字、email、密碼。

- 使用者也可以透過 Facebook Login 直接登入。

- 使用者登入後可在首頁看到所有餐廳與它們的簡單資料，包含：
  * 餐廳照片
  * 餐廳名稱
  * 餐廳分類
  * 餐廳評分

- 使用者可以點選Detail進去看餐廳的詳細資訊，內容包含：
  * 餐廳類別
  * 餐廳地址
  * 餐廳電話
  * 餐廳簡介
  * 餐廳圖片

- 使用者可以新增一家餐廳
- 使用者可以修改一家餐廳的資訊
- 使用者可以刪除一家餐廳
- 使用者可以在搜尋欄中使用餐廳名稱或者餐廳類別進行搜尋。
- 使用者可以從餐廳地址末端的符號連結至google map確認餐廳位置。


## 開發工具
- Node.js
- Express
- Express-handlebars
- dotenv
- Mongoose
- Method-override
- Express-session
- Passport
- Passport-local
- Connect-flash
- Bcrypt.js
- Passport-Facebook

## 開始使用
- clone專案至本機電腦
- 進入專案資料夾
- 專案下載完成後輸入：npm install
- 安裝完成後接續安裝Express, Express-handlebars......等
- 新增.env檔案設定環境變數，可於.env.example內看到更多環境變數的設定。
- 新增種子資料：npm run seed
- 安裝完成會看到：Demo seeder done!
- 啟動程式請輸入：npm run dev
- 成功啟動後會於終端機看到：Express is running on http://localhost:3000 以及 mongodb connected!
- 於瀏覽器輸入http://localhost:3000 後可開始使用