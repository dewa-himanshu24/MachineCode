import { useState, useRef, useEffect, FC } from "react";

const OTP_DIGITS = 4;

// Define the OTPInput component as a Functional Component (FC)
const OTPInput: FC = () => {
  const [inputArr, setInputArr] = useState<string[]>(new Array(OTP_DIGITS).fill(''));
  const refArr = useRef<(HTMLInputElement | null)[]>(new Array(OTP_DIGITS).fill(null));

  useEffect(() => {
    refArr.current[0]?.focus();
  }, []);

  const handleInputChange = (val: string, idx: number) => {
    if (isNaN(Number(val))) return;

    const copyData = [...inputArr];
    copyData[idx] = val.slice(-1);

    setInputArr(copyData);

    // Auto focus next input
    if (val.trim() && idx < OTP_DIGITS - 1) {
      refArr.current[idx + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, idx: number) => {
    if (e.key === 'Backspace' && !inputArr[idx] && idx > 0) {
      refArr.current[idx - 1]?.focus();
    }
  };

  const handleOnPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasteVal = e.clipboardData.getData("text").slice(0, OTP_DIGITS);
    if (isNaN(Number(pasteVal))) return;

    const newVal = pasteVal.split('').slice(0, OTP_DIGITS);
    const copyData = [...inputArr];

    newVal.forEach((num, idx) => {
      if (idx < OTP_DIGITS) {
        copyData[idx] = num;
        if (refArr.current[idx]) {
          refArr.current[idx]!.value = num;
        }
      }
    });
    setInputArr(copyData);
  };

  return (
    <div className="otp-container">
      {inputArr.map((input, idx) => (
        <input
          key={idx}
          type="text"
          value={inputArr[idx]}
          onChange={(e) => handleInputChange(e.target.value, idx)}
          onKeyDown={(e) => handleKeyDown(e, idx)}
          onPaste={handleOnPaste}
          className="otp-input"
          ref={(el) => { refArr.current[idx] = el; }}
        />
      ))}
    </div>
  );
};

export default OTPInput;