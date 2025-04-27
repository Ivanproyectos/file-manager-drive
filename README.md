# 📁 Gestión de Archivos con Google Drive

![React](https://img.shields.io/badge/React-18.2.0-61DAFB?logo=react&logoColor=white)
![.NET](https://img.shields.io/badge/.NET-7.0-512BD4?logo=dotnet&logoColor=white)
![Google Drive API](https://img.shields.io/badge/Google%20Drive-API-34A853?logo=google-drive&logoColor=white)
![License](https://img.shields.io/badge/license-MIT-green)

Aplicación **Fullstack** para la gestión de archivos en Google Drive utilizando **React** en el frontend y **.NET 7** en el backend.

---

## 🚀 Tecnologías utilizadas

- Frontend: **React**, **Vite**, **Bootstrap**
- Backend: **.NET 7**, **Google.Apis.Drive.v3**, **Entity Framework**
- Autenticación: **JWT**

---

## 🛠️ Requisitos previos 

- Node.js `v23`
- .NET 7 SDK
- Cuenta de Google Cloud configurada drive api para generar las credenciales para la carga de archivos
- Git

---

## 📦 Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/Ivanproyectos/file-manager-drive.git
cd tu-repo

### 2. Configuracion frontend
```bash
cd frontend
npm install
cp .env

Frontend .env
VITE_API_BASE_URL= https://localhost:7095/api
VITE_TOKEN_NAME= auth_token
VITE_BASE_URL= https://localhost:7095
```
### 3. Configurar el Backend
```bash
cd backend
dotnet restore
dontnet database update

generar un archivo credentials-drive en la raiz del proyecto y anadir las credenciales generadas por la configuracion del google drive
{
  "GoogleDrive": {
    "ClientId": "tu-client-id",
    "ClientSecret": "tu-client-secret",
    "RedirectUri": "http://localhost:5000/auth/callback"
  }
}

dotnet run
```
## 📷 Capturas

![Captura de pantalla 2025-04-27 113947](https://github.com/user-attachments/assets/d9474392-2923-404f-be53-e8859bfcb918)

![file-manager-drive](https://github.com/user-attachments/assets/c03f4c62-7301-411d-9abb-f4405c7c22b4)


