'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FiUser, FiMail, FiLock, FiCheck } from 'react-icons/fi';

const PageWrapper = styled.div`
    min-height: calc(100vh - 70px);
    padding: ${({ theme }) => theme.spacing.xxl} ${({ theme }) => theme.spacing.lg};
    background: ${({ theme }) => theme.colors.background};
    display: flex;
    align-items: center;
    justify-content: center;
`;

const FormContainer = styled(motion.div)`
    max-width: 500px;
    width: 100%;
    background: ${({ theme }) => theme.colors.surface};
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: ${({ theme }) => theme.borderRadius.xl};
    padding: ${({ theme }) => theme.spacing.xxl};
`;

const Title = styled.h1`
    font-size: 2rem;
    margin-bottom: ${({ theme }) => theme.spacing.md};
    background: ${({ theme }) => theme.colors.gradient};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-align: center;
`;

const Subtitle = styled.p`
    text-align: center;
    color: ${({ theme }) => theme.colors.textSecondary};
    margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.lg};
`;

const InputGroup = styled.div`
    position: relative;
`;

const Label = styled.label`
    display: block;
    color: ${({ theme }) => theme.colors.text};
    font-weight: 600;
    margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const InputWrapper = styled.div`
    position: relative;
    display: flex;
    align-items: center;
`;

const Icon = styled.div`
    position: absolute;
    left: ${({ theme }) => theme.spacing.md};
    color: ${({ theme }) => theme.colors.textSecondary};
    display: flex;
    align-items: center;
`;

const Input = styled.input`
    width: 100%;
    padding: ${({ theme }) => theme.spacing.md};
    padding-left: ${({ theme }) => theme.spacing.xxl};
    background: ${({ theme }) => theme.colors.backgroundAlt};
    border: 2px solid ${({ theme, $error }) => $error ? theme.colors.accent : theme.colors.border};
    border-radius: ${({ theme }) => theme.borderRadius.lg};
    color: ${({ theme }) => theme.colors.text};
    font-size: 1rem;
    transition: all 0.3s ease;

    &:focus {
        outline: none;
        border-color: ${({ theme }) => theme.colors.primary};
    }
`;

const ErrorMessage = styled.span`
    color: ${({ theme }) => theme.colors.accent};
    font-size: 0.875rem;
    margin-top: ${({ theme }) => theme.spacing.xs};
    display: block;
`;

const PasswordStrength = styled.div`
    margin-top: ${({ theme }) => theme.spacing.sm};
    display: flex;
    gap: ${({ theme }) => theme.spacing.xs};
`;

const StrengthBar = styled.div`
    flex: 1;
    height: 4px;
    background: ${({ theme, $active, $strength }) =>
        $active ?
            $strength === 'weak' ? theme.colors.accent :
                $strength === 'medium' ? '#ffa500' :
                    theme.colors.success
            : theme.colors.border
    };
    border-radius: 2px;
    transition: all 0.3s ease;
`;

const SubmitButton = styled.button`
    padding: ${({ theme }) => theme.spacing.md};
    background: ${({ theme }) => theme.colors.gradient};
    color: white;
    border: none;
    border-radius: ${({ theme }) => theme.borderRadius.lg};
    font-size: 1.125rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover:not(:disabled) {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px ${({ theme }) => theme.colors.shadow};
    }

    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
`;

const LoginLink = styled.div`
    text-align: center;
    color: ${({ theme }) => theme.colors.textSecondary};
    margin-top: ${({ theme }) => theme.spacing.lg};

    a {
        color: ${({ theme }) => theme.colors.primary};
        font-weight: 600;
        text-decoration: none;

        &:hover {
            text-decoration: underline;
        }
    }
`;

export default function RegisterPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState(0);

    const calculatePasswordStrength = (password) => {
        let strength = 0;
        if (password.length >= 8) strength++;
        if (/[A-Z]/.test(password)) strength++;
        if (/[a-z]/.test(password)) strength++;
        if (/[0-9]/.test(password)) strength++;
        return strength;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        if (name === 'password') {
            setPasswordStrength(calculatePasswordStrength(value));
        }

        // Clear error for this field
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validate = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Invalid email format';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters';
        }

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validate()) return;

        setLoading(true);

        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    password: formData.password
                })
            });

            const data = await response.json();

            if (response.ok) {
                // Auto-login after registration
                const loginResponse = await fetch('/api/auth/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: formData.email,
                        password: formData.password
                    })
                });

                const loginData = await loginResponse.json();

                if (loginResponse.ok) {
                    localStorage.setItem('token', loginData.token);
                    localStorage.setItem('user', JSON.stringify(loginData.user));
                    router.push('/select-software');
                }
            } else {
                setErrors({ submit: data.error || 'Registration failed' });
            }
        } catch (error) {
            setErrors({ submit: 'An error occurred. Please try again.' });
        } finally {
            setLoading(false);
        }
    };

    const getStrengthLabel = () => {
        if (passwordStrength === 0) return '';
        if (passwordStrength <= 2) return 'weak';
        if (passwordStrength === 3) return 'medium';
        return 'strong';
    };

    return (
        <PageWrapper>
            <FormContainer
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <Title>Create Account</Title>
                <Subtitle>Start your 30-day free trial today</Subtitle>

                <Form onSubmit={handleSubmit}>
                    <InputGroup>
                        <Label>Full Name</Label>
                        <InputWrapper>
                            <Icon><FiUser /></Icon>
                            <Input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="John Doe"
                                $error={errors.name}
                            />
                        </InputWrapper>
                        {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}
                    </InputGroup>

                    <InputGroup>
                        <Label>Email Address</Label>
                        <InputWrapper>
                            <Icon><FiMail /></Icon>
                            <Input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="john@example.com"
                                $error={errors.email}
                            />
                        </InputWrapper>
                        {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
                    </InputGroup>

                    <InputGroup>
                        <Label>Password</Label>
                        <InputWrapper>
                            <Icon><FiLock /></Icon>
                            <Input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="••••••••"
                                $error={errors.password}
                            />
                        </InputWrapper>
                        {formData.password && (
                            <PasswordStrength>
                                <StrengthBar $active={passwordStrength >= 1} $strength={getStrengthLabel()} />
                                <StrengthBar $active={passwordStrength >= 2} $strength={getStrengthLabel()} />
                                <StrengthBar $active={passwordStrength >= 3} $strength={getStrengthLabel()} />
                                <StrengthBar $active={passwordStrength >= 4} $strength={getStrengthLabel()} />
                            </PasswordStrength>
                        )}
                        {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}
                    </InputGroup>

                    <InputGroup>
                        <Label>Confirm Password</Label>
                        <InputWrapper>
                            <Icon><FiCheck /></Icon>
                            <Input
                                type="password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                placeholder="••••••••"
                                $error={errors.confirmPassword}
                            />
                        </InputWrapper>
                        {errors.confirmPassword && <ErrorMessage>{errors.confirmPassword}</ErrorMessage>}
                    </InputGroup>

                    {errors.submit && <ErrorMessage>{errors.submit}</ErrorMessage>}

                    <SubmitButton type="submit" disabled={loading}>
                        {loading ? 'Creating Account...' : 'Create Account'}
                    </SubmitButton>
                </Form>

                <LoginLink>
                    Already have an account? <Link href="/login">Sign in</Link>
                </LoginLink>
            </FormContainer>
        </PageWrapper>
    );
}
