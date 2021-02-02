const OAuth2Strategy = require('passport-oauth2');
const InternalOAuthError = require('passport-oauth2').InternalOAuthError;
const util = require('util');

function Strategy(options, verify) {
    options = options || {};
    options.authorizationURL = options.authorizationURL || 'https://discord.com/api/oauth2/authorize';
    options.tokenURL = options.tokenURL || 'https://discord.com/api/oauth2/token';
    options.scopeSeparator = options.scopeSeparator || ' ';

    OAuth2Strategy.call(this, options, verify);
    this.name = 'discord';
    this._oauth2.useAuthorizationHeaderforGET(true);
}

util.inherits(Strategy, OAuth2Strategy);

Strategy.prototype.userProfile = function(accessToken, done) {
    let self = this;
    this._oauth2.get('https://discord.com/api/users/@me', accessToken, function(err, body, res) {
        let parsedData;
        if (err) {
            return done(new InternalOAuthError('Failed to fetch the user profile.', err))
        }

        try {
            parsedData = JSON.parse(body);
        }
        catch (e) {
            return done(new Error('Failed to parse the user profile.'));
        }

        let profile = parsedData; // has the basic user stuff
        profile.provider = 'discord';
        profile.accessToken = accessToken;

        self.checkScope('connections', accessToken, function(errx, connections) {
            if (errx) done(errx);
            if (connections) profile.connections = connections;
            self.checkScope('guilds', accessToken, function(erry, guilds) {
                if (erry) done(erry);
                if (guilds) profile.guilds = guilds;

                profile.fetchedAt = new Date();
                return done(null, profile)
            });
        });
    });
};

Strategy.prototype.checkScope = function(scope, accessToken, cb) {
    if (this._scope && this._scope.indexOf(scope) !== -1) {
        this._oauth2.get('https://discord.com/api/users/@me/' + scope, accessToken, function(err, body, res) {
            let json;
            if (err) return cb(new InternalOAuthError('Failed to fetch user\'s ' + scope, err));
            try {
                json = JSON.parse(body);
            }
            catch (e) {
                return cb(new Error('Failed to parse user\'s ' + scope));
            }
            cb(null, json);
        });
    } else {
        cb(null, null);
    }
}

Strategy.prototype.authorizationParams = function(options) {
    let params = {};
    if (typeof options.permissions !== 'undefined') {
        params.permissions = options.permissions;
    }
    if (typeof options.prompt !== 'undefined') {
        params.prompt = options.prompt;
    }
    return params;
};

module.exports = Strategy;
