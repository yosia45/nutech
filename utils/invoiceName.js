const invoiceNameGenerator  = (invoiceName, userID) => {
    return `${invoiceName}-${Date.now()}-${userID}`;
}
module.exports = invoiceNameGenerator;