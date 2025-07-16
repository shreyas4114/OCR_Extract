# 🔍 OCRExtract

OCRExtract is a full-stack web application that extracts key information from Aadhaar and PAN card images using Optical Character Recognition (OCR). It supports secure, fast, and accurate document processing via a beautiful and responsive interface.

[Live Demo 🚀](https://ocr-extract.vercel.app/)

---

## 📸 Features

- 🔤 OCR processing for Aadhaar and PAN card images
- 🧠 Auto-detect card type (PAN or Aadhaar)
- 🗃️ Extracts:
  - Aadhaar Number
  - PAN Number
  - Name
  - Father's Name (PAN)
  - Date of Birth
- 📂 Drag-and-drop file upload
- 🎨 Clean and responsive UI with React + Tailwind
- 🌐 Backend deployed with Flask and integrated with OCR.Space API

---

## 🧱 Tech Stack

### 🔧 Backend
- **Flask** (Python)
- **OCR.Space API** for text recognition
- **Regex** for intelligent data extraction
- **Flask-CORS** for handling cross-origin requests
- **Gunicorn** for production server

### 💻 Frontend
- **React.js**
- **Tailwind CSS**
- **Vite** for fast dev environment

### ☁️ Deployment
- Frontend: [Vercel](https://vercel.com/)
- Backend: [Render](https://render.com/) *(or suitable Flask hosting)*

---

## 🛠️ How It Works

1. **User uploads an image** of PAN or Aadhaar card.
2. **Frontend sends image** to Flask backend (`/upload` endpoint).
3. **Flask processes the image** using OCR.Space API.
4. **Extracted text is parsed** using regex to detect Aadhaar/PAN and relevant fields.
5. **Structured data is returned** and displayed beautifully on the frontend.
