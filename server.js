// Dependencies
import { serve, write } from "bun";
// Import users json file
import users from "./users.json";
// Create server
serve({
  async fetch(request) {
    // Get url and method
    const { url, method } = request;
    // Get pathname from url
    const { pathname } = new URL(url);
    // Get All Users
    if (pathname === "/api/users" && method === "GET") {
      return new Response(JSON.stringify(users), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Access-control-allow-origin": "*",
        },
      });
    }
    // Create User
    if (pathname === "/api/users" && method === "POST") {
      const body = await request.json();
      const newJson = users.concat(body);
      write("./users.json", JSON.stringify(newJson), null, 2);
      return new Response(JSON.stringify(newJson), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Access-control-allow-origin": "*",
        },
      });
    }
    // Delete User
    // method == 0 is a DELETE request
    if (pathname === "/api/users" && method == 0) {
      const body = await request.json();
      const newJson = users.filter((user) => user.id !== body.id);
      write("./users.json", JSON.stringify(newJson), null, 2);
      return new Response(JSON.stringify(newJson), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Access-control-allow-origin": "*",
        },
      });
    }
    // Update User
    if (pathname === "/api/users" && method === "PUT") {
      const body = await request.json();
      const newJson = users.map((user) => {
        if (user.id === body.id) {
          return body;
        }
        return user;
      });
      write("./users.json", JSON.stringify(newJson), null, 2);
      return new Response(JSON.stringify(newJson), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Access-control-allow-origin": "*",
        },
      });
    }
    // Send 404
    return new Response("", { status: 404 });
  },
});
console.log("Server running on port 3000");
