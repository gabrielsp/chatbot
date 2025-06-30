import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import { Strategy as AppleStrategy } from 'passport-apple';
import config from './env';
import User from '../models/User';
import jwt from 'jsonwebtoken';

passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

// Google Strategy
passport.use(new GoogleStrategy({
  clientID: config.GOOGLE_CLIENT_ID,
  clientSecret: config.GOOGLE_CLIENT_SECRET,
  callbackURL: 'http://localhost:5000/api/auth/google/callback',
  scope: ['profile', 'email']
}, async (accessToken, refreshToken, profile, done) => {
  try {
    let user = await User.findOne({ email: profile.emails?.[0].value });
    
    if (!user) {
      user = new User({
        firstName: profile.name?.givenName || '',
        lastName: profile.name?.familyName || '',
        email: profile.emails?.[0].value || '',
        provider: 'google',
        socialId: profile.id,
        emailVerified: true
      });
      await user.save();
    }
    
    done(null, user);
  } catch (error) {
    done(error as Error);
  }
}));

// Facebook Strategy
passport.use(new FacebookStrategy({
  clientID: config.FACEBOOK_APP_ID,
  clientSecret: config.FACEBOOK_APP_SECRET,
  callbackURL: '/api/auth/facebook/callback',
  profileFields: ['id', 'emails', 'name']
}, async (accessToken, refreshToken, profile, done) => {
  try {
    const email = profile.emails?.[0].value;
    if (!email) return done(new Error('Email não encontrado'), undefined);

    let user = await User.findOne({ email });
    if (!user) {
      user = new User({
        firstName: profile.name?.givenName || '',
        lastName: profile.name?.familyName || '',
        email,
        provider: 'facebook',
        socialId: profile.id,
        emailVerified: true
      });
      await user.save();
    }
    
    done(null, user);
  } catch (error) {
    done(error as Error);
  }
}));

// Apple Strategy
passport.use(new AppleStrategy({
  clientID: config.APPLE_CLIENT_ID,
  teamID: config.APPLE_TEAM_ID,
  keyID: config.APPLE_KEY_ID,
  privateKeyString: config.APPLE_PRIVATE_KEY,
  callbackURL: '/api/auth/apple/callback',
  passReqToCallback: true
}, async (req: any, accessToken: string, refreshToken: string, idToken: string, profile: any, done: (error: any, user?: any) => void) => {
  try {
    // Decodificar o idToken para obter o email
    const decoded: any = jwt.decode(idToken);
    const email = decoded?.email;
    
    if (!email) return done(new Error('Email não encontrado'), undefined);

    let user = await User.findOne({ email });
    if (!user) {
      user = new User({
        firstName: 'Apple', // Não temos nome na Apple
        lastName: 'User',
        email,
        provider: 'apple',
        socialId: profile.id,
        emailVerified: true
      });
      await user.save();
    }
    
    done(null, user);
  } catch (error) {
    done(error as Error);
  }
}));

export default passport;