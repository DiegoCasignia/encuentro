const axios = require('axios');

// Base URLs de cada microservicio (ajusta los puertos)
const USERS_BASE_URL = 'http://localhost:3003/api/user';
const EVENTS_BASE_URL = 'http://localhost:3000/api/event';
const ZONES_BASE_URL = 'http://localhost:3000/api/zone';
const TICKETS_BASE_URL = 'http://localhost:3002/api/ticket';
const RESERVATIONS_BASE_URL = 'http://localhost:3002/api/reservation';
const NOTIFICATIONS_BASE_URL = 'http://localhost:3006/notifications';

const resolvers = {
  Query: {
    // Users
    getAllUsers: async () => {
      const { data } = await axios.get(USERS_BASE_URL);
      return data;
    },
    getUserById: async (_, { idUsuario }) => {
      const { data } = await axios.get(`${USERS_BASE_URL}/${idUsuario}`);
      return data;
    },

    // Events
    getAllEvents: async () => {
      const { data } = await axios.get(EVENTS_BASE_URL);
      return data;
    },
    getEventById: async (_, { idEvento }) => {
      const { data } = await axios.get(`${EVENTS_BASE_URL}/${idEvento}`);
      return data;
    },

    // Zones
    getAllZones: async () => {
      const { data } = await axios.get(ZONES_BASE_URL);
      return data;
    },
    getZoneById: async (_, { idZona }) => {
      const { data } = await axios.get(`${ZONES_BASE_URL}/${idZona}`);
      return data;
    },

    // Tickets
    getAllTickets: async () => {
      const { data } = await axios.get(TICKETS_BASE_URL);
      return data;
    },
    getTicketById: async (_, { idEntrada }) => {
      const { data } = await axios.get(`${TICKETS_BASE_URL}/${idEntrada}`);
      return data;
    },

    // Reservations
    getAllReservations: async () => {
      const { data } = await axios.get(RESERVATIONS_BASE_URL);
      return data;
    },
    getReservationById: async (_, { idReserva }) => {
      const { data } = await axios.get(`${RESERVATIONS_BASE_URL}/${idReserva}`);
      return data;
    },

    // Notifications
    getAllNotifications: async () => {
      const { data } = await axios.get(NOTIFICATIONS_BASE_URL);
      return data;
    },
    getNotificationById: async (_, { idNotificacion }) => {
      const { data } = await axios.get(`${NOTIFICATIONS_BASE_URL}/${idNotificacion}`);
      return data;
    },
  },

  Mutation: {
    createUser: async (_, args) => {
      const { data } = await axios.post(USERS_BASE_URL, args);
      return data;
    },
    updateUser: async (_, { idUsuario, ...updateData }) => {
      const { data } = await axios.put(`${USERS_BASE_URL}/${idUsuario}`, updateData);
      return data;
    },
    deleteUser: async (_, { idUsuario }) => {
      await axios.delete(`${USERS_BASE_URL}/${idUsuario}`);
      return true;
    },
  },
};

module.exports = resolvers;
