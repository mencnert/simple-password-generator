const DEFAULT_PASS_LEN = 20;
const DEFAULT_LOWER_CASE_CHARS = true;
const DEFAULT_UPPER_CASE_CHARS = true;
const DEFAULT_NUMBER_CHARS = true;
const DEFAULT_SPECIAL_CHARS = true;

/**
 *
 * @param  {number} passLength
 * @param {boolean} includeLowerCase
 * @param {boolean} includeUpperCase
 * @param {boolean} includeNumbers
 * @param {boolean} includeSpecialChars
 * @returns {string}
 */
function generatePassword(passLength, includeLowerCase, includeUpperCase, includeNumbers, includeSpecialChars) {
    const specialCharSet = "!#$%&()*+,-.:;<=>?@[]^_{|}~";
    const upperCaseAlphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowerCaseAlphabet = "abcdefghijklmnopqrstuvwxyz";
    const numberCharSet = "0123456789";

    let charSet = ""
    charSet += includeLowerCase ? lowerCaseAlphabet : ""
    charSet += includeUpperCase ? upperCaseAlphabet : ""
    charSet += includeNumbers ? numberCharSet : ""
    charSet += includeSpecialChars ? specialCharSet : ""

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

function getNewPassword() {
    const passLen = document.getElementById("passLen").value
    const lowerCaseChars = document.getElementById("lowerCaseChars").checked
    const upperCaseChars = document.getElementById("upperCaseChars").checked
    const numberChars = document.getElementById("numberChars").checked
    const specialChars = document.getElementById("specialChars").checked

    return generatePassword(passLen, lowerCaseChars, upperCaseChars, numberChars, specialChars)
}

function setNewPassword() {
    document.getElementById("passId").value = getNewPassword()
}
