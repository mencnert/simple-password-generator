import {useState, useEffect} from "react";

const jsmeveVetvi = 20
const DEFAULT_PASS_LEN = 20;
const DEFAULT_LOWER_CASE_CHARS = true;
const DEFAULT_UPPER_CASE_CHARS = true;
const DEFAULT_NUMBER_CHARS = true;
const DEFAULT_SPECIAL_CHARS = true;

function generatePassword(passLength, includeLowerCase, includeUpperCase, includeNumbers, includeSpecialChars) {
    const SPECIAL_CHARS = "!#$%&()*+,-.:;<=>?@[]^_{|}~";
    const UPPER_ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const LOWER_ALPHABET = "abcdefghijklmnopqrstuvwxyz";
    const NUMBERS = "0123456789";

    let charSet = ""
    charSet += includeLowerCase ? LOWER_ALPHABET : ""
    charSet += includeUpperCase ? UPPER_ALPHABET : ""
    charSet += includeNumbers ? NUMBERS : ""
    charSet += includeSpecialChars ? SPECIAL_CHARS : ""

    if (charSet.length === 0) {
        return ""
    }

    let result = "";
    for (let i = 0; i < passLength; i++) {
        result += charSet.charAt(Math.floor(Math.random() * charSet.length));
    }
    return result;
}

function copyToClipboard() {
    const input = document.getElementById("passId");
    const text = input.value;
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
    const [passLen, setPassLen] = useState(DEFAULT_PASS_LEN);
    const [password, setPassword] = useState(generatePassword(passLen));
    const [lowerCaseChars, setLowerCaseChars] = useState(DEFAULT_LOWER_CASE_CHARS);
    const [upperCaseChars, setUpperCaseChars] = useState(DEFAULT_UPPER_CASE_CHARS);
    const [numberChars, setNumberChars] = useState(DEFAULT_NUMBER_CHARS);
    const [specialChars, setSpecialChars] = useState(DEFAULT_SPECIAL_CHARS);

    useEffect(() => {
        setPassword(generatePassword(passLen, lowerCaseChars, upperCaseChars, numberChars, specialChars));
        // eslint-disable-next-line
    }, []);

    return (
        <div className="App">
            <table>
                <tbody>

                <tr>
                    <td>
                        <label>Password length:</label>
                    </td>
                    <td>
                        <input
                            type="number"
                            onChange={(event) => {
                                setPassLen(parseInt(event.target.value));
                            }}
                            value={passLen}
                        />
                    </td>
                </tr>

                <tr>
                    <td>
                        <label>Lowercase chars:</label>
                    </td>
                    <td>
                        <input
                            type="checkbox"
                            onChange={(event) => {
                                setLowerCaseChars(event.target.checked);
                            }}
                            checked={lowerCaseChars}
                        />
                    </td>
                </tr>

                <tr>
                    <td>
                        <label>Uppercase chars:</label>
                    </td>
                    <td>
                        <input
                            type="checkbox"
                            onChange={(event) => {
                                setUpperCaseChars(event.target.checked);
                            }}
                            checked={upperCaseChars}
                        />
                    </td>
                </tr>

                <tr>
                    <td>
                        <label>Number chars:</label>
                    </td>
                    <td>
                        <input
                            type="checkbox"
                            onChange={(event) => {
                                setNumberChars(event.target.checked);
                            }}
                            checked={numberChars}
                        />
                    </td>
                </tr>

                <tr>
                    <td>
                        <label>Special chars:</label>
                    </td>
                    <td>
                        <input
                            type="checkbox"
                            onChange={(event) => {
                                setSpecialChars(event.target.checked);
                            }}
                            checked={specialChars}
                        />
                    </td>
                </tr>

                <tr>
                    <td colSpan="2">
                        <input
                            type="text"
                            id="passId"
                            value={password}
                            style={{width: "100%"}}
                            readOnly={true}
                        />
                    </td>
                </tr>

                <tr>
                    <td>
                        <button
                            onClick={() => {
                                setPassword(generatePassword(passLen, lowerCaseChars, upperCaseChars, numberChars, specialChars));
                            }}
                            style={{width: "100%"}}
                        >
                            Generate
                        </button>
                    </td>
                    <td>
                        <button
                            onClick={() => {
                                copyToClipboard(password);
                            }}
                            style={{width: "100%"}}
                        >
                            Copy to clipboard
                        </button>
                    </td>
                </tr>

                </tbody>
            </table>
        </div>
    );
}

export default App;
