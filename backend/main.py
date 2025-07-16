import os
import re
from flask import Flask, request, jsonify
from werkzeug.utils import secure_filename
import requests
from dotenv import load_dotenv
from flask_cors import CORS

load_dotenv()

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = 'uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

API_KEY = os.getenv('OCR_API_KEY')

if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

# ----------------------- OCR + Extraction Utilities -----------------------

def ocr_space_api(image_path):
    with open(image_path, 'rb') as f:
        response = requests.post(
            'https://api.ocr.space/parse/image',
            files={image_path: f},
            data={'apikey': API_KEY}
        )
    result = response.json()
    try:
        return result['ParsedResults'][0]['ParsedText']
    except:
        return ""

def extract_aadhaar(text):
    match = re.search(r'\b\d{4}\s?\d{4}\s?\d{4}\b', text)
    if match:
        aadhaar = match.group().replace(" ", "")
        if re.fullmatch(r'\d{12}', aadhaar):
            return aadhaar
    return None

def extract_pan(text):
    match = re.search(r'\b[A-Z]{5}\d{4}[A-Z]\b', text)
    if match:
        return match.group()
    return None

def extract_dob(text):
    patterns = [r'\b\d{2}/\d{2}/\d{4}\b', r'\b\d{2}-\d{2}-\d{4}\b', r'\b\d{4}-\d{2}-\d{2}\b']
    for p in patterns:
        match = re.search(p, text)
        if match:
            return match.group()
    return None

def extract_name(text, card_number, card_type):
    lines = [line.strip() for line in text.splitlines() if line.strip()]
    if card_type == 'pan':
        for i, line in enumerate(lines):
            if card_number in line:
                for j in [i - 1, i + 1]:
                    if 0 <= j < len(lines):
                        possible_name = lines[j]
                        if (possible_name.isupper() and 
                            len(possible_name.split()) >= 2 and
                            "FATHER" not in possible_name and 
                            "DEPARTMENT" not in possible_name and 
                            "INCOME" not in possible_name):
                            return possible_name
        for line in lines:
            if (line.isupper() and 
                len(line.split()) >= 2 and
                "FATHER" not in line and 
                "DEPARTMENT" not in line and 
                "INCOME" not in line):
                return line
    elif card_type == 'aadhaar':
        for i, line in enumerate(lines):
            if "dob" in line.lower() or "male" in line.lower() or "female" in line.lower():
                for j in range(i - 1, max(i - 4, -1), -1):
                    if re.fullmatch(r'[A-Z][a-z]+\s[A-Z][a-z]+\s?[A-Z]?[a-z]*', lines[j]):
                        return lines[j]
        for line in lines:
            if not any(char.isdigit() for char in line) and len(line.split()) >= 2:
                return line
    return "Not Found"

def extract_fathers_name(text):
    lines = [line.strip() for line in text.splitlines() if line.strip()]
    for i, line in enumerate(lines):
        if "father" in line.lower():
            if i + 1 < len(lines):
                possible_name = lines[i + 1].strip()
                if possible_name.isupper():
                    return possible_name
    return "Not Found"

# ----------------------- Routes -----------------------

@app.route('/', methods=['GET'])
def health_check():
    return jsonify({"status": "ok", "message": "Server is running"}), 200

@app.route('/upload', methods=['POST'])
def upload():
    if 'file' not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "Empty file"}), 400

    filename = secure_filename(file.filename)
    ext = os.path.splitext(filename)[1].lower()
    if ext not in ['.jpg', '.jpeg', '.png']:
        return jsonify({"error": "Unsupported file format. Use JPG, JPEG or PNG."}), 400

    filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    file.save(filepath)

    text = ocr_space_api(filepath)
    aadhaar = extract_aadhaar(text)
    pan = extract_pan(text)
    dob = extract_dob(text)

    if aadhaar:
        name = extract_name(text, aadhaar, 'aadhaar')
        return jsonify({
            "Card Type": "Aadhaar",
            "Aadhaar Number": aadhaar,
            "Name": name or 'Not found',
            "Date of Birth": dob or 'Not found'
        })

    elif pan:
        name = extract_name(text, pan, 'pan')
        father_name = extract_fathers_name(text)
        return jsonify({
            "Card Type": "PAN",
            "PAN Number": pan,
            "Name": name or 'Not found',
            "Father's Name": father_name or 'Not found',
            "Date of Birth": dob or 'Not found'
        })

    else:
        return jsonify({"error": "Could not detect valid Aadhaar or PAN number."}), 422

# ----------------------- Main Entry -----------------------

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port)
