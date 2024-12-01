const getJwtToken = require('../helpers/getJwtToken')


const cookieToken = (user,res) => {
  const token = getJwtToken(user?._id, user?.isAdmin);
  const options = {
    expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: true, // HTTPS এ কাজ করবে
    sameSite: "None", // Cross-site cookies অনুমোদিত
  };

  user.password = undefined;

  res.status(200).cookie('token', token, options).json({
    success: true,
    token,
    isAdmin:user?.isAdmin
  })

}

module.exports = cookieToken;
