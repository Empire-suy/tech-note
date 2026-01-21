const initSSE = () => {
  const eventSource = new EventSource('/stream');

  eventSource.onmessage = (event) => {
    if (event.data === 'DONE') {
      console.log('Stream finished');
      eventSource.close(); // Close the connection when done
      return;
    }

    const data = JSON.parse(event.data);
    console.log('New message:', data);
  };

  eventSource.onerror = (error) => {
    console.error('SSE error:', error);
    eventSource.close(); // Close the connection on error
  };
};

const initSSEByFetch = () => {
  const fetchSSE = async () => {
    const response = await fetch('/stream');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value, { stream: true });
      chunk.split('\n\n').forEach((line) => {
        if (line.trim()) {
          console.log('New message:', JSON.parse(line));
        }
      });
    }
  };

  fetchSSE().catch((error) => console.error('Fetch SSE error:', error));
};
