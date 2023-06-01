import {Strategy as LocalStrategy} from "passport-local";
import User from "./models/user.js";

export default function initializePassport(passport) {
  passport.use(
    new LocalStrategy({ usernameField: "email" }, async function (email, password, done) {
      try {
        const user = await User.findOne({ email: email });
        if (!user) {
          return done(null, false, { message: "Incorrect username" });
        }
        if (!(await user.comparePassword(password))) {
          return done(null, false, { message: "Incorrect password" });
        }
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    })
  );

  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  passport.deserializeUser(async (id, done) => {
    try{
      const user = await User.findById(id)
      done(null, user);

    } catch(error) {
      done(error, false);
    }
  })
}

export function isAuthenticated(req, res, done) {
  console.log(req.user)
  if(req.user) return done();

  res.status(401).send(JSON.stringify({'message': "Not Authenticated"}))
}