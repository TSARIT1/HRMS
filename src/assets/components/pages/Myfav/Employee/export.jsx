import React, { useState } from "react";

function EmailVerification() {
  const [email, setEmail] = useState("");
  const [codeSent, setCodeSent] = useState(false);
  const [code, setCode] = useState("");
  const [status, setStatus] = useState("");

  const sendCode = async () => {
    const res = await fetch("http://localhost:5000/send-code", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    const data = await res.json();
    setCodeSent(data.success);
    setStatus(data.message);
  };

  const verifyCode = async () => {
    const res = await fetch("http://localhost:5000/verify-code", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, code }),
    });
    const data = await res.json();
    setStatus(data.message);
  };

  return (
    <div style={{ padding: 20, fontFamily: "Arial" }}>
      <h2>Email Verification</h2>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={sendCode} style={{ marginLeft: 10 }}>Send Code</button>

      {codeSent && (
        <>
          <div style={{ marginTop: 20 }}>
            <input
              type="text"
              placeholder="Enter verification code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
            <button onClick={verifyCode} style={{ marginLeft: 10 }}>Verify</button>
          </div>
        </>
      )}
      <p style={{ marginTop: 20 }}>{status}</p>
    </div>
  );
}

export default EmailVerification;
