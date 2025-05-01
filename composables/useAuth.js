export default function useAuth() {
  const { client } = useSupabase();
  async function login(email, password) {
    try {
      const { error, data } = await client.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        return { data: undefined, error: error.message };
      } else {
        return { data: data.user, error: undefined };
      }
    } catch (err) {
      return { data: undefined, error: err.message };
    }
  }
  async function signUp(email, password) {
    try {
      const { error, data } = await client.auth.signUp({
        email,
        password,
      });
      if (error) {
        return { error: error.message, data: undefined };
      }
      return { error: undefined, data: data.user };
    } catch (error) {
      return { error: error.message, data: undefined };
    }
  }
  return {
    login,
    signUp,
  };
}
