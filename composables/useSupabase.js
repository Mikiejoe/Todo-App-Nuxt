export default function useSupabase() {
  const client = useSupabaseClient();
  const user = useSupabaseUser();
  return {
    user,
    client
  }
}
