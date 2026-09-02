import { useAppStore } from '../store/appStore';

export const trackEvent = async (eventName: string, data: Record<string, any> = {}) => {
  const sessionId = useAppStore.getState().sessionId;
  
  const payload = {
    event_id: Math.random().toString(36).substring(2, 15),
    session_id: sessionId,
    event_name: eventName,
    ...data,
  };

  try {
    // We do not await this generally to avoid blocking the UI
    fetch('/api/insights/data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    }).catch(err => console.warn('Analytics fetch aborted or failed:', err));
  } catch (e) {
    // Ignore errors
  }
};
