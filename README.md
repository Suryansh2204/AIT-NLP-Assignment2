# AIT-NLP-Assignment2 - 📜 Text Generation Web App (LSTM-based)

This project is a web application that generates text based on a user-provided phrase using an LSTM-based language model. The frontend is built with React, while the backend is powered by Flask. The model predicts the next words that might follow the input phrase and returns them to be displayed on the website.

<hr>

## 🚀 **Features**

- 🖥️ **Frontend:** A React-based UI where users enter a phrase and specify the sequence length for text generation.<br>

- 🧠 **Backend:** A Flask-based API that processes the input, loads an LSTM language model, and generates text.<br>

- 📖 **Model:** A pre-trained LSTM model stored as LSTM_model.pkl, along with a tokenizer and vocabulary.<br>

<hr>

The structure is organized as follows:

```
AIT-NLP-Assignment1/
│── app/
│   ├── client/   # React frontend
│   │   ├── Dockerfile
│   │   ├── public/
│   │   ├── src/
│   ├── server/   # Flask backend
│   │   ├── models/   # Stores trained model, tokenizer, tokenized_dataset, vocab, and the LSTM class to support the model
│   │   ├── app.py
│   │   ├── requirements.txt
│   │   ├── Dockerfile
│   ├── docker-compose.yml  # Docker Compose configuration
│── notebooks/
│   ├── models/   # Stores trained model, tokenizer, tokenized_dataset, vocab
│   ├── LSTM LM.ipynb
│── README.md
```

<hr>

## 🛠️ How It Works

### Frontend (React)

- The user enters:
  - A phrase (prompt) to generate text .
  - The sequence length (number of words to generate), default set to 10.
- The input is sent as query parameters to the Flask backend (/predict endpoint).
- The generated text is displayed on the website.

### Backend (Flask)

- The Flask server receives the request at /predict with:
  - prompt → The starting phrase for text generation.
  - seqlen → The maximum number of words to generate.
- The server loads:
  - LSTM_model.pkl (Trained LSTM model)
  - tokenizer.pkl (Tokenizer used for encoding text)
  - vocab.pkl (Vocabulary dictionary)
- The generate function:
  - Converts the prompt into token indices.
  - Passes tokens through the LSTM model.
  - Uses temperature-based sampling to generate words.
  - Stops when <eos> (end of sequence) is reached.
- The generated text is returned as JSON to the frontend.

<hr>

### Application Endpoints

- **Frontend (React app):** Runs on http://localhost:3000
- **Backend (Flask API):** Runs on http://localhost:5000

### API Endpoints

#### **`GET /`**- Returns author information.

#### **`GET /predict`** - Takes a prompt and sequence length, passes it to the model for prediction, and returns the result.

- Description: Generates text based on a user-provided prompt.
- Parameters:
  - prompt (string) → Starting phrase.
  - seqlen (integer) → Maximum number of words to generate.
- Example Request:
  ```
  curl "http://localhost:5000/predict?prompt=hello&seqlen=10"
  ```
- Response Format:
  ```
  {
      "genText": ["hello", "world", "this", "is", "a", "test", "..."]
  }
  ```

## Installation and Setup

### Step 1: Check if Git LFS is Installed

```
git lfs --version
```

If you see a version number, Git LFS is installed.

If Git LFS is not installed, install it using:

- Windows(Git Bash / PowerShell):

  ```
  git lfs install
  ```

- Mac(Homebrew):

  ```
  brew install git-lfs
  git lfs install
  ```

- Linux

  ```
  sudo apt install git-lfs  # Debian/Ubuntu
  sudo dnf install git-lfs  # Fedora
  git lfs install
  ```

### Step 2: Clone the Repository

```
git lfs clone https://github.com/Suryansh2204/AIT-NLP-Assignment2.git
```

This ensures that all large files are properly downloaded.

### Step 3: (Alternative) Clone Normally and Pull LFS Files

Clone normally (If git lfs clone doesn’t work or isn’t available, follow these steps: )

```
git clone https://github.com/Suryansh2204/AIT-NLP-Assignment2.git
cd your-repository
```

Initialize Git LFS in the cloned repo

```
git lfs install
```

Pull LFS-tracked files

```
git lfs pull
```

### Step 4: Verify Large Files Are Downloaded

```
git lfs ls-files
```

This lists all files tracked by Git LFS.

If files are missing or appear as pointers (.gitattributes contains LFS mappings), run:

```
git lfs checkout
```

## Setup and Running the Application

This project can be run using Docker. Follow the steps below to set up and run the application.

### Running the Application

1. Navigate to the app directory:

   ```
   cd app
   ```

2. Run Docker Compose:

   ```
   docker compose up -d
   ```

This command will build the images and start the containers in detached mode.

#### Running the services separately (Alternative)

##### Install Backend Dependencies

```
cd server
pip install -r requirements.txt
```

#### Install Frontend Dependencies

```
cd client
npm install
```

#### Run the Flask Backend

```
cd server
python app.py
```

#### Run the React Frontend

```
cd client
npm start
```

- Open http://localhost:3000/ in your browser.
