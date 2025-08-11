module.exports = {
  eventService: {
    baseUrl: process.env.EVENT_SERVICE_URL || 'http://localhost:3000/api/event'
  },
  zoneService: {
    baseUrl: process.env.ZONE_SERVICE_URL || 'http://localhost:3001/api/zone'
  },
  reservationService: {
    baseUrl: process.env.RESERVATION_SERVICE_URL || 'http://localhost:3002/api/reservation'
  },
  ticketService: {
    baseUrl: process.env.TICKET_SERVICE_URL || 'http://localhost:3003/api/ticket'
  },
  userService: {
    baseUrl: process.env.USER_SERVICE_URL || 'http://localhost:3004/api/user'
  },
  authService: {
    baseUrl: process.env.AUTH_SERVICE_URL || 'http://localhost:3005/api/auth'
  }
};