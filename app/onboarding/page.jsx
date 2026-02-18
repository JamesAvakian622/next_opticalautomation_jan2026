'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #0f0f23 0%, #1a1a3e 50%, #2d1b69 100%);
  padding: 2rem;
`;

const Card = styled.div`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 24px;
  padding: 3rem;
  max-width: 520px;
  width: 100%;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.4);
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 0.5rem;
`;

const Subtitle = styled.p`
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 2rem;
  font-size: 0.95rem;
  line-height: 1.5;
`;

const Label = styled.label`
  display: block;
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.875rem 1rem;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 12px;
  color: #fff;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.2s;
  margin-bottom: 1.5rem;

  &:focus {
    border-color: #6366f1;
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.2);
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.3);
  }
`;

const SlugPreview = styled.div`
  background: rgba(99, 102, 241, 0.1);
  border: 1px solid rgba(99, 102, 241, 0.3);
  border-radius: 8px;
  padding: 0.625rem 1rem;
  margin-bottom: 1.5rem;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.85rem;
  font-family: monospace;

  span {
    color: #818cf8;
    font-weight: 600;
  }
`;

const PlanGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.75rem;
  margin-bottom: 2rem;
`;

const PlanCard = styled.button`
  background: ${(props) => props.$active
        ? 'linear-gradient(135deg, #6366f1, #8b5cf6)'
        : 'rgba(255, 255, 255, 0.05)'};
  border: 1px solid ${(props) => props.$active
        ? 'rgba(99, 102, 241, 0.6)'
        : 'rgba(255, 255, 255, 0.1)'};
  border-radius: 12px;
  padding: 1.25rem 1rem;
  cursor: pointer;
  transition: all 0.2s;
  text-align: center;

  &:hover {
    border-color: rgba(99, 102, 241, 0.4);
    transform: translateY(-1px);
  }
`;

const PlanName = styled.div`
  color: #fff;
  font-weight: 600;
  font-size: 0.95rem;
  margin-bottom: 0.25rem;
`;

const PlanPrice = styled.div`
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.8rem;
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 1rem;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  border: none;
  border-radius: 12px;
  color: #fff;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: 0 8px 24px rgba(99, 102, 241, 0.4);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.div`
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.3);
  border-radius: 8px;
  padding: 0.75rem 1rem;
  color: #fca5a5;
  font-size: 0.875rem;
  margin-bottom: 1rem;
`;

const PLANS = [
    { id: 'free', name: 'Free', price: '$0/mo' },
    { id: 'silver', name: 'Silver', price: '$29/mo' },
    { id: 'gold', name: 'Gold', price: '$99/mo' },
];

function slugify(name) {
    return name
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')
        .slice(0, 64);
}

export default function OnboardingPage() {
    const router = useRouter();
    const [orgName, setOrgName] = useState('');
    const [plan, setPlan] = useState('free');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const slug = slugify(orgName);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const res = await fetch('/api/onboarding', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ orgName: orgName.trim(), slug, plan }),
            });

            const data = await res.json();

            if (!res.ok || !data.success) {
                setError(data.error || 'Something went wrong');
                return;
            }

            // Redirect to the new org dashboard
            router.push(data.redirectUrl);
        } catch {
            setError('Network error. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container>
            <Card>
                <Title>Create your organization</Title>
                <Subtitle>
                    Set up your workspace to start collaborating with your team.
                </Subtitle>

                <form onSubmit={handleSubmit}>
                    {error && <ErrorMessage>{error}</ErrorMessage>}

                    <Label htmlFor="orgName">Organization Name</Label>
                    <Input
                        id="orgName"
                        type="text"
                        placeholder="Acme Corporation"
                        value={orgName}
                        onChange={(e) => setOrgName(e.target.value)}
                        required
                        minLength={2}
                        maxLength={64}
                    />

                    {slug && (
                        <SlugPreview>
                            Your URL: <span>opticalautomation.com/org/{slug}</span>
                        </SlugPreview>
                    )}

                    <Label>Select a Plan</Label>
                    <PlanGrid>
                        {PLANS.map((p) => (
                            <PlanCard
                                key={p.id}
                                type="button"
                                $active={plan === p.id}
                                onClick={() => setPlan(p.id)}
                            >
                                <PlanName>{p.name}</PlanName>
                                <PlanPrice>{p.price}</PlanPrice>
                            </PlanCard>
                        ))}
                    </PlanGrid>

                    <SubmitButton type="submit" disabled={loading || !orgName.trim()}>
                        {loading ? 'Creating...' : 'Create Organization'}
                    </SubmitButton>
                </form>
            </Card>
        </Container>
    );
}
