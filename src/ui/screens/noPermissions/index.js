import React from "react";
import { Button } from "react-bootstrap";
import "./style.css";

const NoPermissions = () => {
  return (
    <div className="nopermissions">
      <h1
        style={{
          marginTop: 125,
          color: "#444903",
          fontWeight: "bold",
          fontSize: 50,
        }}
      >
        You don't have permission to view this screen!
      </h1>
      <h2 style={{ marginTop: 50, color: "#AAAA74", fontWeight: "bold" }}>
        Você não contém permissões para aceder a este ecrã!
      </h2>
      <Button
        href="/home"
        variant="light"
        size="lg"
        style={{
          color: "white",
          backgroundColor: "#444903",
          marginTop: 125,
          marginBottom: 80,
        }}
      >
        Home
      </Button>
    </div>
  );
};

export default NoPermissions;
