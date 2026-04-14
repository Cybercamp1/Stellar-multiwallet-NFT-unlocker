import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ActivityFeed from '../components/ActivityFeed';
import { Activity } from '../types';

describe('ActivityFeed', () => {
  const mockActivities: Activity[] = [
    {
      id: '1',
      type: 'payment',
      status: 'success',
      address: 'GD6W...W7E3',
      timestamp: new Date(),
      hash: 'abc123hash'
    }
  ];

  it('renders correctly with activities', () => {
    render(<ActivityFeed activities={mockActivities} />);
    expect(screen.getByText(/Live Activity/i)).toBeInTheDocument();
    expect(screen.getByText(/payment success/i)).toBeInTheDocument();
  });

  it('renders correctly with no activities', () => {
    render(<ActivityFeed activities={[]} />);
    expect(screen.getByText(/No recent transactions/i)).toBeInTheDocument();
  });

  it('shows the correct status icon', () => {
    render(<ActivityFeed activities={mockActivities} />);
    expect(screen.getByText(/✅/)).toBeInTheDocument();
  });
});
