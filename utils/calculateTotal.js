function calculateTotal(items) {
  if (!Array.isArray(items) || items.length === 0) {
    return 0;
  }

  return items.reduce((sum, item) => {
    return sum + item.quantity * item.unitPrice;
  }, 0);
}

module.exports = calculateTotal;
