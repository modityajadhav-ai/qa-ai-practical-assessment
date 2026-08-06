const { request } = require('@playwright/test');

(async () => {
  const ctx = await request.newContext({ baseURL: 'https://api.practicesoftwaretesting.com' });
  const email = `testuser_${Date.now()}@example.com`;

  const reg = await ctx.post('/users/register', {
    data: {
      first_name: 'Test',
      last_name: 'User',
      email,
      password: 'Welcome01!',
      dob: '1990-05-15',
      phone: '555-123-4567',
      address: {
        street: '123 Main Street',
        city: 'New York',
        state: 'NY',
        country: 'United States',
        postal_code: '10001',
      },
    },
  });
  console.log('REGISTER', reg.status(), await reg.text());

  const login = await ctx.post('/users/login', {
    data: { email, password: 'Welcome01!' },
  });
  const loginBody = await login.json();
  console.log('LOGIN', login.status(), loginBody.access_token?.slice(0, 20));

  const token = loginBody.access_token;
  const auth = { Authorization: `Bearer ${token}` };

  const cart = await ctx.post('/carts', { headers: auth });
  const cartBody = await cart.json();
  console.log('CART CREATE', cart.status(), cartBody);

  const products = await ctx.get('/products');
  const productsBody = await products.json();
  const inStock = productsBody.data.find((p) => p.in_stock);
  console.log('PRODUCT', inStock?.id, inStock?.name);

  const add = await ctx.post(`/carts/${cartBody.id}`, {
    headers: auth,
    data: { product_id: inStock.id, quantity: 2 },
  });
  console.log('ADD ITEM', add.status(), await add.text());

  const getCart = await ctx.get(`/carts/${cartBody.id}`, { headers: auth });
  console.log('GET CART', getCart.status(), await getCart.text());

  const invoice = await ctx.post('/invoices', {
    headers: auth,
    data: {
      billing_street: 'Zoey Shore',
      billing_city: 'Hesselbury',
      billing_state: 'Florida',
      billing_country: 'TG',
      billing_postal_code: '1234AA',
      payment_method: 'cash-on-delivery',
      cart_id: cartBody.id,
      payment_details: {},
    },
  });
  console.log('INVOICE', invoice.status(), await invoice.text());

  await ctx.dispose();
})();
