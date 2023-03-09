#ifndef EXAMPLE_SRC_NETWORK_SOCKET_H_
#define EXAMPLE_SRC_NETWORK_SOCKET_H_

#include <string>

typedef enum socket_enum {
  SOCKET_TCP,
  SOCKET_UDP,
  SOCKET_UNIX,
} socket_t;

typedef struct socket_struct {
  socket_t type;
  char address[64];
  int port;
} socket_t;

const char *socket_to_string(socket_t socket);

#endif // EXAMPLE_SRC_NETWORK_SOCKET_H_
