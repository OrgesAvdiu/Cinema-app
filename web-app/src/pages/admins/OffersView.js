import React, { useState, useEffect } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  TextField, Button, Modal, Box, CircularProgress, Alert
} from '@mui/material';
import {
  getAllOffers, addOffer, updateOfferById, deleteOfferById
} from '../../services/OffersService';

const OffersView = () => {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [offerToEdit, setOfferToEdit] = useState(null);
  const [newOffer, setNewOffer] = useState({
    title: '',
    description: '',
    discount: '',
    startDate: '',
    endDate: '',
    cities: []
  });
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const offersData = await getAllOffers();
        setOffers(offersData);
      } catch (error) {
        setError('Error fetching offers');
      } finally {
        setLoading(false);
      }
    };
    fetchOffers();
  }, []);

  const handleOpenModal = (offer = null) => {
    setOfferToEdit(offer);
    setNewOffer(offer ? { ...offer } : {
      title: '',
      description: '',
      discount: '',
      startDate: '',
      endDate: '',
      cities: []
    });
    setOpenModal(true);
  };

  const handleCloseModal = () => setOpenModal(false);

  const handleChange = (e) => {
    setNewOffer({ ...newOffer, [e.target.name]: e.target.value });
  };

  const handleAddOffer = async () => {
    try {
      const addedOffer = await addOffer(newOffer);
      setOffers([...offers, addedOffer]);
      handleCloseModal();
    } catch (err) {
      setError('Failed to add offer');
    }
  };

  const handleUpdateOffer = async () => {
    try {
      await updateOfferById(offerToEdit.id, newOffer);
      setOffers(offers.map((offer) => offer.id === offerToEdit.id ? { ...offer, ...newOffer } : offer));
      handleCloseModal();
    } catch (err) {
      setError('Failed to update offer');
    }
  };

  const handleDeleteOffer = async (id) => {
    try {
      await deleteOfferById(id);
      setOffers(offers.filter((offer) => offer.id !== id));
    } catch (err) {
      setError('Failed to delete offer');
    }
  };

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <div>
      <h1>Offer Management</h1>
      <Button variant="contained" color="primary" onClick={() => handleOpenModal()}>
        Add Offer
      </Button>
      <TableContainer component={Paper} style={{ marginTop: 20 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {offers.map((offer) => (
              <TableRow key={offer.id}>
                <TableCell>{offer.id}</TableCell>
                <TableCell>{offer.title}</TableCell>
                <TableCell>{offer.description}</TableCell>
                <TableCell>
                  <Button variant="outlined" color="primary" onClick={() => handleOpenModal(offer)}>
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => handleDeleteOffer(offer.id)}
                    style={{ marginLeft: 10 }}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal open={openModal} onClose={handleCloseModal}>
        <Box
          style={{
            position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
            width: 400, backgroundColor: 'white', padding: 20, boxShadow: 24
          }}
        >
          <h2>{offerToEdit ? 'Edit Offer' : 'Add Offer'}</h2>
          <TextField label="Title" name="title" value={newOffer.title} onChange={handleChange} fullWidth style={{ marginBottom: 10 }} />
          <TextField label="Description" name="description" value={newOffer.description} onChange={handleChange} fullWidth style={{ marginBottom: 10 }} />
          <TextField label="Discount" name="discount" value={newOffer.discount} onChange={handleChange} fullWidth style={{ marginBottom: 10 }} />
          <TextField label="Start Date" name="startDate" value={newOffer.startDate} onChange={handleChange} fullWidth style={{ marginBottom: 10 }} />
          <TextField label="End Date" name="endDate" value={newOffer.endDate} onChange={handleChange} fullWidth style={{ marginBottom: 10 }} />
          <Button
            variant="contained" color="primary"
            onClick={offerToEdit ? handleUpdateOffer : handleAddOffer}
          >
            {offerToEdit ? 'Update' : 'Add'}
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default OffersView;
