const { gql } = require('graphql-tag');

const typeDefs = gql`
  # User
  type User {
    idUsuario: ID!
    nombre: String!
    apellido: String!
    email: String!
    rol: String!
  }

  # Event
  type Event {
    idEvento: ID!
    titulo: String!
    descripcion: String
    fecha: String!
    hora: String!
    ubicacion: String!
    categoria: String!
    capacidadTotal: Int!
    estado: String
    visibilidad: String
    idOrganizador: ID!
  }

  # Zone
  type Zone {
    idZona: ID!
    nombreZona: String!
    precio: Float!
    capacidadZona: Int!
    idEvento: ID!
  }

  # Ticket
  type Ticket {
    idEntrada: ID!
    codigoQR: String!
    estado: String!
    idZona: ID!
    idCliente: ID!
    fechaCompra: String!
    medioPago: String!
  }

  # Reservation
  type Reservation {
    idReserva: ID!
    idEntrada: ID!
    fechaReserva: String!
    fechaExpiracion: String!
    estado: String!
  }

  # Notification
  type Notification {
    idNotificacion: ID!
    idUsuario: ID!
    tipo: String!
    mensaje: String!
    fechaEnvio: String!
    leido: Boolean!
  }

  # Queries
  type Query {
    # Users
    getAllUsers: [User]
    getUserById(idUsuario: ID!): User

    # Events
    getAllEvents: [Event]
    getEventById(idEvento: ID!): Event

    # Zones
    getAllZones: [Zone]
    getZoneById(idZona: ID!): Zone

    # Tickets
    getAllTickets: [Ticket]
    getTicketById(idEntrada: ID!): Ticket

    # Reservations
    getAllReservations: [Reservation]
    getReservationById(idReserva: ID!): Reservation

    # Notifications
    getAllNotifications: [Notification]
    getNotificationById(idNotificacion: ID!): Notification
  }

  # Mutations (opcionales, puedes agregar según necesites)
  type Mutation {
    # User mutations example
    createUser(nombre: String!, apellido: String!, email: String!, rol: String!): User
    updateUser(idUsuario: ID!, nombre: String, apellido: String, email: String, rol: String): User
    deleteUser(idUsuario: ID!): Boolean

    # Similar mutations pueden definirse para Events, Zones, Tickets, Reservations, Notifications
  }
`;

module.exports = typeDefs;
