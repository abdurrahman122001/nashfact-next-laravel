import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../AuthProvider";
import { useNavigate } from "react-router-dom";
import { Button, Typography, Checkbox } from "@material-tailwind/react";
import img from "../../../img/logo.png";
import { RxEyeClosed } from "react-icons/rx";
import { RxEyeOpen } from "react-icons/rx";
import backgroundImage from "../../../img/bg-2.jpg"; // Replace with the correct path to your background image
import { Link } from 'react-router-dom'; // Import Link

export function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]); // Adjusted for 6 digits
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [timer, setTimer] = useState(60); // 1-minute countdown in seconds
  const { login } = useAuth();
  const navigate = useNavigate();

  // Countdown timer logic
  useEffect(() => {
    let countdown;
    if (isCodeSent && timer > 0) {
      countdown = setInterval(() => setTimer((prev) => prev - 1), 1000);
    } else if (timer === 0) {
      clearInterval(countdown);
      alert("Verification code expired. Please request a new code.");
    }
    return () => clearInterval(countdown);
  }, [isCodeSent, timer]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/api/login", { email, password });
      setIsCodeSent(true);
      setTimer(60); // Reset timer to 1 minute when code is sent
      console.log("Verification code:", response.data.verificationCode); // For debugging
    } catch (error) {
      console.error("Login failed:", error);
      alert("Invalid email or password");
    }
  };

  const handleOtpChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Focus the next input
    if (value && index < otp.length - 1) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }
  };

  const handleVerifyCode = async (e) => {
    e.preventDefault();
    if (timer === 0) {
      alert("Verification code expired. Please request a new code.");
      return;
    }
    try {
      const verificationCode = otp.join(""); // Combine the OTP digits
      const response = await axios.post("http://localhost:8000/api/verify-code", {
        code: verificationCode,
        email,
      });
      const token = response.data.token;
      login(token);
      navigate("/dashboard/home");
    } catch (error) {
      console.error("Verification failed:", error);
      alert("Invalid verification code");
    }
  };
  const logout = () => {
    setToken(null);
    localStorage.removeItem('token');
    navigate('/sign-in'); // Redirect to login page after logout
  };

  const formatTime = () => {
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div className="flex min-h-screen">
      <div className={`w-full ${isCodeSent ? 'lg:w-full' : 'lg:w-[60%]'} flex flex-col items-center justify-center px-10`} style={isCodeSent ? { backgroundImage: `url(${backgroundImage})` } : {}}>
        <div className="w-full max-w-md flex items-center justify-center flex-col">
          <Typography variant="h2" className="text-3xl text-center mb-2" style={{ fontFamily: 'Poppins', fontWeight: '10px' }}>Account Log In</Typography>
          <Typography variant="paragraph" style={{ color: '#FC8C10', fontFamily: 'Poppins' }} className="text-center text-lg mb-6">
            {isCodeSent ? `Enter the 6 digit code sent to you at ******${email.slice(-3)}@example.com` : "Log in to your account"}
          </Typography>

          <form className="space-y-6 w-full">
            {!isCodeSent ? (
              <>
                <div>
                  <Typography variant="small" color="blue-gray" className="mb-2 font-medium">Email</Typography>
                  <input
                    type="email"
                    placeholder="name@mail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-gray-100 px-6 py-5 rounded-full focus:outline-none focus:ring-0 focus:shadow-none"
                    style={{
                      border: 'none',
                      borderRadius: '50px',
                    }}
                  />
                </div>
                <div className="relative">
                  <Typography variant="small" color="blue-gray" className="mb-2 font-medium">Password</Typography>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="********"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-gray-100 px-6 py-5 rounded-full focus:outline-none focus:ring-0 focus:shadow-none"
                    style={{
                      border: 'none',
                      borderRadius: '50px',
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-4 flex items-center text-gray-500 mt-6"
                  >
                    {showPassword ? <RxEyeOpen className="h-7 w-7" /> : <RxEyeClosed className="h-7 w-7" />}
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <Checkbox
                    label={
                      <Typography
                        variant="small"
                        color="gray"
                        className="flex items-center justify-start font-medium"
                        style={{ fontFamily: 'Poppins' }}
                      >
                        Remember Me
                      </Typography>
                    }
                    containerProps={{ className: "-ml-2.5" }}
                  />
                  <Link to="/auth/forgotPassword">
                    <button
                      type="button"
                      className="text-sm hover:underline"
                      style={{ fontFamily: 'Poppins', color: '#fc8c11' }}
                    >
                      Forgot Password?
                    </button>
                  </Link>

                </div>
              </>
            ) : (
              <div className="flex justify-center space-x-2 mt-4">
                {otp.map((value, index) => (
                  <input
                    key={index}
                    id={`otp-input-${index}`}
                    type="text"
                    maxLength="1"
                    value={value}
                    onChange={(e) => handleOtpChange(e.target.value, index)}
                    className="w-12 h-12 text-center text-lg font-medium bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                ))}
              </div>
            )}
            {isCodeSent && (
              <div className="text-center text-sm mt-3">
                <span style={{ fontFamily: 'Poppins' }}>Resend code in: {formatTime()}</span>
              </div>
            )}
            {!isCodeSent ? (
              <Button
                onClick={handleLogin}
                fullWidth
                className="hover:bg-orange-700 text-white font-medium mt-5 py-5 rounded-full focus:outline-none"
                style={{ fontFamily: 'Poppins', backgroundColor: '#fc8c11', letterSpacing: '2px', fontSize: '14px' }}
              >
                Log In
              </Button>
            ) : (
              <div className="flex justify-center w-full">
                <Button
                  onClick={handleVerifyCode}
                  fullWidth
                  className="hover:bg-orange-700 text-white font-400 mt-5 py-5 rounded-full focus:outline-none"
                  style={{ maxWidth: '70%', fontFamily: 'Poppins', backgroundColor: '#fc8c11', letterSpacing: '2px', fontSize: '14px' }} // Ensure the button width is limited to 80% and centered
                >
                  Verify Code
                </Button>
              </div>
            )}
          </form>
        </div>
      </div>

      {!isCodeSent && (
        <div className="hidden lg:flex w-[40%] items-center justify-center text-white p-12" style={{ backgroundColor: '#FC8C10', position: 'relative' }}>
          <div className="absolute top-12 right-0 bg-white p-2 flex" style={{ width: '60%', padding: '40px', borderTopLeftRadius: '50px', borderBottomLeftRadius: '50px' }}>
            <img src={img} alt="Logo" className="w-60" />
          </div>
          <div className="flex flex-col items-start justify-center space-y-4">
            <Typography variant="h4" className="font-400" style={{ fontFamily: 'Poppins' }}>
              Welcome Back
            </Typography>
            <p className="text-sm max-w-xs" style={{ fontFamily: 'Poppins' }}>
              Lorem ipsum is a placeholder text commonly used to demonstrate the
              visual form of a document or a typeface without relying on
              meaningful content.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default SignIn;