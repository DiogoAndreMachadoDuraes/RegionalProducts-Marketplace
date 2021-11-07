import React from "react";
import { Button } from "react-bootstrap";
import "./style.css";

const NotFoundPage = () => {
  return (
    <div className="full">
      <h1
        style={{
          marginTop: 260,
          color: "#5d4241",
          fontWeight: "bold",
          fontSize: 80,
        }}
      >
        404 - Page Not Found
      </h1>
      <Button
        href="/home"
        variant="light"
        size="lg"
        style={{ color: "#ac8786", backgroundColor: "#5d4241", marginTop: 288 }}
      >
        Go Home
      </Button>
    </div>
  );
};

export default NotFoundPage;
