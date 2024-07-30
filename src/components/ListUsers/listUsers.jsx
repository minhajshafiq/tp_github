import React, { useState, useEffect } from "react";
import { Container, Table, Spinner, Alert } from "react-bootstrap";

const ListUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    try {
      const response = await fetch(
        "https://api-dev.akov-developpement.fr/api/users/all",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      if (response.ok) {
        const data = await response.json();
        setUsers(data);
        setError(null);
      } else {
        const errorData = await response.json();
        setError(
          `Erreur ${response.status}: ${errorData.message || "Erreur lors de la récupération des utilisateurs."}`,
        );
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      setError("Une erreur est survenue. Veuillez réessayer plus tard.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <Container className="mt-4">
      {loading ? (
        <div className="text-center">
          <Spinner animation="border" />
          <p>Chargement des utilisateurs...</p>
        </div>
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nom</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.nom}</td>
                <td>{user.email}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default ListUsers;
