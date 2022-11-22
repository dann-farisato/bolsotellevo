import React from 'react';
import { Container } from 'react-bootstrap';

export default function CenteredContainer({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}
      >
        <div data-testId="my-div" className="text-center mt-4 name w-100" style={{ maxWidth: "400px" }}>
          {children}
        </div>
      </Container>
    </>
  )
}