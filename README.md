# 📝 Save some time

This Fastify project is meant to be used as a base for other projects or applications, to save you some time on starter configurations on database connection, authentication, and other settings. It is also easily customizable so you can build your project the way you want it. 

# 🚦 Dependencies and Plugins

This project relies on a few dependencies and plugins:

- **Fastify Auth:** Provides hooks like **onRequest** and **preHandler**, designed to easily handle authentication-related tasks. 
- **Fastify JWT:** Provides JWT manipulation, as we're passing user information on requests through JWTs.  
- **Bcrypt:** Bcrypt provides top level encrypting for user information passed through requests, such as the password while logging in.
- **Typeorm:** ORM to deal with database transactions.

# 💬 We're here to help!

Let me know if you have any suggestions on how to improve this project, so that we can help more people just get started on their project, instead of feeling lazy when thinking about all the starter configuration they're going to worry about!