import { useState, useEffect } from "react";

function generatePassword(length) {
  var result = "";
  var specialChars = "!#$%&()*+,-.:;<=>?@[]^_{|}~";
  var upperAlphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var lowerAlphabet = "abcdefghijklmnopqrstuvwxyz";
  var numerics = "0123456789";
  var characters = lowerAlphabet + upperAlphabet + numerics + specialChars;
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function copyToClipboard() {
  var input = document.getElementById("passId");
  var text = input.value;
  input.select();
  if (window.clipboardData && window.clipboardData.setData) {
    return window.clipboardData.setData("Text", text);
  } else if (
    document.queryCommandSupported &&
    document.queryCommandSupported("copy")
  ) {
    try {
      return document.execCommand("copy");
    } catch (ex) {
      console.warn("Copy to clipboard failed.", ex);
      return false;
    }
  }
}

function App() {
  const [password, setPassword] = useState(null);

  useEffect(() => {
    var url_string = window.location.href;
    var url = new URL(url_string);
    var len = url.searchParams.get("len");
    console.log(len);
    if (len) {
      setPassword(generatePassword(len));
    } else {
      setPassword(generatePassword(20));
    }
  }, []);

  return (
    <div className="App">
      <input type="text" id="passId" value={password} />
      <button
        onClick={() => {
          copyToClipboard(password);
        }}
      >
        Copy to clipboard
      </button>
    </div>
  );
}

export default App;
