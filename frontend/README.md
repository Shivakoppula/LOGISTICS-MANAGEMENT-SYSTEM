# Frontend - HTML, CSS & JavaScript

This folder contains all the frontend UI files for the Logistick project.

## 📁 Folder Structure

```
frontend/
├── static/              # Static assets (CSS, JavaScript)
│   ├── admin-dashboard.css
│   ├── admin-dashboard.html
│   ├── admin-dashboard.js
│   ├── customer-dashboard.html
│   └── login.html
│
└── templates/           # HTML templates
    └── login.html
```

## 📄 Pages

### 1. Login Page (`login.html`)
- Entry point for the application
- User authentication
- Accessible at: `http://localhost:8080/login.html`

### 2. Admin Dashboard (`admin-dashboard.html`)
- Admin panel interface
- Admin-specific features and controls
- Styled with `admin-dashboard.css`
- Functionality in `admin-dashboard.js`
- Accessible at: `http://localhost:8080/admin-dashboard.html`

### 3. Customer Dashboard (`customer-dashboard.html`)
- User/customer dashboard
- Customer-specific features
- Accessible at: `http://localhost:8080/customer-dashboard.html`

## 🎨 Styling

All CSS files are located in the `static/` folder:
- `admin-dashboard.css` - Styles for admin dashboard
- Individual page styling can be added as needed

## ⚙️ JavaScript

Functionality is implemented in:
- `admin-dashboard.js` - JavaScript for admin dashboard functionality
- Additional JS files can be created as needed

## 🔗 API Integration

The frontend files make API calls to the backend:
- **Base URL**: `http://localhost:8080`
- **API Endpoints**: Defined in `Controller/` classes on the backend

### Example API Calls
- Admin operations: `/admin/**`
- User operations: `/user/**`

## 🌐 How It Works

1. **Static File Serving**: The Spring Boot backend is configured to serve all files from this folder
2. **CSS**: Automatically served from `/static/**`
3. **HTML**: Automatically served from root path `/`
4. **JavaScript**: Automatically served from `/static/**`

## 🚀 Development

### Making Changes
1. Edit HTML files directly
2. Update CSS in `admin-dashboard.css`
3. Modify JavaScript in `admin-dashboard.js`
4. Changes are automatically served when you refresh the browser

### Testing Frontend
1. Start the backend server: `cd ../backend && ./mvnw spring-boot:run`
2. Open browser to: `http://localhost:8080/login.html`
3. Navigate through the application

## 📝 Notes

- No build process required for frontend
- Frontend files are served as-is by the Spring Boot backend
- Keep all assets in the `static/` folder for proper serving
- HTML templates can be in the `templates/` folder
- CSS and JS files should remain in `static/` for automatic serving

## 🔄 File Paths

When linking resources in HTML files, use:
```html
<!-- CSS -->
<link rel="stylesheet" href="/static/admin-dashboard.css">

<!-- JavaScript -->
<script src="/static/admin-dashboard.js"></script>
```

---

For the complete project overview, see [../README.md](../README.md)
