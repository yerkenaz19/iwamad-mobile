export type CampusEvent = {
  id: number
  title: string
  date: string
  place: string
  seats: number
}

export const events: CampusEvent[] = [
  {
    id: 1,
    title: 'React Study Night',
    date: '2026-10-22',
    place: 'Room 302',
    seats: 20,
  },
  {
    id: 2,
    title: 'TypeScript Workshop',
    date: '2026-10-25',
    place: 'Room 405',
    seats: 15,
  },
  {
    id: 3,
    title: 'Web Development Meetup',
    date: '2026-10-28',
    place: 'Main Hall',
    seats: 10,
  },
  {
    id: 4,
    title: 'Frontend Practice Day',
    date: '2026-11-02',
    place: 'Room 210',
    seats: 2,
  },
]