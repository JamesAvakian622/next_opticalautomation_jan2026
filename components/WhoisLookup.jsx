'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import { FiSearch, FiAlertCircle } from 'react-icons/fi';

const Wrapper = styled.div`
  max-width: 600px;
  width: 100%;
  margin: 0 auto;
`;

const SearchBox = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  
  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

const Input = styled.input`
  flex: 1;
  padding: ${({ theme, $compact }) => $compact ? '8px 12px' : theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  font-size: 1rem;
  outline: none;
  transition: all 0.2s;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary}20;
  }
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: ${({ theme, $compact }) => $compact ? '8px 12px' : `${theme.spacing.md} ${theme.spacing.xl}`};
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;

  &:hover {
    background: ${({ theme }) => theme.colors.primaryDark};
    transform: translateY(-2px);
  }
  
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
  }
`;

const ResultCard = styled.div`
  margin-top: ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  overflow: hidden;
  animation: fadeIn 0.3s ease;
  
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

const ResultHeader = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.backgroundAlt};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  h4 {
    margin: 0;
    font-size: 0.9rem;
    color: ${({ theme }) => theme.colors.textSecondary};
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
`;

const ResultPre = styled.pre`
  margin: 0;
  padding: ${({ theme }) => theme.spacing.lg};
  white-space: pre-wrap;
  color: ${({ theme }) => theme.colors.text};
  font-family: 'Monaco', 'Consolas', monospace;
  font-size: 0.85rem;
  line-height: 1.6;
  max-height: 400px;
  overflow-y: auto;
  
  &::-webkit-scrollbar {
    width: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  
  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.border};
    border-radius: 4px;
  }
`;

const Message = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: 0.9rem;
  
  &.error {
    background: ${({ theme }) => `${theme.colors.error}15`};
    color: ${({ theme }) => theme.colors.error};
  }
  
  &.processing {
    background: ${({ theme }) => `${theme.colors.primary}15`};
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export default function WhoisLookup({
  placeholder = "Enter domain (example.com)",
  buttonText = "Search Whois",
  apiPath = "/api/whois",
  compact = false
}) {
  const [domain, setDomain] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const lookup = async () => {
    if (!domain.trim()) {
      setError("Please enter a domain name.");
      return;
    }

    setLoading(true);
    setError(null);
    setResult("");

    try {
      const res = await fetch(`${apiPath}?domain=${encodeURIComponent(domain)}`);
      if (!res.ok) {
        throw new Error('Lookup failed');
      }
      const text = await res.text();
      setResult(text);
    } catch (err) {
      setError("Error performing WHOIS lookup. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      lookup();
    }
  };

  return (
    <Wrapper>
      <SearchBox>
        <Input
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={loading}
          $compact={compact}
        />
        <Button onClick={lookup} disabled={loading} $compact={compact}>
          {loading ? 'Searching...' : (
            <>
              <FiSearch /> {buttonText}
            </>
          )}
        </Button>
      </SearchBox>

      {error && (
        <Message className="error">
          <FiAlertCircle /> {error}
        </Message>
      )}

      {result && (
        <ResultCard>
          <ResultHeader>
            <h4>Whois Record for {domain}</h4>
          </ResultHeader>
          <ResultPre>{result}</ResultPre>
        </ResultCard>
      )}
    </Wrapper>
  );
}
