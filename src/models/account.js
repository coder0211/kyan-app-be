module.exports = class Account {
  constructor(
    accountId,
    accountMail,
    accountDisplayName,
    accountUrlPhoto,
    accountToken,
    accountAccessToken
  ) {
    this.accountId = accountId;
    this.accountMail = accountMail;
    this.accountDisplayName = accountDisplayName;
    this.accountUrlPhoto = accountUrlPhoto;
    this.accountToken = accountToken;
    this.accountAccessToken = accountAccessToken;
  }
};
