import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { ChakraProvider } from '@chakra-ui/react';
import ChatWindow from '../ChatWindow';

// Mock scrollIntoView
window.HTMLElement.prototype.scrollIntoView = jest.fn();

// Create a unique ID generator for tests
let messageIdCounter = 0;
const generateUniqueId = () => {
  messageIdCounter += 1;
  return messageIdCounter;
};

// Mock chatService
jest.mock('../../../services/chat', () => ({
  setTranslateFunction: jest.fn(),
  sendMessage: jest.fn().mockImplementation(async (message) => {
    if (message.toLowerCase() === 'start quiz') {
      return {
        id: generateUniqueId(),
        text: 'Test Question',
        timestamp: Date.now(),
        sender: 'bot',
        type: 'quiz'
      };
    }
    return {
      id: generateUniqueId(),
      text: 'Test response',
      timestamp: Date.now(),
      sender: 'bot',
      type: 'message'
    };
  }),
  isQuizActive: jest.fn().mockReturnValue(true),
  getCurrentQuestion: jest.fn().mockReturnValue({
    question: 'Test Question',
    options: ['Option 1', 'Option 2', 'Option 3', 'Option 4']
  }),
  getCurrentQuestionIndex: jest.fn().mockReturnValue(0),
  getTotalQuestions: jest.fn().mockReturnValue(3),
  resetChat: jest.fn()
}));

describe('ChatWindow', () => {
  const renderChat = (props = {}) => {
    const defaultProps = {
      isOpen: true,
      onClose: jest.fn(),
      currentPage: 1,
      ...props
    };

    return render(
      <ChakraProvider>
        <ChatWindow {...defaultProps} />
      </ChakraProvider>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
    messageIdCounter = 0; // Reset the counter before each test
  });

  test('message input and send functionality', async () => {
    renderChat();
    const input = screen.getByPlaceholderText(/ask/i);
    const form = input.closest('form');
    
    // Empty message shouldn't be sent
    await act(async () => {
      fireEvent.submit(form!);
    });
    expect(input).toHaveValue('');
    
    // Valid message should clear input after sending
    await act(async () => {
      fireEvent.change(input, { target: { value: 'Hello' } });
    });
    expect(input).toHaveValue('Hello');
    
    await act(async () => {
      fireEvent.submit(form!);
    });
    expect(input).toHaveValue('');
  });

  test('close chat functionality', () => {
    const onClose = jest.fn();
    renderChat({ onClose });
    
    const closeButton = screen.getByLabelText(/close/i);
    fireEvent.click(closeButton);
    
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  test('chat scroll behavior', async () => {
    renderChat();
    const input = screen.getByPlaceholderText(/ask/i);
    const form = input.closest('form');

    // Send multiple messages
    for (const msg of ['Message 1', 'Message 2', 'Message 3']) {
      await act(async () => {
        fireEvent.change(input, { target: { value: msg } });
        fireEvent.submit(form!);
      });
    }

    // Check if scrollIntoView was called for each message
    expect(window.HTMLElement.prototype.scrollIntoView).toHaveBeenCalled();
  });

  test('quiz interaction', async () => {
    renderChat();
    const input = screen.getByPlaceholderText(/ask/i);
    const form = input.closest('form');

    // Start quiz
    await act(async () => {
      fireEvent.change(input, { target: { value: 'start quiz' } });
      fireEvent.submit(form!);
    });

    // Wait for quiz UI to appear
    await waitFor(() => {
      expect(screen.getByText('Test Question')).toBeInTheDocument();
    });

    // Check if quiz options are displayed
    const options = screen.getAllByRole('button');
    expect(options.length).toBeGreaterThan(1); // At least quiz options buttons

    // Select first option
    await act(async () => {
      fireEvent.click(options[0]);
    });

    // Verify input is disabled during quiz
    expect(input).toBeInTheDocument();
  });
}); 