const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const GitHubStrategy = require("passport-github2").Strategy;
const User = require("../models/User");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      const email = profile.emails[0].value;

      let user = await User.findOne({ email });
      //if a email is already registered and dont have google provider just add in provider array list
      if (user) {
        const hasGoogle = user.providers.some(
          (p) => p.providerName === "google"
        );

        if (!hasGoogle) {
          user.providers.push({
            providerName: "google",
            providerId: profile.id,
          });
          await user.save();
        }

        return done(null, user);
      }

      // New user
      const newUser = await User.create({
        name: profile.displayName,
        email,
        providers: [
          {
            providerName: "google",
            providerId: profile.id,
          },
        ],
      });

      return done(null, newUser);
    }
  )
);

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: "/auth/github/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      const email = profile.emails[0].value;

      let user = await User.findOne({ email });

      //if a email is already registered and dont have github provider just add in provider array list
      if (user) {
        const hasGitHub = user.providers.some(
          (p) => p.providerName === "github"
        );

        if (!hasGitHub) {
          user.providers.push({
            providerName: "github",
            providerId: profile.id,
          });
          await user.save();
        }

        return done(null, user);
      }

      // New user
      const newUser = await User.create({
        name: profile.displayName,
        email,
        providers: [
          {
            providerName: "github",
            providerId: profile.id,
          },
        ],
      });

      return done(null, newUser);
    }
  )
);
