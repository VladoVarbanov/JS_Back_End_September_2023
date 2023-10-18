1. Init project and structure.
2. Setup developer environment.
3. Install express and nodemon.
   - configure static middleware
   - configure body-parser.
   - configure routes.
4. Add images and css in public directory.
5. Add HTML files in views directory.
6. Install express-handlebars.
   - configure view engine.
   - add main layout.
   - fix public styles hyperlinks.
   - render home page in hbs.
7. Convert all HTML views to hbs.
   - Group views by meaning.
8. Add controller folder with home controller.
9. Add database.
   - install mongoose.
   - connect to db.
10. Prepare user functionality.

- user controller.

  - add controller to routes.
  - fix navigation in the nav bar (login, register, logout).
  - render login page.
  - render register page.

11. Add User model.

- simple validation in Schema.
- add method for register.
- create first User record in the db.
- validate password mismatch.

12. Hash password.

- install bcrypt
- hash password

13. Login - find user by email - validate password with hash.

14. Generate jsonwebtoken.
    - install jsonwebtoken.
    - promisify jsonwebtoken.
    - generate secret.
    - generate token in service login.
15. Return token in cookie.
    - install cookie-parser
    - configure cookie-parser
    - set cookie with the token
16. Implement Logout.
17. Authentication middleware.
    - create middleware directory.
    - add auth middleware and import it in express configuration below cookieParser
    - handle invalid token.
      -provide authorization.
18. Dynamic navigation
    - conditional options in navigation
    - add data to res.locals for hbs templates
19. Error handling.
    - add 404 page.
    - redirect missing rout to 404.
    - add global error handled (option).
    - add error message util.
20. Show error notification.
    - show in the main layout.
    - pass error in render in login and register pages.
21. Automatically login
