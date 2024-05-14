import React, { useState } from 'react';

const RegisterPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [registrationStatus, setRegistrationStatus] = useState('');

    const handleRegistration = async (e) => {
        e.preventDefault();

        // Check if the email is from stud.noroff.no
        if (!email.endsWith('@stud.noroff.no')) {
            setRegistrationStatus('Please use a valid Noroff student email to register.');
            return;
        }

        try {
            const response = await fetch('https://api.noroff.dev/v2/holidaze/profiles', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });
            if (response.ok) {
                const data = await response.json();
                console.log(data);  // For debug purposes
                setRegistrationStatus('Registration successful!');
            } else {
                setRegistrationStatus('Registration failed. Please try again later.');
            }
        } catch (error) {
            console.error('Error during registration:', error);
            setRegistrationStatus('An error occurred. Please try again.');
        }
    };

    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={handleRegistration}>
                <label>
                    Email:
                    <input
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Password:
                    <input
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                    />
                </label>
                <button type="submit">Register</button>
            </form>
            <p>{registrationStatus}</p>
        </div>
    );
}

export default RegisterPage;
