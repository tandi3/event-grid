import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import EventForm from '../../components/events/EventForm'

export default function CreateEvent () {
  const { user } = useAuth()
  const canCreate = !!user && (user.role === 'organizer' || user.role === 'admin')

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb' }}>
      <div style={{ maxWidth: '56rem', margin: '0 auto', padding: '1rem' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem' }}>Create an Event</h1>
        <p style={{ color: '#374151', marginBottom: '1.5rem' }}>Launch your next gathering on Eventgrid. Follow these steps to publish and start selling tickets.</p>

        <ol style={{ paddingLeft: '1.5rem', marginBottom: '2rem', color: '#1f2937', listStyleType: 'decimal' }}>
          <li style={{ marginBottom: '0.5rem' }}><span style={{ fontWeight: '500' }}>Sign in</span> or <Link to='/register' style={{ color: '#2563eb' }}>create an account</Link>.</li>
          <li style={{ marginBottom: '0.5rem' }}>If you don't have organizer access, go to <Link to='/dashboard/manage-users' style={{ color: '#2563eb' }}>Manage Users</Link> (admin) to set your role to <span style={{ fontWeight: '500' }}>organizer</span>, or ask an admin.</li>
          <li style={{ marginBottom: '0.5rem' }}><span style={{ fontWeight: '500' }}>Create your event</span> with title, dates, venue, description, and banner.</li>
          <li style={{ marginBottom: '0.5rem' }}><span style={{ fontWeight: '500' }}>Add ticket types</span> (e.g., General, VIP) and set price and quantity.</li>
          <li style={{ marginBottom: '0.5rem' }}><span style={{ fontWeight: '500' }}>Publish</span> the event so it appears on the public listing.</li>
          <li style={{ marginBottom: '0.5rem' }}>Share your event link and watch orders come in. Export attendees anytime.</li>
        </ol>

        {!user && (
          <div style={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '0.25rem', padding: '1rem' }}>
            <div style={{ marginBottom: '0.5rem', fontWeight: '500' }}>You're not signed in</div>
            <p style={{ color: '#374151', marginBottom: '0.75rem' }}>Sign in or create an account to proceed.</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Link to='/login' style={{ backgroundColor: '#2563eb', color: '#fff', padding: '0.5rem 1rem', borderRadius: '0.25rem', textDecoration: 'none' }}>Login</Link>
              <Link to='/register' style={{ padding: '0.5rem 1rem', border: '1px solid #e5e7eb', borderRadius: '0.25rem', textDecoration: 'none' }}>Sign up</Link>
            </div>
          </div>
        )}

        {user && !canCreate && (
          <div style={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '0.25rem', padding: '1rem' }}>
            <div style={{ marginBottom: '0.5rem', fontWeight: '500' }}>Organizer access required</div>
            <p style={{ color: '#374151' }}>Your current role is <span style={{ fontWeight: '500' }}>{user.role}</span>. Ask an admin to grant you organizer access, or if you are an admin, update your role in <Link to='/dashboard/manage-users' style={{ color: '#2563eb' }}>Manage Users</Link>.</p>
          </div>
        )}

        {canCreate && (
          <div style={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '0.25rem', padding: '1rem' }}>
            <div style={{ marginBottom: '0.5rem', fontWeight: '500' }}>Event details</div>
            <EventForm onCreated={() => { /* The MyEvents page will refresh when you navigate */ }} />
            <div style={{ marginTop: '1rem', fontSize: '0.875rem', color: '#4b5563' }}>After creating, go to <Link to='/dashboard/my-events' style={{ color: '#2563eb' }}>My Events</Link> to publish/unpublish, edit details, and view attendees.</div>
          </div>
        )}
      </div>
    </div>
  )
}
