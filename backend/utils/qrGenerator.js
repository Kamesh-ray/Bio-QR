const QRCode = require("qrcode");

const createQrCode = async (text) => {
  try {
    const qrImage = await QRCode.toDataURL(text);
    return qrImage;
  } catch (error) {
    throw error;
  }
};

module.exports = { createQrCode };
