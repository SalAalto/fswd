import AnecdoteForm from './components/AnecdoteForm';
import Notification from './components/Notification';
import { useQuery, useQueryClient, useMutation } from 'react-query';
import { getAnecdotes, updateAnecdote } from './request';
import { useNotificationDispatch } from './NotificationContext';

const App = () => {
  const queryClient = useQueryClient();
  const dispatch = useNotificationDispatch();

  // Setup mutation for updating an anecdote
  const updatedAnecdoteMutation = useMutation(updateAnecdote, {
    onSuccess: updatedAnecdote => {
      queryClient.setQueryData('anecdotes', old => {
        return old.map(anecdote =>
          anecdote.id === updatedAnecdote.id ? updatedAnecdote : anecdote
        );
      });
    },
  });

  // Handle voting for an anecdote
  const handleVote = anecdote => {
    const updatedAnecdote = { ...anecdote, votes: anecdote.votes + 1 };
    updatedAnecdoteMutation.mutate({ id: anecdote.id, newObject: updatedAnecdote });
    dispatch({ type: 'SET_NOTIFICATION', payload: `anecdote '${anecdote.content}' voted` });
    setTimeout(() => dispatch({ type: 'CLEAR_NOTIFICATION' }), 5000);
  };

  // Fetch anecdotes
  const { isLoading, isError, data: anecdotes } = useQuery('anecdotes', getAnecdotes, {
    retry: 1,
    refetchOnWindowFocus: false,
  });

  // Loading state
  if (isLoading) {
    return <div>loading data...</div>;
  }

  // Error state
  if (isError) {
    return <div>anecdote service not available due to problem in server.</div>;
  }

  // Render anecdotes
  return (
    <div>
      <h3>Anecdote app</h3>
      <Notification />
      <AnecdoteForm />
      {anecdotes.map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes} <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
