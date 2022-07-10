module.exports = class Account {
  constructor(accountMail, accountDisplayName, accountUrlPhoto, accountToken) {
    this.accountMail = accountMail;
    this.accountDisplayName = accountDisplayName;
    this.accountUrlPhoto = accountUrlPhoto;
    this.accountToken = accountToken;
  }
};
