import React, { useState, useEffect } from "react";
import { Container, Table, Spinner, Alert } from "react-bootstrap";
import toast from "react-hot-toast";

const UserCommande = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString(); // Adapter le format selon les besoins (par ex. 'dd/mm/yyyy')
  };

  const fetchOrders = async () => {
    try {
      const response = await fetch(
        "https://api-dev.akov-developpement.fr/api/commande/2",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      if (response.ok) {
        const data = await response.json();
        const usersWithOrders = data.map((order) => ({
          id: order.commande.id,
          prixTotal: order.commande.prix,
          lignesCommandes: order.ligneCommandes.map((ligne) => ({
            id: ligne.id,
            produitNom: ligne.produit.nom,
            produitDescription: ligne.produit.description,
            produitImage: ligne.produit.image,
            quantite: ligne.quantite,
            prix: ligne.produit.prix,
          })),
          dateAchat: order.commande.dateAchat,
        }));
        setUsers(usersWithOrders);
        setError(null);
      } else {
        const errorData = await response.json();
        setError(
          `Erreur ${response.status}: ${errorData.message || "Erreur lors de la récupération des commandes."}`,
        );
      }
    } catch (error) {
      toast.error("Error fetching orders:", error);
      setError("Une erreur est survenue. Veuillez réessayer plus tard.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <Container className="mt-4">
      {loading ? (
        <div className="text-center">
          <Spinner animation="border" />
          <p>Chargement des commandes...</p>
        </div>
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Date d'Achat</th>
              <th>Prix Total</th>
              <th>Produits</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{formatDate(user.dateAchat)}</td>
                <td>{user.prixTotal}€</td>
                <td>
                  <ul>
                    {user.lignesCommandes.map((ligne) => (
                      <li key={ligne.id}>
                        <img
                          src={ligne.produitImage}
                          alt={ligne.produitNom}
                          width="50"
                          height="50"
                        />
                        <strong>{ligne.produitNom}</strong> (x{ligne.quantite})
                        - {ligne.prix}€<p>{ligne.produitDescription}</p>
                      </li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default UserCommande;
