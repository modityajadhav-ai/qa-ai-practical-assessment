/**
 * Find the first in-stock product from a products API response body.
 * @param {{ data: Array<{ id: string; in_stock: boolean }> }} productsBody
 */
function findInStockProduct(productsBody) {
  return productsBody.data.find((product) => product.in_stock);
}

module.exports = { findInStockProduct };
