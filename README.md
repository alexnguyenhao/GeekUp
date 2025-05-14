# GeekUp - Product Frontend Technical Assessment

[GitHub Repository](https://github.com/alexnguyenhao/GeekUp)

## 🚀 Features

### Album Module

- **Album List Table**:

  - Displays all 100 albums.
  - Columns: ID, Title, User (name + avatar), Actions.
  - Pagination with URL synchronization.
  - Click on User navigates to User Detail.

- **Album Detail Page**:
  - Shows album title.
  - Displays user info (avatar, name, email).
  - Lists thumbnails of photos in the album.
  - Clicking a photo opens full image.

### User Module

- **User List Table**:

  - Displays 10 users.
  - Columns: ID, Avatar, Name, Email, Phone, Website, Actions.

- **User Detail Page**:
  - Displays user info (avatar, name, email).
  - Lists user’s albums with buttons to view album detail.

---

## 🛠 Tech Stack

- **React**: JavaScript library for UI.
- **Ant Design**: UI component framework for polished design.
- **React Query**: Handles async data fetching and caching.
- **React Router DOM**: Client-side routing and URL state.
- **Axios**: HTTP requests.
- **APIs**:
  - [https://jsonplaceholder.typicode.com](https://jsonplaceholder.typicode.com) - for albums, users, and photos.
  - [https://ui-avatars.com](https://ui-avatars.com) - to generate user avatars.

---

## 📁 Project Structure

```
src/
├── components/
├── pages/
│   ├── Albums/
│   └── Users/
├── services/
├── routes/
├── utils/
└── App.tsx
```

---

## ⚙️ Setup & Run

### 1. Clone Repository

```bash
git clone https://github.com/alexnguyenhao/GeekUp.git
cd GeekUp
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run Development Server

```bash
npm run dev
```

> Open [http://localhost:3000](http://localhost:3000) to view the app in your browser.

---

## 📸 Screenshots

![alt text](image.png)
![alt text](image-1.png)

## 📌 Notes

- All `<img>` tags include `alt` attributes.
- Clickable items have `cursor: pointer`.
- Pagination state is preserved in URL.
- Emails, phones, and websites are clickable.
- Layout optimized for screens ≥ 1280px.

---

## 📬 Contact

Developed by **Nguyen Hao**  
GitHub: [@alexnguyenhao](https://github.com/alexnguyenhao)
