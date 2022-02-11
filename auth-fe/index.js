console.log('Authentication Front End');

const sendLogin = async () => {
  const user = 'walt';
  const pwd = 'Aa$12345';
  try {
    const response = await fetch('http://localhost:3500/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ user, pwd })
    });

    if (!response.ok) {
      if (response.status === 401) {
        return await sendRefreshToken();
      }
      throw new Error(`${response.status} ${response.statusText}`);
    }
    return await response.json();
  } catch (err) {
    console.log(err.stack);
  }
};

(async () => {
  console.log('Init Async');
  const token = await sendLogin();
  console.log(token);
})();
